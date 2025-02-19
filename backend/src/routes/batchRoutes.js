const express = require('express');
const { addBatch, deleteBatch } = require('../controllers/kitchenStock/batchController');

const router = express.Router();
/*
  TODO Add new batch
  TODO Delete batch
*/
router.post('/add', addBatch);
router.delete('/delete', deleteBatch);

module.exports = router;
