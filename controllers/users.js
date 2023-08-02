const utils = require('./utils');

const User = require('../models/user');

// Словарь описания ошибок
const errMessgesDict = {
  [utils.ERROR_INCORRECT_DATA]: 'Переданы некорректные данные.',
  [utils.ERROR_NOT_FOUND]: 'Пользователь не найден.',
  [utils.ERROR_DEFAULT]: 'На сервере произошла ошибка.',
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
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
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
