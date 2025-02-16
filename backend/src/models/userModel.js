const mongoose = require('mongoose');
const recipeSchema = require('./recipeSchema');
const categorySchema = require("./categorySchema");

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
                            Ground_Beef: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 3,
                                        unit: "lbs"
                                    }
                                ]
                            },
                            Pork_Chop: {
                                exclude: true,
                                batches: [
                                    {
                                        quantity: 2,
                                        unit: "lbs"
                                    }
                                ]
                            }
                        }
                    },
                    Poultry: {
                        exclude: false,
                        ingredients: {
                            Boneless_Chicken_Breast: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 5,
                                        unit: "count"
                                    },
                                    {
                                        quantity: 3,
                                        unit: "lbs"
                                    }
                                ]
                            },
                            Bone_in_Chicken_Breast: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 2,
                                        unit: "lbs"
                                    }
                                ]
                            }
                        }
                    },
                    Seafood: {
                        exclude: false,
                        ingredients: {
                            Salmon: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 5,
                                        unit: "lbs"
                                    }
                                ]
                            },
                            Small_Shrimp: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 12,
                                        unit: "oz"
                                    }
                                ]
                            }
                        }
                    },
                    Plant_Based_Proteins: {
                        exclude: false,
                        ingredients: {
                            Tofu: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 16,
                                        unit: "oz"
                                    }
                                ]
                            }
                        }
                    },
                    Dairy: {
                        exclude: false,
                        ingredients: {
                            Milk: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 8,
                                        unit: "cups"
                                    },
                                    {
                                        quantity: 1,
                                        unit: "gallon"
                                    }
                                ]
                            },
                            Skim_Milk: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 4,
                                        unit: "cups"
                                    }
                                ]
                            },
                            Cheddar_Cheese: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 4,
                                        unit: "oz"
                                    }
                                ]
                            },
                            Butter: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 8,
                                        unit: "tbsp"
                                    },
                                    {
                                        quantity: 4,
                                        unit: "oz"
                                    }
                                ]
                            }
                        }
                    },
                    Legumes_and_Beans: {
                        exclude: false,
                        ingredients: {
                            Dry_Black_Beans: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 2,
                                        unit: "lbs"
                                    }
                                ]
                            },
                            Cooked_Lentils: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 1,
                                        unit: "cups"
                                    }
                                ]
                            },
                            Canned_Black_Beans: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 15,
                                        unit: "oz"
                                    }
                                ]
                            }
                        }
                    },
                    Fruits: {
                        exclude: false,
                        ingredients: {
                            Apples: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 3,
                                        unit: "count",
                                        size: "small"
                                    }
                                ]
                            },
                            Sliced_Apples: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 2,
                                        unit: "cups"
                                    }
                                ]
                            },
                            Bananas: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 5,
                                        unit: "count",
                                        size: "humongous"
                                    }
                                ]
                            },
                            Strawberries: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 10,
                                        unit: "count"
                                    }
                                ]
                            }
                        }
                    },
                    Vegetables: {
                        exclude: false,
                        ingredients: {
                            Baby_Carrots: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 10,
                                        unit: "count"
                                    },
                                    {
                                        quantity: 2,
                                        unit: "cups"
                                    }
                                ]
                            },
                            Broccoli: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 4,
                                        unit: "oz"
                                    }
                                ]
                            },
                            Potatoes: {
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
                    Oils: {
                        exclude: false,
                        ingredients: {
                            Olive_Oil: { exclude: false, batches: [] },
                            Vegetable_Oil: { exclude: false, batches: [] }
                        }
                    },
                    Fats: {
                        exclude: false,
                        ingredients: {
                            Beef_Tallow: { exclude: false, batches: [] }
                        }
                    },
                    Spices_and_Seasonings: {
                        exclude: false,
                        ingredients: {
                            table_salt: { exclude: false, batches: [] },
                            black_pepper: { exclude: false, batches: [] }
                        }
                    },
                    Grains: {
                        exclude: false,
                        ingredients: {
                            Dry_Quinoa: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 1,
                                        unit: "lbs"
                                    }
                                ]
                            },
                            Cooked_Quinoa: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 0.5,
                                        unit: "cups"
                                    }
                                ]
                            }
                        }
                    },
                    Baking: {
                        exclude: false,
                        ingredients: {
                            Flour: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 5,
                                        unit: "lbs"
                                    }
                                ]
                            },
                            Baking_Soda: {
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
                    Sweeteners: {
                        exclude: false,
                        ingredients: {
                            Sugar: { exclude: false, batches: [] },
                            Honey: { exclude: false, batches: [] },
                            Brown_Sugar: { exclude: false, batches: [] }
                        }
                    },
                    Beverages: {
                        exclude: false,
                        ingredients: {
                            White_Wine: { exclude: false, batches: [] },
                            Vinegar: { exclude: false, batches: [] },
                            Beef_Broth: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 2,
                                        unit: "cups"
                                    }
                                ]
                            },
                            Chicken_Stock: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 3,
                                        unit: "cups"
                                    }
                                ]
                            }
                        }
                    },
                    Miscellaneous: {
                        exclude: true,
                        ingredients: {
                            Cocoa_Powder: { exclude: false, batches: [] },
                            Yeast: { exclude: false, batches: [] }
                        }
                    },
                    Uncategorized: {
                        exclude: true,
                        ingredients: {
                            Gelatin: { exclude: false, batches: [] }
                        }
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