const express = require('express');
const { addIngredient, deleteIngredient } = require('../controllers/ingredientController');

const router = express.Router();
/*
  TODO Add ingredient, category should always be specified, Uncategorized is a category
  TODO delete ingredient
  
*/

router.post('/add', addIngredient);
router.delete('/delete', deleteIngredient);

module.exports = router;
