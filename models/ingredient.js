var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 99
  },
  user: {
    type: String,
  },
  cosdna: { 
    type: String
  },
  ingredientFunction: {
    type: String
  },
  acne: {
    type: String
  },
  irritant: {
    type: String
  },
  safety: {
    type: String
  }
});

var Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;