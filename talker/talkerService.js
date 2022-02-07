const moment = require('moment');

const TOKEN_REQUIRED = {
  message: 'Token não encontrado',
};

const INVALID_TOKEN = {
  message: 'Token inválido',
};

const NAME_REQUIRED = {
  message: 'O campo "name" é obrigatório',
};

const INVALID_NAME = {
  message: 'O "name" deve ter pelo menos 3 caracteres',
};

const AGE_REQUIRED = {
  message: 'O campo "age" é obrigatório',
};

const INVALID_AGE = {
  message: 'A pessoa palestrante deve ser maior de idade',
};

const REJECT_AGE = {
  message: 'Idade precisa ser um número inteiro',
};

const INVALID_TALK = {
  message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
};

const INVALID_WATCHDATE = {
  message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
};

const INVALID_RATE = {
  message: 'O campo "rate" deve ser um inteiro de 1 à 5',
};

const HTTP_BAD_REQUEST = 400;
const HTTP_UNAUTHORIZED = 401;

exports.validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(HTTP_UNAUTHORIZED).json(TOKEN_REQUIRED);
  if (authorization.length !== 16) return res.status(HTTP_UNAUTHORIZED).json(INVALID_TOKEN);
  next();
};

exports.validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(HTTP_BAD_REQUEST).json(NAME_REQUIRED);
  if (name.length < 3) return res.status(HTTP_BAD_REQUEST).json(INVALID_NAME);
  next();
};

exports.validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(HTTP_BAD_REQUEST).json(AGE_REQUIRED);
  if (!Number.isInteger(age)) return res.status(HTTP_BAD_REQUEST).json(REJECT_AGE);
  if (age < 19) return res.status(HTTP_BAD_REQUEST).json(INVALID_AGE);
  next();
};

// crédito lógica do if: Weltom Thomas
// src: https://github.com/tryber/sd-014-b-project-talker-manager/edit/thomas-project-talker-manager/controllers/talkerController.js
exports.validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) { 
    return res.status(HTTP_BAD_REQUEST).json(INVALID_TALK);
  }
  next();
};

// moment
// src: https://stackoverflow.com/questions/17433472/date-validation-in-nodejs
exports.validateWatch = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  if (!moment(watchedAt, 'DD/MM/YYYY').isValid()) {
    return res.status(HTTP_BAD_REQUEST).json(INVALID_WATCHDATE);
  }
  next();
};

exports.validateRate = (req, res, next) => {
  const { rate } = req.body.talk;
  if (!(rate && Number.isInteger(rate) && rate >= 1 && rate <= 5)) { 
    return res.status(HTTP_BAD_REQUEST).json(INVALID_RATE);
  }
  next();
};
