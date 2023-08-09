// Импорт иблиотеки для валидации данных запроса
const { celebrate, Joi } = require('celebrate');

module.exports.getCurrentUserValidator = celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required().pattern(/^[a-f\d]{24}$/),
  }),
});

module.exports.getUserByIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().pattern(/^[a-f\d]{24}$/),
  }),
});

module.exports.updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    user: Joi.object().keys({ _id: Joi.string().required().pattern(/^[a-f\d]{24}$/) }),
  }),
});

module.exports.updateUserAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/https?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=]+$/),
    user: Joi.object().keys({ _id: Joi.string().required().pattern(/^[a-f\d]{24}$/) }),
  }),
});

module.exports.loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(20),
  }),
});

module.exports.createUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/https?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=]+$/),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(20),
  }),
});
