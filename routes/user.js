require('dotenv').config();
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var request = require('request');
var cheerio = require('cheerio');

//Database
var mongoose = require('mongoose');
var User = require('../models/user');
var Product = require('../models/product');
var Ingredient = require('../models/ingredient');

router.post('/products/add', function(req, res, next){

  console.log(req.body.data);

	Product.findOne({
		user: req.body.data.user,
		cosdnaId: req.body.data.cosdnaId
	}, function(err, product) {

		if (!product) {
			Product.create(req.body.data, function(err, product){
				if(err){
					console.log(err);
	 			}
				else {
					console.log(product,"inside db");
					res.send(product);
	 			}
			});

         } else if (product) {

         	console.log("Already in the db")
         	// If they click "favorite" button again and it's already highlighted, it removes from favorites
         	console.log(product.category, req.body.data.category)
         	if (product.category === req.body.data.category) {
         		//Delete
         		console.log("productid", product._id)
         		Product.remove({
         			_id: product._id
         		}, function(err, product){
         			if(err){
         				console.log(err);
         			}
         			else {
         				console.log("deleted",product);
         				res.send("deleted");
         			}
         		});		
         	}
         	//Otherwise just change category
         	else {
         		product.category = req.body.data.category;
            	product.save();
            	res.send(product);
            }
         }
   });
});


module.exports = router;