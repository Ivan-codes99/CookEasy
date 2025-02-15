const express = require('express');
const { getRecipeRecommendation, saveRecipe, removeRecipe, getSavedRecipe, getAllSavedRecipes } = require('../controllers/recipeController');

const router = express.Router();

router.get('/recommend', getRecipeRecommendation);
router.post('/save', saveRecipe);
router.delete('/remove', removeRecipe);
router.get('/get', getSavedRecipe);
router.get('/get-list', getAllSavedRecipes);

module.exports = router;
