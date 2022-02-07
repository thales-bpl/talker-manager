const express = require('express');

const router = express.Router();

const { emailAuth, pwAuth, tokenGenerator } = require('../middlewares/loginMiddlewares');

router.post('/', emailAuth, pwAuth, tokenGenerator);

module.exports = router;
