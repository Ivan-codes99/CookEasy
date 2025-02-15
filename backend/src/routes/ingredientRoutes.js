const express = require('express');
const { addIngredient, deleteIngredient, getIngredient, getAllIngredients } = require('../controllers/ingredientController');

const router = express.Router();

router.post('/add', addIngredient);
router.patch('/delete', deleteIngredient);
router.get('/get', getIngredient);
router.get('/get-list', getAllIngredients);

module.exports = router;
