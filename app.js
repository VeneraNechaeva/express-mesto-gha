// Импортируем express
const express = require('express');

// Подключаем mongoose
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

// Импорт библиотеки helmet для защиты приложения  Node.js от
// уязвимостей и кибератак
const helmet = require('helmet');

const utils = require('./utils/utils');
const User = require('./models/user');

// Импортируем роутеры
const routerUser = require('./routes/users');
const routerCard = require('./routes/cards');

// Слушаем 3000 порт
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

// Cоздание приложения методом express
const app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Временное решение авторизации
app.use((req, res, next) => {
  const getFirstUser = User.find({})[0];
  req.user = {
    _id: getFirstUser === undefined ? '64c8b44d8a7bf83527ca2fd2' : getFirstUser._id,
  };
  next();
});

app.use('/', routerUser); // запускаем
app.use('/', routerCard); // запускаем
app.use(utils.checkIncorrectPath); // запускаем обработку неправильного пути

// Подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

// Если всё работает, консоль покажет, какой порт приложение слушает
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(DB_URL);
});
