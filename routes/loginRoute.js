const express = require('express');

const router = express.Router();

const { validateEmail, validatePassword, createToken } = require('../login/loginService');

router.post('/', validateEmail, validatePassword, createToken);

module.exports = router;
