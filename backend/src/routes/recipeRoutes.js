const express = require('express');
const { getRecipeRecommendation, addIngredient, deleteIngredient, saveRecipe } = require('../controllers/recipeController');

const router = express.Router();

router.get('/recommend', getRecipeRecommendation);
router.post('/add', addIngredient);
router.patch('/delete', deleteIngredient); // TODO document and test in Postman
router.post('/save', saveRecipe);

module.exports = router;
