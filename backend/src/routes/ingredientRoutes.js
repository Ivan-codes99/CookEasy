const express = require('express');
const { addIngredient, deleteIngredient, toggleIngredientExcluded, getValidIngredients } = require('../controllers/ingredientController');

const router = express.Router();
/*

*/

router.post('/add', addIngredient);
router.delete('/delete', deleteIngredient);
router.patch('/exclusion', toggleIngredientExcluded);
router.get('/validIngredients', getValidIngredients);

module.exports = router;
