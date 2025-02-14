const mongoose = require('mongoose');
const recipeIngredientSchema = require('./recipeIngredientSchema');

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tags: [String],
    ingredients: {type: [recipeIngredientSchema]},
    instructions: { type: [String], required: true }
    //TODO: add attributes: webLink, imageURL, AIGenerated, savedAt
});

module.exports = recipeSchema;
