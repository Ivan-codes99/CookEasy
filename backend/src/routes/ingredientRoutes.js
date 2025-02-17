const express = require('express');
const { addIngredient, deleteIngredient, toggleIngredientExcluded } = require('../controllers/ingredientController');

const router = express.Router();
/*

*/

router.post('/add', addIngredient);
router.delete('/delete', deleteIngredient);
router.patch('/exclusion', toggleIngredientExcluded);

module.exports = router;
