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
                                        quantity: 3,
                                        unit: "lbs" // 3 lbs of Ground Beef
                                    }
                                ]
                            },
                            Pork_chop: {
                                exclude: true,
                                batches: [
                                    {
                                        quantity: 2,
                                        unit: "lbs" // 2 lbs of Pork Chop
                                    }
                                ]
                            }
                        }
                    },
                    Poultry: {
                        exclude: false,
                        ingredients: {
                            Boneless_chicken_breast: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 5,
                                        unit: "count" // 5 of Boneless Chicken Breast
                                    },
                                    {
                                        quantity: 3,
                                        unit: "lbs"// 3 lbs of Boneless Chicken Breast
                                    }
                                ]
                            },
                            Bone_in_chicken_breast: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 2,
                                        unit: "lbs" // 2 lbs of Bone In Chicken Breast
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
                            Small_shrimp: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 12,
                                        unit: "oz" // 12 oz of Small Shrimp
                                    }
                                ]
                            }
                        }
                    },
                    Plant_based_proteins: {
                        exclude: false,
                        ingredients: {
                            Tofu: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 16,
                                        unit: "oz" // 16 oz of Tofu
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
                                        unit: "cup"
                                    },
                                    {
                                        quantity: 1,
                                        unit: "gallon"
                                    }
                                ]
                            },
                            Skim_milk: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 4,
                                        unit: "cup"
                                    }
                                ]
                            },
                            Cheddar_cheese: {
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
                                        unit: "tbsp" //8 tbsp of Butter
                                    },
                                    {
                                        quantity: 4,
                                        unit: "oz"
                                    }
                                ]
                            }
                        }
                    },
                    Legumes_and_beans: {
                        exclude: false,
                        ingredients: {
                            Dry_black_beans: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 2,
                                        unit: "lbs"
                                    }
                                ]
                            },
                            Cooked_lentils: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 1,
                                        unit: "cup"
                                    }
                                ]
                            },
                            Canned_black_beans: {
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
                                    }
                                ]
                            },
                            Sliced_apples: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 2,
                                        unit: "cup"
                                    }
                                ]
                            },
                            Bananas: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 5,
                                        unit: "count",
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
                            Baby_carrots: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 10,
                                        unit: "count"
                                    },
                                    {
                                        quantity: 2,
                                        unit: "cup"
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
                            },
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
                    Oils: {
                        exclude: false,
                        ingredients: {
                            Olive_oil: { exclude: false, batches: [] },
                            Vegetable_oil: { exclude: false, batches: [] }
                        }
                    },
                    Fats: {
                        exclude: false,
                        ingredients: {
                            Beef_tallow: { exclude: false, batches: [] }
                        }
                    },
                    Spices_and_seasonings: {
                        exclude: false,
                        ingredients: {
                            Table_salt: { exclude: false, batches: [] },
                            Black_pepper: { exclude: false, batches: [] }
                        }
                    },
                    Grains: {
                        exclude: false,
                        ingredients: {
                            Dry_quinoa: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 1,
                                        unit: "lbs"
                                    }
                                ]
                            },
                            Cooked_quinoa: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 0.5,
                                        unit: "cup"
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
                            Baking_soda: {
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
                            Brown_sugar: { exclude: false, batches: [] }
                        }
                    },
                    Beverages: {
                        exclude: false,
                        ingredients: {
                            White_wine: { exclude: false, batches: [] },
                            Vinegar: { exclude: false, batches: [] },
                            Beef_broth: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 2,
                                        unit: "cup"
                                    }
                                ]
                            },
                            Chicken_stock: {
                                exclude: false,
                                batches: [
                                    {
                                        quantity: 3,
                                        unit: "cup"
                                    }
                                ]
                            }
                        }
                    },
                    Miscellaneous: {
                        exclude: true,
                        ingredients: {
                            Cocoa_powder: { exclude: false, batches: [] },
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