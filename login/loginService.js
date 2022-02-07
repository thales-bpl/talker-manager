const validator = require('email-validator');
const PasswordValidator = require('password-validator');
const randtoken = require('rand-token');
// crédito para Welton Thomas pelos node packages
// src: https://github.com/tryber/sd-014-b-project-talker-manager/blob/b21fa49586916d8912140711c6e36b4d874f6380/controllers/loginController.js

const HTTP_OK = 200;
const HTTP_BAD_REQUEST = 400;

const EMAIL_REQUIRED = {
  message: 'O campo "email" é obrigatório',
};

const INVALID_EMAIL = {
  message: 'O "email" deve ter o formato "email@email.com"',
};

const PASSWORD_REQUIRED = {
  message: 'O campo "password" é obrigatório',
};

const INVALID_PASSWORD = {
  message: 'O "password" deve ter pelo menos 6 caracteres',
};

exports.authEmail = (req, res, next) => {
  const { email } = req.body;
  const emailCheck = validator.validate(email);
  if (!email) return res.status(HTTP_BAD_REQUEST).json(EMAIL_REQUIRED);
  if (!emailCheck) return res.status(HTTP_BAD_REQUEST).json(INVALID_EMAIL);
  next();
};

exports.authPassword = (req, res, next) => {
  const { password } = req.body;
  const schema = new PasswordValidator();
  schema.is().min(6);
  if (!password) return res.status(HTTP_BAD_REQUEST).json(PASSWORD_REQUIRED);
  if (!schema.validate(password)) return res.status(HTTP_BAD_REQUEST).json(INVALID_PASSWORD);
  next();
};

exports.createToken = (_req, res) => {
  const TOKEN = {
    token: randtoken.generate(16),
  };
  res.status(HTTP_OK).json(TOKEN);
};