// Импортируем модуль bcrypt для хеширования пароля
const bcrypt = require('bcryptjs');

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

  User.findOne({ email })
    .then((user) => {
      // проверяем есть ли пользователь в базе с указанной почтой
      if (!user) {
        // пользователь не найден — отклоняем промис
        // с ошибкой и переходим в блок catch
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      // сравниваем переданный пароль и хеш из базы
      return bcrypt.compare(password, user.password);
    })

    // Если пользователь найден, сверяет хеш его пароля;
    // Проверяем совпали ли хеши
    // eslint-disable-next-line consistent-return
    .then((matched) => {
      if (!matched) {
        // хеши не совпали — отклоняем промис
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      // аутентификация успешна
      res.send({ message: 'Всё верно!' });
    })

    .catch((err) => utils.processError(err, res, errMessgesDict));
};
