// Импорт иблиотеки для валидации данных запроса
const { celebrate, Joi } = require('celebrate');

module.exports.getCardsValidator = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().pattern,
  }).unknown(true),
});

module.exports.createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/https?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=]+$/),
  }),

  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
});

/// /// ///
module.exports.deleteCardValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().pattern(/^[a-f\d]{24}$/),
  }),

  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
});

/// /// ///
module.exports.likeCardValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().pattern(/^[a-f\d]{24}$/),
  }),

  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
});

/// /// ///
module.exports.dislikeCardValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().pattern(/^[a-f\d]{24}$/),
  }),

  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
});
