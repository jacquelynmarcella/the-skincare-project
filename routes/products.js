require('dotenv').config();
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var request = require('request');
var cheerio = require('cheerio');

//Database
var mongoose = require('mongoose');
var User = require('../models/user');

//Require products model
//require ingredients model


function trim(arr, key) {
  var values = {};
  return arr.filter(function(item){
    var val = item[key];
    var exists = values[val];
    values[val] = true;
    return !exists;
  });
}


router.post('/search', function(req, res, next){
  console.log("back end", req.body.data)
  var search = req.body.data;

  //Cheerio scrapes all products with the entered name and returns result to front end
  request('http://www.cosdna.com/eng/product.php?q=' + search + '&s=3', function(error, response, data){
    var $ = cheerio.load(data);
      var products = $('.ProdName a').map(function(index, element){
        return {
          name: $(element).text().toLowerCase(),
          cosdna: $(element).attr('href').replace(/\.[^/.]+$/, ""),
        }
      }).get();   
      console.log(products);

      res.send(trim(products, 'name'));
  });
});

router.post('/ingredients', function(req, res, next){
  console.log("back end", req.body.data)
  var cosdna = req.body.data;

  request('http://www.cosdna.com/eng/' + cosdna + '.html', function(error, response, data){
    var ingredients = [];
    var $ = cheerio.load(data);
    var productName = $('.ProdTitle').text();
    var resultsTable = $('.iStuffTable tbody tr');

    for (var i=2; i<=resultsTable.length; i++) {
      var tableRow = '#pagebase > div.IngContent > div.IngResult > table > tbody > tr:nth-child(' + i + ')'

      // Only need to replace on valid ingredient links
      // Need to look for text not anchor if no link
      var cosdnaIng;
      var ingName;

      if ($(tableRow + ' > td.iStuffETitle > a').attr('href')) {
        cosdnaIng = $(tableRow + ' > td.iStuffETitle > a').attr('href').replace(/\.[^/.]+$/, "");
        ingredientName = $(tableRow + ' > td.iStuffETitle > a').text();
      }
      else {
        cosdnaIng = '';
        ingredientName = $(tableRow + ' td.iStuffETitle').text();
      }

      //TODO: Data cleansing function that returns ingredient array ready to pop in

      // Need to scrap diff columns dependent on if there is a UV index column
      var column = ($('#pagebase > div.IngContent > div.IngResult > table > tbody > tr:nth-child(1) > td:nth-child(3)').text() === "Acne") ? [3, 4, 5] : [4, 5, 6];

      var ingredient = {
        name: ingredientName,
        cosdna: cosdnaIng,
        ingredientFunction: $(tableRow + ' > td:nth-child(2)').text().replace("‧","").split("‧").join(", "),
        acne: $(tableRow + ' > td:nth-child(' + column[0] + ')').text(),
        irritant: $(tableRow + ' > td:nth-child(' + column[1] + ')').text(),
        safety: $(tableRow + ' > td:nth-child(' + column[2] + ')').text()
      }
             
      ingredients.push(ingredient);

      if (ingredients.length === resultsTable.length - 1) {
        var productData = {
          name: productName,
          cosdna: cosdna,
          ingredients: ingredients
        }
        res.send(productData);
      }
    } 
  });
});

module.exports = router;