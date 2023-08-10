// Импортируем express
const express = require('express');

// Подключаем mongoose
const mongoose = require('mongoose');

// Подключаем модуль cookie-parser, что бы извлечь данные из заголовка Cookie
const cookieParser = require('cookie-parser');

// Импорт обработчика ошибок celebrate
const { errors } = require('celebrate');

const bodyParser = require('body-parser');

// Импорт библиотеки helmet для защиты приложения  Node.js от
// уязвимостей и кибератак
const helmet = require('helmet');

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const utils = require('./utils/utils');

// Импорт валидаторов запросов
const { loginValidator, createUserValidator } = require('./validators/user_validator');

// Импортируем роуты
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
app.post('/signin', loginValidator, login);
app.post('/signup', createUserValidator, createUser);

app.use(cookieParser()); // подключаем парсер кук как мидлвэр

// Авторизация (Защищаем роуты авторизацией)
app.use(auth);

app.use('/', routerUser); // запускаем
app.use('/', routerCard); // запускаем

app.use(utils.checkIncorrectPath); // запускаем обработку неправильного пути

// Обработчик ошибок celebrate
app.use(errors());

// ////////////////////////////////////////////////////////////////////////////
// Централизованная обработка ошибок
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  let { statusCode = utils.ERROR_DEFAULT, message } = err;
  // если такой email уже есть в базе, тогда статус 409
  if (err.code === 11000) {
    statusCode = utils.ERROR_EXISTS_EMAIL;
    message = 'Пользователь с таким email  уже существует.';
  }
  console.log(err);
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === utils.ERROR_DEFAULT
        ? 'На сервере произошла ошибка'
        : message,
    });
});

// Подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

// Если всё работает, консоль покажет, какой порт приложение слушает
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(DB_URL);
});
