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
  request('http://www.cosdna.com/eng/product.php?q=' + search + '&s=1', function(error, response, data){
    var $ = cheerio.load(data);
      var products = $('.ProdName a').map(function(index, element){
        return {
          name: $(element).text().toLowerCase(),
          cosdnaId: $(element).attr('href').replace(/\.[^/.]+$/, ""),
        }
      }).get();   
      console.log(products);

      res.send(trim(products, 'name'));
  });
});

router.post('/ingredients', function(req, res, next){
  console.log("back end", req.body.data)
  var productName = req.body.data.name;
  var cosdnaId = req.body.data.cosdnaId;

  request('http://www.cosdna.com/eng/' + cosdnaId + '.html', function(error, response, data){
    var ingredients = [];
    var $ = cheerio.load(data);
    var resultsTable = $('.iStuffTable tbody tr');

    for (var i=2; i<=resultsTable.length; i++) {
      var tableRow = '#pagebase > div.IngContent > div.IngResult > table > tbody > tr:nth-child(' + i + ')'

      // Only need to replace on valid ingredient links
      // Need to look for text not anchor if no link
      var cosdnaIngId;
      var ingName;

      if ($(tableRow + ' > td.iStuffETitle > a').attr('href')) {
        cosdnaIngId = $(tableRow + ' > td.iStuffETitle > a').attr('href').replace(/\.[^/.]+$/, "");
        ingredientName = $(tableRow + ' > td.iStuffETitle > a').text();
      }
      else {
        cosdnaIngId = '';
        ingredientName = $(tableRow + ' td.iStuffETitle').text();
      }

      //TODO: Data cleansing function that returns ingredient array ready to pop in


      // Need to scrap diff columns dependent on if there is a UV index column
      var column = ($('#pagebase > div.IngContent > div.IngResult > table > tbody > tr:nth-child(1) > td:nth-child(3)').text() === "Acne") ? [3, 4, 5] : [4, 5, 6];

      var ingredient = {
        name: ingredientName,
        cosdnaIngId: cosdnaIngId,
        ingredientFunction: $(tableRow + ' > td:nth-child(2)').text(),
        acne: $(tableRow + ' > td:nth-child(' + column[0] + ')').text(),
        irritant: $(tableRow + ' > td:nth-child(' + column[1] + ')').text(),
        safety: $(tableRow + ' > td:nth-child(' + column[2] + ')').text()
      }
             
      ingredients.push(ingredient);

      if (ingredients.length === resultsTable.length - 1) {
        var productData = {
          name: productName,
          cosdnaId: cosdnaId,
          ingredients: ingredients
        }
        res.send(productData);
      }
    } 
  });
});

module.exports = router;