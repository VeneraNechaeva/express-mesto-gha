// Импортируем express
const express = require('express');

// Подключаем mongoose
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

// Импортируем роутер
const router = require('./routes/users');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

// Cоздание приложения методом express
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router); // запускаем

// Подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

// Если всё работает, консоль покажет, какой порт приложение слушает
app.listen(PORT, () => { console.log(`App listening on port ${PORT}`); });
