const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });
const User = require('../models/userModel');

/**
 * Get recipe recommendation endpoint
 */
// TODO: send a list of ingredients,
const getRecipeRecommendation = async (req, res) => {

    try {
        const user = await User.findById(_id); 
        if (!user) return res.status(404).json({ message: "User not found" });

        // TODO: Get ingredients from mongoDB, need to pass _id for this

        const ingredients = ["tomato", "onion", "garlic", "basil", "rice", "oats", "flour", "baking powder", "baking soda", "yeast", "sugar",
                            "honey", "olive oil", "vinegar", "black beans", "tomatoes", "canned tuna", "ketchup", "mustard", "salt", "black pepper",
                            "paprika", "oregano", "basil", "cinnamon", "milk", "butter", "cheddar cheese", "mozzarella cheese", "parmesan", "yogurt", "eggs",
                            "apples", "bananas", "chicken breast", "ground beef", "shrimp", "blueberries", "mango", "tortillas", "sliced bread"]; // we don't have to use all ingredients
        const tags = ["vegan"]     //example tags to test: breakfast, dinner, vegan, vegetarian, protein-heavy, keto-friendly
        const ingredientNames = ingredients.join(', ');
        const tagsNames = tags.join(', ');

        const prompt = `Suggest a recipe using: ${ingredientNames}. You don't have to use all the ingredients. 
                        Make sure the recipe falls under the category(s) of 
                        ${tagsNames}. Provide a title and instructions.`;

        console.log(prompt)
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 200,
        });

        const gptResponse = response.choices[0].message.content;

        res.json({ recipe: gptResponse });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipe', error: error.message });
    }
};

/**
 * Add ingredient endpoint
 */
const addIngredient = async (req, res) => {
    let { _id, name, category, quantity } = req.body;

    try {
        const user = await User.findById(_id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Check if ingredient already exists in kitchen stock
        if (user.kitchenStock.has(name)) {
            let existingIngredient = user.kitchenStock.get(name);

            // Update quantity
            existingIngredient.quantity += quantity;
            // TODO: update expirationDate logic with stock
        } else {
            user.kitchenStock.set(name, {
                category,
                quantity: quantity
            });
        }
        await user.save();
        res.status(200).json({ message: "Ingredient added successfully", kitchenStock: user.kitchenStock });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteIngredient = async (req, res) => { // decreases quantity, doesn't delete from User's kitchen stock
    let { _id, name, category, quantity } = req.body;

    try {
        const user = await User.findById(_id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Check if ingredient already exists in kitchen stock
        if (user.kitchenStock.has(name)) {
            let existingIngredient = user.kitchenStock.get(name);

            // Update quantity
            existingIngredient.quantity = max(0, existingIngredient.quantity - quantity); // should we delete if we reach 0?
            
        } else { // this else should really never be reached
            console.log("deleting ingredient that user doesn't have. This shouldn't happen.")
        }
        await user.save();
        res.status(200).json({ message: "Ingredient deleted successfully", kitchenStock: user.kitchenStock });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// save a recipe endpoint
const saveRecipe = async (req, res) => {
    res.status(200).json({ message: 'Recipe saved', recipe: req.body });
};

module.exports = { getRecipeRecommendation, addIngredient, deleteIngredient, saveRecipe };
