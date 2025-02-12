const mongoose = require('mongoose');
const ingredientStock = require("./ingredientStockModel");

const ingredientSchema = new mongoose.Schema({
        name: { type: String, required: true },
        category: { type: String, required: true},
        totalQuantity: { type: Number, required: true },
        //unit: { type: String, required: true },
        // TODO: implement stock
        //stock: { type: [ingredientStock.Schema]},
});

module.exports = ingredientSchema;