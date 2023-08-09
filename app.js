// Импортируем express
const express = require('express');

// Подключаем mongoose
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

// Импорт библиотеки helmet для защиты приложения  Node.js от
// уязвимостей и кибератак
const helmet = require('helmet');

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const utils = require('./utils/utils');

// // Импорт валидаторов запросов
// const { loginValidator, createUserValidator } = require('./validators/user_validator');

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

// Роуты для логина и регистрации
app.post('/signin', login);
app.post('/signup', createUser);

// Авторизация (Защищаем роуты авторизацией)
app.use(auth);

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
