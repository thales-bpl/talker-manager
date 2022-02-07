const fs = require('fs').promises;

const TALKER_JSON_FILE = './talker.json';

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NO_CONTENT = 204;
const HTTP_NOT_FOUND = 404;

const TALKER_NOT_FOUND = {
  message: 'Pessoa palestrante não encontrada',
};

const READ_ERROR = (error) => `Unable to read file: ${TALKER_JSON_FILE}.
${error}`;

const POST_ERROR = (error) => `Failed to post talker.
${error}`;

const PUT_ERROR = (error) => `Unable to edit talker.
${error}`;

const DELETE_ERROR = (error) => `Unable to delete talker.
${error}`;

exports.getAllTalkers = (_req, res) => {
  fs.readFile(TALKER_JSON_FILE)
    .then((talkers) => JSON.parse(talkers))
    .then((talkers) => {
      console.log(`Talkers disponíveis: ${talkers}`);
      return talkers.length === 0
      ? res.status(HTTP_OK).json([])
      : res.status(HTTP_OK).json(talkers);
    })
    .catch((error) => {
      console.error(READ_ERROR(error));
      process.exit(1);
    });
};

exports.getTalkerById = (req, res) => {
  const { id } = req.params;
  fs.readFile(TALKER_JSON_FILE)
    .then((talkers) => JSON.parse(talkers))
    .then((talkers) => {
      const talkerById = talkers.find((talker) => talker.id === parseInt(id, 10));
      return !talkerById
      ? res.status(HTTP_NOT_FOUND).json(TALKER_NOT_FOUND)
      : res.status(HTTP_OK).json(talkerById);
    })
    .catch((error) => {
      console.error(READ_ERROR(error));
      process.exit(1);
    });
};

exports.postTalker = (req, res) => {
  const { body } = req;
  fs.readFile(TALKER_JSON_FILE)
    .then((talkers) => JSON.parse(talkers))
    .then((talkers) => {
      const newTalker = { id: talkers.length + 1, ...body };
      fs.writeFile(TALKER_JSON_FILE, JSON.stringify([...talkers, newTalker]));
      return newTalker;
    })
    .then((newTalker) => res.status(HTTP_CREATED).json(newTalker))
    .catch((error) => {
      console.error(POST_ERROR(error));
      process.exit(1);
    });
};

exports.putTalker = (req, res) => {
  const { body } = req;
  const { id } = req.params;
  fs.readFile(TALKER_JSON_FILE)
    .then((talkers) => JSON.parse(talkers))
    .then((talkers) => talkers.filter((talker) => talker.id !== parseInt(id, 10)))
    .then((talkers) => {
      const newTalker = { id: parseInt(id, 10), ...body };
      fs.writeFile(TALKER_JSON_FILE, JSON.stringify([...talkers, newTalker]));
      return newTalker;
    })
    .then((updtTalkers) => res.status(HTTP_OK).json(updtTalkers))
    .catch((error) => {
      console.error(PUT_ERROR(error));
      process.exit(1);
    });
};

exports.deleteTalker = (req, res) => {
  const { id } = req.params;
  fs.readFile(TALKER_JSON_FILE)
  .then((talkers) => JSON.parse(talkers))
  .then((talkers) => talkers.filter((talker) => talker.id !== parseInt(id, 10)))
  .then((updtTalkers) => fs.writeFile(TALKER_JSON_FILE, JSON.stringify([updtTalkers])))
  .then(() => res.status(HTTP_NO_CONTENT).json())
  .catch((error) => {
    console.error(DELETE_ERROR(error));
    process.exit(1);
  });
};
