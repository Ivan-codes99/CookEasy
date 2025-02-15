const express = require('express');
const { addIngredient, deleteIngredient, getIngredient, getAllIngredients } = require('../controllers/kitchenStockController');

const router = express.Router();

router.post('/add', addIngredient);
router.patch('/delete', deleteIngredient);
router.get('/get', getIngredient);
router.get('/get-all', getAllIngredients);

module.exports = router;
