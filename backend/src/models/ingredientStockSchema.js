const mongoose = require('mongoose');

const ingredientStockSchema = new mongoose.Schema({
    quantity: { type: Number, required: true },
    expirationDate: { type: Date, required: true},
    //addedAt: { type: Date, required: true },
});

module.exports = ingredientStockSchema;
