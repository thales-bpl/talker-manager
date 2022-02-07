const express = require('express');

const router = express.Router();

const { getAllTalkers, getTalkerById } = require('../talker/talkerController');

router.get('/', getAllTalkers);

router.get('/:id', getTalkerById);

module.exports = router;
