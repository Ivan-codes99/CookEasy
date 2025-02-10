const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

/**
 * Get recipe recommendation endpoint
 */
const getRecipeRecommendation = async (req, res) => { /// This is where the API Testing code will go
    try {
        const ingredients = ["Tomato", "Onion", "Garlic", "Basil"];
        const ingredientNames = ingredients.join(', ');

        const prompt = `Suggest a recipe using: ${ingredientNames}. Provide a title and instructions.`;

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
    res.status(200).json({ message: 'Ingredient added', ingredient: req.body });
};

/**
 * Save a recipe endpoint
 */
const saveRecipe = async (req, res) => {
    res.status(200).json({ message: 'Recipe saved', recipe: req.body });
};

module.exports = { getRecipeRecommendation, addIngredient, saveRecipe };
