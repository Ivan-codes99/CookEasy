const mongoose = require('mongoose');
const recipeSchema = require('./recipeSchema');
const categorySchema = require("./categorySchema");

//? SHould we use MAP types or OBJECT types?
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
            of: categorySchema,
            default: () => { 
                return {
                    Meats: {
                        exclude: false,
                        ingredients: {
                            Ground_beef: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 1,
                                        unit: "lbs"
                                    }
                                ]
                            }
                        }
                    },
                    Vegetables: {
                        exclude: false,
                        ingredients: {
                            Garlic_cloves: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 5,
                                        unit: "count"
                                    }
                                ]
                            }
                        }
                    },
                    Spices_and_seasonings: {
                        exclude: false,
                        ingredients: {
                            Table_salt: { exclude: false, batches: [] },
                            Black_pepper: { exclude: false, batches: [] }
                        }
                    },
                    Uncategorized: {
                        exclude: true,
                        ingredients: {}
                    }
                }
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