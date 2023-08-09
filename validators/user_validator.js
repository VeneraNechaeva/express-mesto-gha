// // // Импорт иблиотеки для валидации данных запроса
const { celebrate, Joi } = require('celebrate');

// const celebrate = celebrate(
//   {
//     body: Joi.object().keys({
//       name: Joi.string().min(2).max(30),
//       about: Joi.string().min(2).max(30),
//       avatar: Joi.string().pattern(new RegExp(/https?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=]+$/gi)),
//       email: Joi.string().required().email(),
//       password: Joi.string().required().min(8),
//     })
//   });

module.exports.getCurrentUserValidator = celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required().pattern(/^[a-f\d]{24}$/),
  }),

  headers: Joi.object().keys({
    authorization: Joi.string().required().pattern,
  }).unknown(true),
});

module.exports.getUsersValidator = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
});

module.exports.getUserByIdValidator = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().min(24).max(24),
  }),

  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
});

module.exports.updateUserValidator = celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required().pattern(/^[a-f\d]{24}$/),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),

  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
});

module.exports.updateUserAvatarValidator = celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required().pattern(/^[a-f\d]{24}$/),
    avatar: Joi.string().pattern(/https?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=]+$/gi),
  }),

  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
});

module.exports.loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports.createUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/https?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=]+$/gi),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});
