const mongoose = require('mongoose');
const recipeIngredient = require('recipeIngredientModel');

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tags: [String],
    ingredients: {type: [recipeIngredient.Schema]},
    instructions: { type: [String], required: true }
    //TODO: add (webLink, imageURL, AIGenerated, savedAt) keys
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
