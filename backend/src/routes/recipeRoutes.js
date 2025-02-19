const express = require('express');
const { getRecipeRecommendation, saveRecipe, removeRecipe, getSavedRecipe, getAllSavedRecipes } = require('../controllers/recipeController');
const { generateRecipe } = require('../controllers/OpenAI/aiRecipeController');

const router = express.Router();
router.get('/generate-recipe', generateRecipe);
router.get('/recommend', getRecipeRecommendation);
router.post('/save', saveRecipe);
router.delete('/remove', removeRecipe);
router.get('/get', getSavedRecipe);
router.get('/get-all-recipes', getAllSavedRecipes);

module.exports = router;
