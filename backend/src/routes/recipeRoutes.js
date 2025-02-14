const express = require('express');
const { getRecipeRecommendation, saveRecipe } = require('../controllers/recipeController');

const router = express.Router();

router.get('/recommend', getRecipeRecommendation);
router.post('/save', saveRecipe);
// TODO: uncomment when logic for saving recipes is ready
// router.delete('/remove', removeRecipe);
// router.get('/get', getSavedRecipe);
// router.get('/get-list', getAllSavedRecipes);

module.exports = router;
