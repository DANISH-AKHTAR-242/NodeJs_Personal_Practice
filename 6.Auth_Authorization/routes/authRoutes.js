const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { login, register } = require('../controllers/authController');
const { default: mongoose } = require('mongoose');

const router = express.Router();

// router.post( "/login", authMiddleware);


router.post('/login', login);
router.post('/register', register);

module.exports = router;
