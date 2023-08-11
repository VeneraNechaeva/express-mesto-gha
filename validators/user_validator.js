// Импорт иблиотеки для валидации данных запроса
const { celebrate, Joi } = require('celebrate');

const { validateLink } = require('../utils/utils');

module.exports.getCurrentUserValidator = celebrate({
  body: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});

module.exports.getUserByIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

module.exports.updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    user: Joi.object().keys({ _id: Joi.string().length(24).hex().required() }),
  }),
});

module.exports.updateUserAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(validateLink),
    user: Joi.object().keys({ _id: Joi.string().length(24).hex().required() }),
  }),
});

module.exports.loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.createUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(validateLink),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
