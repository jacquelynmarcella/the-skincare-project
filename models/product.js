var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 99
  },
  user: {
    type: String
  },
  cosdna: { 
    type: String
  },
  ingredients: {
    type: Array
  },
  category: {
    type: String
  }
});

var Product = mongoose.model('Product', productSchema);

module.exports = Product;