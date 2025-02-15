const mongoose = require('mongoose');
const ingredientBatchSchema = require("./ingredientBatchSchema");

const ingredientSchema = new mongoose.Schema({ // * no category attribute because category is the key in kitchenStock
        batches: {
                type: [ingredientBatchSchema],
                default: []
        }
},{ _id: false });

module.exports = ingredientSchema;