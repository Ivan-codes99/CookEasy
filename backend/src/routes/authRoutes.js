const express = require('express');
const { login, register } = require('../controllers/authController');
const { getUserData } = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', authenticate, getUserData);

module.exports = router;