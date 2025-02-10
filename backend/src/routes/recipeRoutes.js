const express = require('express');
const { getRecipeRecommendation, addIngredient, saveRecipe } = require('../controllers/recipeController');

const router = express.Router();

router.get('/recommend', getRecipeRecommendation);
router.post('/ingredient', addIngredient);
router.post('/save', saveRecipe);

module.exports = router;
