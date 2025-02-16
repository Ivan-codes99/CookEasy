const mongoose = require('mongoose');
const ingredientSchema = require("./ingredientSchema");

const categorySchema = new mongoose.Schema({ 
        exclude: {type: Boolean, default: false, required: true},
        ingredients: {type: Map, of: ingredientSchema, default: {}},
        
},{ _id: false });

module.exports = categorySchema;