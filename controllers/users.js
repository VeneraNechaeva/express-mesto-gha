const utils = require('./utils');

const User = require('../models/user');

// Библиотека ошибок
const errMessgesDict = {
  [utils.ERROR_INCORRECT_DATA]: 'Переданы некорректные данные.',
  [utils.ERROR_NOT_FOUND]: 'Пользователь не найден.',
  [utils.ERROR_DEFAULT]: 'На сервере произошла ошибка.',
};

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
  const { name, about, _id } = req.body;
  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((user) => utils.checkNonEmptyData(user, res, errMessgesDict))
    .catch((err) => utils.processError(err, res, errMessgesDict));
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar, _id } = req.body;
  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((user) => utils.checkNonEmptyData(user, res, errMessgesDict))
    .catch((err) => utils.processError(err, res, errMessgesDict));
};
