const mongoose = require('mongoose');

const recipeIngredientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    unit: { type: String, required: true },
    quantity: { type: Number, required: true },
});

const RecipeIngredient = mongoose.model('RecipeIngredient', recipeIngredientSchema);
module.exports = RecipeIngredient;