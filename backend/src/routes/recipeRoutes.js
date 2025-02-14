const express = require('express');
const { getRecipeRecommendation, addIngredient, deleteIngredient, saveRecipe } = require('../controllers/recipeController');

const router = express.Router();

router.get('/recommend', getRecipeRecommendation);
router.post('/add', addIngredient);
//* I used patch not delete because the function does not delete the ingredient from the user's kitchenStock it decreases it, even if it reaches 0.
router.patch('/delete', deleteIngredient); // TODO document and test in Postman
router.post('/save', saveRecipe);

module.exports = router;
