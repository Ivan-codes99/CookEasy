const express = require('express');
const { addCategory, deleteCategory, toggleCategoryExcluded} = require('../controllers/kitchenStock/categoryController');

const router = express.Router();
/*
  TODO When deleting, give user option to move ingredients to Uncategorized, 
  TODO user cannot delete Uncategorized
  TODO Modify category name
*/

router.post('/add', addCategory);
router.delete('/delete', deleteCategory);
router.patch('/exclusion', toggleCategoryExcluded);

module.exports = router;
