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

// TODO: save a recipe endpoint
const saveRecipe = async (req, res) => {
    res.status(404).json({ message: 'Recipe saved', recipe: req.body });
};

// TODO: remove a recipe endpoint
const removeRecipe = async (req, res) => {
    res.status(404).json({ message: 'Recipe removed', recipe: req.body });
};

// TODO: get saved recipe endpoint
const getSavedRecipe = async (req, res) => {
    res.status(404).json({ message: 'Recipe found', recipe: req.body });
};

// TODO: get all saved recipes endpoint
const getAllSavedRecipes = async (req, res) => {
    res.status(404).json({ message: 'Recipes found', recipe: req.body });
};

module.exports = { getRecipeRecommendation, saveRecipe };
