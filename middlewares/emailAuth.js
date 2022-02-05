const validator = require('email-validator');

const EMAIL_REQUIRED = {
  message: 'O campo "email" é obrigatório',
};

const INVALID_EMAIL = {
  message: 'O "email" deve ter o formato "email@email.com"',
};

const HTTP_BAD_REQUEST = 400;

exports.emailAuth = (req, res, next) => {
  const { email } = req.body;
  const emailCheck = validator.validate(email);
  if (!email) return res.status(HTTP_BAD_REQUEST).json(EMAIL_REQUIRED);
  if (!emailCheck) return res.status(HTTP_BAD_REQUEST).json(INVALID_EMAIL);
  next();
};
