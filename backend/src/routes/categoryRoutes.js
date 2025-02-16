const express = require('express');
const { addCategory, deleteCategory, } = require('../controllers/categoryController');

const router = express.Router();
/*
  TODO When deleting, give user option to move ingredients to Uncategorized, user cannot delete Uncategorized
  TODO Add new category
  TODO Modify category name
*/
router.post('/add', addCategory);
router.delete('/delete', deleteCategory);

module.exports = router;
