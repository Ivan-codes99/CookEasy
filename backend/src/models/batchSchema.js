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
        validate: {
            validator: function(value) {
                // Ensure that unit is provided only if quantity is specified
                return !value || (value && this.quantity);
            },
            message: 'Unit cannot be provided if quantity is not specified.'
        }
    },
    size: {
        type: String,
        enum: ['tiny', 'small', 'average', 'big', 'humongous'],
        validate: {
            validator: function(value) {
                // Ensure that size is provided only if unit is 'count'
                return !value || (this.unit === 'count');
            },
            message: 'Size can only be provided if unit is "count".'
        }
    },
    expirationDate: {
        type: Date
    }
}, { _id: false });

module.exports = batchSchema;
