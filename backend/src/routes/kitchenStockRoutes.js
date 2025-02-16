const express = require('express');
const { addIngredient, deleteIngredient, getIngredient, getAllIngredients } = require('../controllers/kitchenStockController');

const router = express.Router();
/*
  TODO Delete category and give user option to move ingredients to Uncategorized, user cannot delete Uncategorized
  TODO Add new category
  TODO Add ingredient, category should always be specified, Uncategorized is a category
  TODO Add expirationDate to a batch, 
  TODO 
*/
router.post('/new-category');
router.delete('/delete-category');

router.post('/add-ingredient', addIngredient);
router.patch('/delete', deleteIngredient);
router.get('/get', getIngredient);
router.get('/get-all', getAllIngredients);

module.exports = router;
