const mongoose = require('mongoose');
const batchSchema = require("./batchSchema");

const ingredientSchema = new mongoose.Schema({ 
        exclude: {type: Boolean, default: false, required: true},
        batches: {
                type: [batchSchema],
                default: []
        }
},{ _id: false });

module.exports = ingredientSchema;