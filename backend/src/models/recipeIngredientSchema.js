const mongoose = require('mongoose');

const recipeIngredientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    // unit: { type: String, required: false },
    quantity: { type: String, required: true },
});

module.exports = recipeIngredientSchema;