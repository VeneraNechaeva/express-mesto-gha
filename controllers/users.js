// Импортируем модуль bcrypt для хеширования пароля
const bcrypt = require('bcryptjs');

// Импортируем модуль jsonwebtoken для создания токенов
const jwt = require('jsonwebtoken');

const utils = require('../utils/utils');

const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new utils.NotFoundError('Пользователь не найден.');
      }
      res.send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash, // записываем хеш в базу
    }))
    .then((user) => {
      // eslint-disable-next-line no-param-reassign
      user.password = undefined;
      res.status(utils.CREATE_SUCCESS).send({ data: user });
    })
    .catch(next);
};

/// /// ///
module.exports.updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new utils.NotFoundError('Пользователь не найден.');
      }
      res.send(user);
    })
    .catch(next);
};

module.exports.updateUserAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new utils.NotFoundError('Пользователь не найден.');
      }
      res.send(user);
    })
    .catch(next);
};

/// /// ///
// Создаём контроллер аутентификации
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new utils.IncorrectAuthorizationError('Передан неверный логин или пароль.');
      }
      // создадим токен
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' }, // токен будет просрочен через неделю
      );

      // сохраним токен в куки
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
        // вернем токен
      }).send({ token });
    })
    .catch(next);
};

// Контроллер для получения информации о текущем пользователе
module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new utils.NotFoundError('Пользователь не найден.');
      }
      res.send(user);
    })
    .catch(next);
};
