const PasswordValidator = require('password-validator');

const PASSWORD_REQUIRED = {
  message: 'O campo "password" é obrigatório',
};

const INVALID_PASSWORD = {
  message: 'O "password" deve ter pelo menos 6 caracteres',
};

const HTTP_BAD_REQUEST = 400;

exports.pwAuth = (req, res, next) => {
  const { password } = req.body;
  const schema = new PasswordValidator();
  schema.is().min(6);
  if (!password) return res.status(HTTP_BAD_REQUEST).json(PASSWORD_REQUIRED);
  if (!schema.validate(password)) return res.status(HTTP_BAD_REQUEST).json(INVALID_PASSWORD);
  next();
};
