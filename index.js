const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK = 200;
const PORT = '3000';

const talkerRouter = require('./routes/talkerRoute');
const loginRouter = require('./routes/loginRoute');

app.use('/talker', talkerRouter);
app.use('/login', loginRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK).send();
});

app.listen(PORT, () => {
  console.log(`Online na porta ${PORT}`);
});
