const mongoose = require('mongoose');
const ingredientSchema = require('./ingredientSchema');
const recipeSchema = require('./recipeSchema');

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
        of: ingredientSchema, //? Maybe change the key to be category instead of ingredient name, feels like that makes more sense
        default: {}
    },

    savedRecipes: {
        type: Map,
        of: recipeSchema,
        default: {}
    }

    //TODO: preferences, createdAt, updatedAt
})

//TODO, method to hash the password when creating new user or when updating password

const User = mongoose.model('users', userSchema);
module.exports = User;