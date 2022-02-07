const fs = require('fs').promises;

const TALKER_FILE = './talker.json';

const HTTP_OK = 200;
const HTTP_NOT_FOUND = 404;

const TALKER_NOT_FOUND = {
  message: 'Pessoa palestrante não encontrada',
};

exports.getAllTalkers = (_req, res) => {
  fs.readFile(TALKER_FILE)
    .then((talkers) => {
      const parsedTalkers = JSON.parse(talkers);
      console.log(`Talkers disponíveis: ${parsedTalkers}`);
      return parsedTalkers.length === 0
      ? res.status(HTTP_OK).json([])
      : res.status(HTTP_OK).json(parsedTalkers);
    })
    .catch((error) => {
      console.error(`Não foi possível ler o arquivo ${TALKER_FILE}. Erro: ${error}`);
      process.exit(1);
    });
  };

exports.getTalkerById = (req, res) => {
  const { id } = req.params;
  fs.readFile(TALKER_FILE)
    .then((talkers) => {
      const parsedTalkers = JSON.parse(talkers);
      const talkerById = parsedTalkers.find((talker) => talker.id === parseInt(id, 10));
      return !talkerById
      ? res.status(HTTP_NOT_FOUND).json(TALKER_NOT_FOUND)
      : res.status(HTTP_OK).json(talkerById);
    })
    .catch((error) => {
      console.error(`Não foi possível ler o arquivo ${TALKER_FILE}. Erro: ${error}`);
      process.exit(1);
    });
};
