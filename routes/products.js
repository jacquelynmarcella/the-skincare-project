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

router.post('/search', function(req, res, next){
  console.log("back end", req.body.data)
  var search = req.body.data;

  //Cheerio scrapes all products with the entered name and returns result to front end
  request('http://www.cosdna.com/eng/product.php?q=' + search + '&s=1', function(error, response, data){
    var $ = cheerio.load(data);
      var products = $('.ProdName a').map(function(index, element){
        return {
          name: $(element).text(),
          url: $(element).attr('href')
        }
      }).get();   
      console.log(products);
      res.send(products);
  });
});

router.post('/ingredients', function(req, res, next){
  console.log("back end", req.body.data)
  var productName = req.body.data.name;
  var searchUrl = req.body.data.url;

  request('http://www.cosdna.com/eng/' + searchUrl, function(error, response, data){
    var ingredients = [];
    var $ = cheerio.load(data);
    var resultsTable = $('.iStuffTable tbody tr');

    for (var i=2; i<=resultsTable.length; i++) {
      var tableRow = '#pagebase > div.IngContent > div.IngResult > table > tbody > tr:nth-child(' + i + ')'
      let ingredient = {
        name: $(tableRow + ' > td.iStuffETitle > a').text(),
        ingredientFunction: $(tableRow + ' > td:nth-child(2)').text(),
        acne: $(tableRow + ' > td:nth-child(3)').text(),
        irritant: $(tableRow + ' > td:nth-child(4)').text(),
        safety: $(tableRow + ' > td:nth-child(5) > div').text()
      }
      ingredients.push(ingredient);
      if (ingredients.length === resultsTable.length - 2) {
        var productData = {
          name: productName,
          ingredients: ingredients
        }
        res.send(productData);
      }
    } 
  });
});

module.exports = router;