const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const TALKERFILE = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log(`Online na porta ${PORT}`);
});

app.get('/talker', (_req, res) => {
  fs.readFile(TALKERFILE)
    .then((talkers) => {
      const parsedTalkers = JSON.parse(talkers);
      console.log(`Talkers disponíveis: ${parsedTalkers}`);
      return parsedTalkers.length === 0
      ? res.status(HTTP_OK_STATUS).json([])
      : res.status(HTTP_OK_STATUS).json(parsedTalkers);
    })
    .catch((error) => {
      console.error(`Não foi possível ler o arquivo ${TALKERFILE}. Erro: ${error}`);
      process.exit(1);
    });
});
