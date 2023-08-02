// Ошибки
const ERROR_INCORRECT_DATA = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_DEFAULT = 500;

// Функция обработки ошибок
const processError = (err, res, errMessges) => {
  console.log(err);

  if (err.name === 'CastError') {
    res.status(ERROR_NOT_FOUND).send({ message: errMessges[ERROR_NOT_FOUND] });
  } else if (err.name === 'ValidationError') {
    res.status(ERROR_INCORRECT_DATA).send({ message: errMessges[ERROR_INCORRECT_DATA] });
  } else {
    res.status(ERROR_DEFAULT).send({ message: errMessges[ERROR_DEFAULT] });
  }
};

// Функция проверки данных ответа
const checkNonEmptyData = (data, res, errMessges, errorCode = ERROR_NOT_FOUND) => {
  if (data === null) {
    res.status(errorCode).send({ message: errMessges[errorCode] });
  } else res.send({ data });
};

// Обработка неправильного пути
const checkIncorrectPath = (req, res, next) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Страница не найдена!' });
  next();
};

// // Импортируем модель User
// const User = require('../models/user');

// // Проверяем, существует ли пользователь (функция мидлвэр)
// const doesUserExist = (req, res, next) => {
//   if (!User[req.params._id]) {
//     res.send('Такого пользователя не существует');
//     return;
//   }

//   next(); // вызываем next
// };

module.exports = {
  // doesUserExist,
  checkIncorrectPath,
  checkNonEmptyData,
  processError,
  ERROR_INCORRECT_DATA,
  ERROR_NOT_FOUND,
  ERROR_DEFAULT,
};
