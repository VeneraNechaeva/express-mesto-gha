// Импортируем express
const express = require('express');

// Подключаем mongoose
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const utils = require('./controllers/utils');
const User = require('./models/user');
// Импорт мидлвэра
// const { doesUserExist } = require('./controllers/utils');

// Импортируем роутеры
const routerUser = require('./routes/users');
const routerCard = require('./routes/cards');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

// Cоздание приложения методом express
const app = express();

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

// app.use(doesUserExist);

app.use('/', routerUser); // запускаем
app.use('/', routerCard); // запускаем
app.use(utils.checkIncorrectPath);

// Подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

// Если всё работает, консоль покажет, какой порт приложение слушает
app.listen(PORT, () => { console.log(`App listening on port ${PORT}`); });
