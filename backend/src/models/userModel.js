const mongoose = require('mongoose');
const ingredientSchema = require('./ingredientSchema');
const recipeSchema = require('./recipeSchema');

/*TODO For future functionality, could make the user be able to save and modify kitchenStock "profiles"
For example a "vegan" kitchenStock profile with default categories of "Vegan_Dairy_Alternatives", "Vegan_Meat_Alternatives*/
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    
    kitchenStock: {
        type: Map,
        of: {
            type: Map,
            of: ingredientSchema
        },
        default: {
            Meats: {},
            Poultry: {},
            Seafood: {},
            Plant_based_proteins: {},
            Dairy: {},
            Legumes_and_beans: {},
            Fruits: {},
            Vegetables: {},
            Oils_and_Fats: {},
            Spices_and_Seasonings: {},
            Grains: {},
            Baking: {},
            Sweeteners: {},
            Beverages: {},
            Miscellaneous: {},
            Uncategorized: {}
        }
    },

    savedRecipes: {
        type: Map,
        of: recipeSchema,
        default: {}
    }

    //TODO: preferences, createdAt, updatedAt
})

//TODO, method to hash the password when creating new user or when updating password

const User = mongoose.model('users', userSchema);
module.exports = User;