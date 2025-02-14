const mongoose = require('mongoose');
//const { v4: uuidv4 } = require('uuid'); //? I don't think we need this import anymore
const ingredientSchema = require('./ingredientSchema');
const RecipeSchema = require('./recipeSchema');

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
        type: [RecipeSchema], 
        default: []
    }

    //TODO: preferences, createdAt, updatedAt
})

//TODO, method to hash the password when creating new user or when updating password

const User = mongoose.model('User', userSchema); 
module.exports = User;