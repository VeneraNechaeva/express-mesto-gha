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
    this.statusCode = ERROR_DELETE_CARD; // Попытка удалить чужую карточку
  }
}

class ExistsEmailError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_EXISTS_EMAIL;
  }
}

// Обработка неправильного пути
const checkIncorrectPath = (req, res, next) => {
  res.status(NotFoundError).send({ message: 'Страница не найдена!' });
  next();
};

// // Регулярное выражение для валидации ссылки
// const validateLink =

module.exports = {
  IncorrectDataError,
  NotFoundError,
  IncorrectAuthorizationError,
  DeleteCardError,
  ExistsEmailError,
  checkIncorrectPath,
  ERROR_INCORRECT_DATA,
  ERROR_NOT_FOUND,
  ERROR_DEFAULT,
  CREATE_SUCCESS,
  ERROR_INCORRECT_LOGIN_OR_PASSWORD,
  ERROR_DELETE_CARD,
  ERROR_EXISTS_EMAIL,
};
