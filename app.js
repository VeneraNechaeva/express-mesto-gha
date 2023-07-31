// Подключаем express
const express = require('express');
// Подключаем mongoose
const mongoose = require('mongoose');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

// Cоздание приложения методом express
const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Если всё работает, консоль покажет, какой порт приложение слушает
app.listen(PORT, () => { console.log(`App listening on port ${PORT}`); });
