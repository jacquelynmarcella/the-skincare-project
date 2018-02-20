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
  request('http://www.cosdna.com/eng/product.php?q=' + search + '&s=3', function(error, response, data){
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


module.exports = router;