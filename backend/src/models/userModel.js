const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const ingredientSchema = require('./ingredientSchema');
const Recipe = require('./recipeSchema');

const userSchema = new mongoose.Schema({
    
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
        type: Map,
        of: ingredientSchema,
        default: {}
    },

    savedRecipes: {
        type: [Recipe.Schema],
        default: []
    }

    //TODO: preferences, createdAt, updatedAt
})

//TODO, method to hash the password when creating new user or when updating password

const User = mongoose.model('User', userSchema); 
module.exports = User;