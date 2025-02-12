const mongoose = require('mongoose');
//const ingredientStock = require("./ingredientStockModel");

const ingredientSchema = new mongoose.Schema({
        category: { type: String, required: true},
        quantity: { type: Number, required: true },
        //unit: { type: String, required: true },
        // TODO: implement stock
        //stock: { type: [ingredientStock.Schema]},
},{ _id: false });

module.exports = ingredientSchema;