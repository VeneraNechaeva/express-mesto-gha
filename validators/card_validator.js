// Импорт иблиотеки для валидации данных запроса
const { celebrate, Joi } = require('celebrate');

// const { validateLink } = require('../utils/utils');

module.exports.createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/https?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=]+$/),
  }),

});

/// /// ///
module.exports.deleteCardValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

/// /// ///
module.exports.likeCardValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

/// /// ///
module.exports.dislikeCardValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});
