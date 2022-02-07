const express = require('express');

const router = express.Router();

const {
  getAllTalkers,
  getTalkerById,
  postTalker,
  putTalker,
  deleteTalker,
  queryTalker,
} = require('../talker/talkerController');

const {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatch,
  validateRate,
} = require('../talker/talkerService');

router.get('/search', validateToken, queryTalker);

router.route('/:id')
  .get(getTalkerById)
  .delete(validateToken, deleteTalker)
  .put(
    validateToken,
    validateName,
    validateAge,
    validateTalk,
    validateWatch,
    validateRate,
    putTalker,
  );

router.route('/')
  .get(getAllTalkers)
  .post(
    validateToken,
    validateName,
    validateAge,
    validateTalk,
    validateWatch,
    validateRate,
    postTalker,
  );

module.exports = router;
