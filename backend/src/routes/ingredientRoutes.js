const express = require('express');
const { addIngredient, deleteIngredient, getIngredient, getAllIngredients } = require('../controllers/ingredientController');

const router = express.Router();

router.post('/add', addIngredient);
router.patch('/delete', deleteIngredient);
// TODO: might replaced the post methods to get methods once we add headers to HTTP calls
router.post('/get', getIngredient);
router.post('/get-list', getAllIngredients);

module.exports = router;
