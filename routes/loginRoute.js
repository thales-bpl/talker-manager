const express = require('express');

const router = express.Router();

const { authEmail, authPassword, createToken } = require('../login/loginService');

router.post('/', authEmail, authPassword, createToken);

module.exports = router;
