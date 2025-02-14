const mongoose = require('mongoose');
//const ingredientStock = require("./ingredientStockSchema");

const ingredientSchema = new mongoose.Schema({ // * no name attribute because name is the key in kitchenStock
        category: { type: String, required: true},
        quantity: { type: Number, required: true },
        //unit: { type: String, required: true },
        // TODO: implement ingredientStock
        //stock: { type: [ingredientStockSchema]},
},{ _id: false });

module.exports = ingredientSchema;