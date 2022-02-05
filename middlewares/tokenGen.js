const randtoken = require('rand-token');

const TOKEN = {
  token: randtoken.generate(16),
};

const HTTP_OK_STATUS = 200;

exports.tokenGen = (_req, res) => {
  res.status(HTTP_OK_STATUS).json(TOKEN);
};
