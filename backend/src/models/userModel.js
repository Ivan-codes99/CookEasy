const mongoose = require(mongoose);
const { v4: uuidv4 } = require('uuid');
const Ingredient = require('ingredientModel');
const Recipe = require('recipeModel');

const userSchema = new mongoose.Schema({
    userID: {
        type: String,
        default: uuidv4,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    kitchenStock: {
        type: [Ingredient.schema],
        default: []
    },

    savedRecipes: {
        type: [Recipe.schema]
    }

    //TODO: preferences, createdAt, updatedAt
})

//TODO, method to hash the password before saving the user

const User = mongoose.model('User', userSchema); 
module.exports = User;