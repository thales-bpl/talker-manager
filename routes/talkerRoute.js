const express = require('express');

const router = express.Router();

const {
  getAllTalkers,
  getTalkerById,
  postTalker,
  putTalker,
  deleteTalker,
} = require('../talker/talkerController');

const {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatch,
  validateRate,
} = require('../talker/talkerService');

router.get('/', getAllTalkers);

router.get('/:id', getTalkerById);

router.delete('/:id', validateToken, deleteTalker);

router.put(
  '/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatch,
  validateRate,
  putTalker,
);

router.post(
  '/',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatch,
  validateRate,
  postTalker,
);

module.exports = router;
