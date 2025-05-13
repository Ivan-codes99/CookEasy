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
                const today = new Date();
                const addDays = (days) => {
                    const date = new Date(today);
                    date.setDate(date.getDate() + days);
                    return date;
                };
                const addMonths = (months) => {
                    const date = new Date(today);
                    date.setMonth(date.getMonth() + months);
                    return date;
                };
                const addYears = (years) => {
                    const date = new Date(today);
                    date.setFullYear(date.getFullYear() + years);
                    return date;
                };

                return {
                    "Meats": {
                        exclude: false,
                        ingredients: {
                            "Ground beef": {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 1,
                                        unit: "lbs",
                                        expirationDate: addDays(7)
                                    },
                                    {
                                        quantity: 2,
                                        unit: "lbs",
                                        expirationDate: addDays(5)
                                    }
                                ]
                            },
                            "Chicken breast": {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 2,
                                        unit: "lbs",
                                        expirationDate: addDays(5)
                                    },
                                    {
                                        quantity: 1,
                                        unit: "lbs",
                                        expirationDate: addDays(3)
                                    }
                                ]
                            },
                            "Pork chops": {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 4,
                                        unit: "count",
                                        expirationDate: addDays(6)
                                    }
                                ]
                            }
                        }
                    },
                    "Vegetables": {
                        exclude: false,
                        ingredients: {
                            "Garlic cloves": {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 5,
                                        unit: "cloves",
                                        expirationDate: addMonths(1)
                                    },
                                    {
                                        quantity: 3,
                                        unit: "cloves",
                                        expirationDate: addDays(20)
                                    }
                                ]
                            },
                            "Onions": {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 3,
                                        unit: "count",
                                        expirationDate: addDays(19)
                                    },
                                    {
                                        quantity: 2,
                                        unit: "count",
                                        expirationDate: addDays(10)
                                    }
                                ]
                            },
                            "Carrots": {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 1,
                                        unit: "bunch",
                                        expirationDate: addDays(14)
                                    }
                                ]
                            },
                            "Potatoes": {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 5,
                                        unit: "count",
                                        expirationDate: addDays(28)
                                    },
                                    {
                                        quantity: 3,
                                        unit: "count",
                                        expirationDate: addDays(14)
                                    }
                                ]
                            }
                        }
                    },
                    "Dairy": {
                        exclude: false,
                        ingredients: {
                            "Milk": {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 1,
                                        unit: "gallon",
                                        expirationDate: addDays(14)
                                    },
                                    {
                                        quantity: 0.5,
                                        unit: "gallon",
                                        expirationDate: addDays(7)
                                    }
                                ]
                            },
                            "Butter": {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 2,
                                        unit: "sticks",
                                        expirationDate: addMonths(1)
                                    },
                                    {
                                        quantity: 1,
                                        unit: "stick",
                                        expirationDate: addDays(20)
                                    }
                                ]
                            },
                            "Cheese": {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 1,
                                        unit: "pack",
                                        expirationDate: addDays(19)
                                    }
                                ]
                            }
                        }
                    },
                    "Spices and Seasonings": {
                        exclude: false,
                        ingredients: {
                            "Table salt": { 
                                exclude: false, 
                                batches: [] 
                            },
                            "Black pepper": { 
                                exclude: false, 
                                batches: [] 
                            },
                            "Cumin": { 
                                exclude: false, 
                                batches: [] 
                            },
                            "Paprika": { 
                                exclude: false, 
                                batches: [] 
                            }
                        }
                    },
                    "Pantry": {
                        exclude: false,
                        ingredients: {
                            "Rice": {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 5,
                                        unit: "lbs",
                                        expirationDate: addYears(1)
                                    },
                                    {
                                        quantity: 2,
                                        unit: "lbs",
                                        expirationDate: addMonths(6)
                                    }
                                ]
                            },
                            "Pasta": {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 3,
                                        unit: "pack",
                                        expirationDate: addYears(1)
                                    },
                                    {
                                        quantity: 1,
                                        unit: "pack",
                                        expirationDate: addMonths(3)
                                    }
                                ]
                            },
                            "Olive oil": {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 16,
                                        unit: "fl oz",
                                        expirationDate: addYears(1)
                                    }
                                ]
                            }
                        }
                    },
                    "Uncategorized": {
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