const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

const talkerRouter = require('./routes/talkerRoute');
const loginRouter = require('./routes/loginRoute');

app.use('/talker', talkerRouter);
app.use('/login', loginRouter);

app.listen(PORT, () => {
  console.log(`Online na porta ${PORT}`);
});
