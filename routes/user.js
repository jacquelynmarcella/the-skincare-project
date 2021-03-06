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

router.get('/profile', function(req, res){
	var userInfo = [];
	console.log(req.query.user)
	Product.find({ user: req.query.user }, function(err, product){	
		if (product) {
            let sortedProduct = product.sort(function(a, b){ 
                var x = a.name.trim().toLowerCase();
                var y = b.name.trim().toLowerCase();
                if (x < y) {return -1;} 
                if (x > y) {return 1;}
                return 0; 
            })
			userInfo.push(sortedProduct)
		}
		else {
			userInfo.push(null);
		}	
		Ingredient.find({ user: req.query.user }, function(err, ingredient){
			if (ingredient){
                let sortedIngredient = ingredient.sort(function(a, b){ 
                    var x = a.name.trim().toLowerCase();
                    var y = b.name.trim().toLowerCase();
                    if (x < y) {return -1;} 
                    if (x > y) {return 1;}
                    return 0; 
                })
				userInfo.push(sortedIngredient);
				res.send(userInfo);
			}				
			else {
				userInfo.push(null);
				res.send(userInfo);
			}
		})
	})
});

router.post('/products', function(req, res, next){
	Product.findOne({
		user: req.body.data.user,
		cosdna: req.body.data.cosdna
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

router.delete('/products', function(req, res, next){
	console.log(req.body);					
	Product.findOne({
		user: req.body.user,
		cosdna: req.body.cosdna
	}, function(err, product) {
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
   });
});

router.post('/ingredients', function(req, res, next){
	Ingredient.findOne({
		user: req.body.data.user,
		cosdna: req.body.data.cosdna
	}, function(err, ingredient) {
		if (!ingredient) {
			Ingredient.create(req.body.data, function(err, ingredient){
				if(err){
					console.log(err);
	 			}
				else {
					console.log(ingredient,"inside db");
					res.send(ingredient);
	 			}
			});
        } else if (ingredient) {
         	Ingredient.remove({
         		_id: ingredient._id
         	}, function(err, ingredient){
         		if(err){
         			console.log(err);
         		}
         		else {
         			console.log("deleted",ingredient);
         			res.send("deleted");
         		}
         	});		
        }
    });
});


module.exports = router;