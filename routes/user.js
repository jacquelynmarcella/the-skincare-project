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

router.post('/products/add', function(req, res, next){

  // To do:
  // Add to products model with:
  // User: userid
  // Name: name
  // Ingredients: []
  console.log(req.body.data);
  res.send(req.body.data);

});


module.exports = router;