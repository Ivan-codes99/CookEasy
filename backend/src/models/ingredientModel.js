const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
        name: { type: String, required: true },
        category: { type: String, required: true},
        unit: { type: String, required: true },
        quantity: { type: Number, required: true },
        expirationDate: { type: Date, required: true },
        addedAt: { type: Date, required: true },
});

module.exports = ingredientSchema;
