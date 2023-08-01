// Импортируем express
const express = require('express');

// Подключаем mongoose
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

// Импортируем роутеры
// const router = require('./routes/users');
const routerUser = require('./routes/users');
const routerCard = require('./routes/cards');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

// Cоздание приложения методом express
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/', router); // запускаем
app.use('/', routerUser); // запускаем
app.use('/', routerCard); // запускаем

// Временное решение авторизации
app.use((req, res, next) => {
  req.user = {
    _id: '64c8b44d8a7bf83527ca2fd2',
  };

  next();
});

// Подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

// Если всё работает, консоль покажет, какой порт приложение слушает
app.listen(PORT, () => { console.log(`App listening on port ${PORT}`); });
