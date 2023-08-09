/* eslint-disable max-classes-per-file */

// Ошибки
const ERROR_INCORRECT_DATA = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_DEFAULT = 500;
const CREATE_SUCCESS = 201;
const ERROR_INCORRECT_LOGIN_OR_PASSWORD = 401;
const ERROR_DELETE_CARD = 403;
const ERROR_EXISTS_EMAIL = 409;

// Собственные конструкторы ошибок
class IncorrectDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_INCORRECT_DATA; // Переданы некорректные данные.
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_NOT_FOUND; // Пользователь/ карточка не найдена.
  }
}

class IncorrectAuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_INCORRECT_LOGIN_OR_PASSWORD; // Передан неверный логин или пароль
  }
}

class DeleteCardError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403; // Попытка удалить чужую карточку
  }
}

class existsEmailError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409; // При регистрации указан email, который уже существует на сервере.
  }
}

// Словарь соответствия ошибок и кодов по умолчанию
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
    res.status(errCode).send({ message: `${errMessges[errCode]} ${err.message}` });
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

module.exports = {
  IncorrectDataError,
  NotFoundError,
  IncorrectAuthorizationError,
  DeleteCardError,
  existsEmailError,
  checkIncorrectPath,
  checkNonEmptyData,
  processError,
  ERROR_INCORRECT_DATA,
  ERROR_NOT_FOUND,
  ERROR_DEFAULT,
  CREATE_SUCCESS,
  ERROR_INCORRECT_LOGIN_OR_PASSWORD,
  ERROR_DELETE_CARD,
  ERROR_EXISTS_EMAIL,
};
