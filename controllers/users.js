// Импортируем модуль bcrypt для хеширования пароля
const bcrypt = require('bcryptjs');

// Импортируем модуль jsonwebtoken для создания токенов
const jwt = require('jsonwebtoken');

const utils = require('../utils/utils');

const User = require('../models/user');

// Словарь описания ошибок
const errMessgesDict = {
  [utils.ERROR_INCORRECT_DATA]: 'Переданы некорректные данные.',
  [utils.ERROR_NOT_FOUND]: 'Пользователь не найден.',
  [utils.ERROR_DEFAULT]: 'На сервере произошла ошибка.',
  [utils.ERROR_INCORRECT_LOGIN_OR_PASSWORD]: 'Неверный логин или пароль.',
};

// Словарь соответствия ошибок и кодов
const errNameToCodeDict = {
  CastError: utils.ERROR_INCORRECT_DATA,
  ValidationError: utils.ERROR_NOT_FOUND,
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => utils.processError(err, res, errMessgesDict));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => utils.checkNonEmptyData(user, res, errMessgesDict))
    .catch((err) => utils.processError(err, res, errMessgesDict, errNameToCodeDict));
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  // Хешируем пароль
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash, // записываем хеш в базу
    }))

    .then((user) => res.status(utils.CREATE_SUCCESS).send({ data: user }))
    .catch((err) => utils.processError(err, res, errMessgesDict));
};

/// /// ///
module.exports.updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => utils.checkNonEmptyData(user, res, errMessgesDict))
    .catch((err) => utils.processError(err, res, errMessgesDict));
};

module.exports.updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => utils.checkNonEmptyData(user, res, errMessgesDict))
    .catch((err) => utils.processError(err, res, errMessgesDict));
};

/// /// ///
// Создаём контроллер аутентификации
module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      console.log('login!', user);
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' }, // токен будет просрочен через неделю
      );

      // вернём токен
      res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

// Контроллер для получения информации о текущем пользователе
module.exports.getCurrentUser = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => utils.checkNonEmptyData(user, res, errMessgesDict))
    .catch((err) => utils.processError(err, res, errMessgesDict, errNameToCodeDict));
};
