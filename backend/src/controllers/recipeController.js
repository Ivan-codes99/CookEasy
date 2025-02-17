const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });
const User = require('../models/userModel');
const Recipe = require('../models/recipeSchema');

/*
! Use .get() when accessing properties in a Map instead of bracket notation.
*/

/**
 * Get recipe recommendation endpoint
 */
const getRecipeRecommendation = async (req, res) => {
    let { _id, tags } = req.body;

    try {
        const user = await User.findById(_id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const kitchenStock = Object.keys(Object.fromEntries(user.kitchenStock));
        if (kitchenStock.length === 0) {
            return res.status(400).json({ message: "No ingredients found in kitchen stock" });
        }

        const ingredientNames = kitchenStock.join(', ');
        const tagsNames = tags && tags.length ? tags.join(', ') : "any";

        // TODO: refine prompt if you want it to only use ingredients that you have
        const prompt = `Suggest a recipe using: ${ingredientNames}. 
                        Make sure the recipe falls under the category(s) of ${tagsNames}. 
                        Provide a title, a list of ingredients with quantities, and step-by-step instructions. 
                        Format your response as JSON: { "name": "Recipe Name", "ingredients": [{"name": "ingredient1", "quantity": "1 cup"}], "instructions": ["Step 1", "Step 2"], "tags": ["tag1", "tag2"] }`;

        console.log(prompt);

        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 300,
        });

        const gptResponse = response.choices[0].message.content;

        // Try parsing the AI response to JSON
        let recipeData;
        try {
            recipeData = JSON.parse(gptResponse);
        } catch (error) {
            return res.status(500).json({ message: "Error parsing AI response", error: error.message });
        }

        res.json({ recipe: recipeData });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipe', error: error.message });
    }
};

/**
 * Save recipe endpoint
 */
// TODO: recipes's ingredients are being store with ids (Needs fix)
//TODO: request body should be empty for get methods, pass in necessary fields as url parameters
const saveRecipe = async (req, res) => {
    const { _id, recipeResponse } = req.body;

    try {
        if (!_id || !recipeResponse) {
            return res.status(400).json({ message: "User ID and recipe response are required" });
        }

        const user = await User.findById(_id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Parse AI response if it's a string
        let recipeData;
        try {
            recipeData = typeof recipeResponse === 'string' ? JSON.parse(recipeResponse) : recipeResponse;
        } catch (error) {
            return res.status(400).json({ message: "Invalid recipe format", error: error.message });
        }

        const { name, ingredients, instructions, tags } = recipeData;
        if (!name || !ingredients || ingredients.length === 0 || !instructions || instructions.length === 0) {
            return res.status(400).json({ message: "Recipe name, ingredients, and instructions are required" });
        }

        // Ensure `savedRecipes` is initialized as an object (Map-like structure)
        if (!user.savedRecipes || typeof user.savedRecipes !== 'object') {
            user.savedRecipes = {}; // Convert to an empty object if not set
        }

        // Transform ingredients
        const formattedIngredients = ingredients.map(ing => ({
            name: ing.name,
            quantity: ing.quantity || "1",
            // unit: ing.unit || ""
        }));

        user.savedRecipes.set(name, {
            name,
            tags: tags || [],
            ingredients: formattedIngredients,
            instructions,
            // AIGenerated: true,
            // savedAt: new Date()
        });

        await user.save();
        res.status(200).json({ message: "Recipe saved successfully", userSavedRecipes: user.savedRecipes });

    } catch (error) {
        res.status(500).json({ message: "Error saving recipe", error: error.message });
    }
};

/**
 * Remove recipe endpoint
 */
const removeRecipe = async (req, res) => {
    const { _id, recipeName } = req.body;

    try {
        if (!_id || !recipeName) {
            return res.status(400).json({ message: "User ID and Recipe Name are required" });
        }

        const user = await User.findById(_id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.savedRecipes || typeof user.savedRecipes !== "object") {
            return res.status(400).json({ message: "No saved recipes found" });
        }

        // Check if recipe exists in `savedRecipes`
        if (!user.savedRecipes.has(recipeName)) {
            return res.status(404).json({ message: "Recipe not found in user's saved recipes" }); //*Should never reach here from frontend
        }

        // Delete the recipe from `savedRecipes`
        user.savedRecipes.delete(recipeName);
        await user.save();

        res.status(200).json({ message: "Recipe deleted successfully", userSavedRecipes: user.savedRecipes });

    } catch (error) {
        res.status(500).json({ message: "Error deleting recipe", error: error.message });
    }
};


/**
 * Get saved recipe
 */
const getSavedRecipe = async (req, res) => {
    const { _id, recipeName } = req.body;

    try {
        if (!_id || !recipeName) {
            return res.status(400).json({ message: "User ID and Recipe Name are required" });
        }

        const user = await User.findById(_id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.savedRecipes || typeof user.savedRecipes !== "object") {
            return res.status(404).json({ message: "No saved recipes found" });
        }

        if (user.savedRecipes.has(recipeName)) {
            let savedRecipe = user.savedRecipes.get(recipeName);
            return res.status(200).json({ message: "Recipe found successfully", recipe: savedRecipe });
        }

        return res.status(404).json({ message: "Recipe not found" });

    } catch (error) {
        res.status(500).json({ message: "Error retrieving recipe", error: error.message });
    }
};



/**
 * Get all saved recipes
 */
const getAllSavedRecipes = async (req, res) => {
    const { _id } = req.body; // Expecting user ID only

    try {
        if (!_id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await User.findById(_id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.savedRecipes || typeof user.savedRecipes !== "object") {
            return res.status(404).json({ message: "No saved recipes found" });
        }

        const savedRecipes = Object.fromEntries(user.savedRecipes);

        return res.status(200).json({ message: "All saved recipes retrieved successfully", savedRecipes });

    } catch (error) {
        res.status(500).json({ message: "Error retrieving saved recipes", error: error.message });
    }
};

module.exports = { getRecipeRecommendation, saveRecipe, removeRecipe, getSavedRecipe, getAllSavedRecipes };
