// Ошибки
const ERROR_INCORRECT_DATA = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_DEFAULT = 500;

const defaultErrNameToCodeDict = {
  CastError: ERROR_NOT_FOUND,
  ValidationError: ERROR_INCORRECT_DATA,
};

// Функция обработки ошибок
const processError = (err, res, errMessges, errNameToCodeDict = defaultErrNameToCodeDict) => {
  console.log(err);
  const errCode = errNameToCodeDict[err.name];

  if (err.name === 'CastError') {
    res.status(errCode).send({ message: errMessges[errCode] });
  } else if (err.name === 'ValidationError') {
    res.status(errCode).send({ message: errMessges[errCode] });
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
