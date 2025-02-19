const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
    quantity: { 
        type: Number,
        validate: {
            validator: function(value) {
                // Ensure that quantity is provided only if unit is specified
                return !value || (value && this.unit);
            },
            message: 'Quantity cannot be provided if unit is not specified.'
        }
    },
    unit: { 
        type: String,
        enum: [
                "lb",
                "lbs",
                "oz",
                "fl oz",
                "count",
                "gallon",
                "cup",
                "tbsp",
                "tsp",
                "pinch",
                "dash",
                "clove",
                "cloves",
                "sprig",
                "sprigs",
                "slice",
                "slices",
                "can",
                "cans",
                "bar",
                "bars",
                "pack",
                "packs",
                "stick",
                "sticks",
                "bunch"
              ],
        validate: {
            validator: function(value) {
                // Ensure that unit is provided only if quantity is specified
                return !value || (value && this.quantity);
            },
            message: 'Unit cannot be provided if quantity is not specified.'
        }
    },
    expirationDate: {
        type: Date
    }
}, { _id: false });

module.exports = batchSchema;
