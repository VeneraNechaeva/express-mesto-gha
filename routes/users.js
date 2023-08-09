const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();
const {
  getUsers, getUserById, updateUser, updateUserAvatar, getCurrentUser,
} = require('../controllers/users');

/// /// /// Роут для получения информации о текущем пользователе
router.get('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(new RegExp(/https?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=]+$/gi)),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), getCurrentUser);

router.get('/users',
celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(new RegExp(/https?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=]+$/gi)),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}),
getUsers);

router.get('/users/:userId', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(new RegExp(/https?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=]+$/gi)),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}),
getUserById);

/// /// ///
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(new RegExp(/https?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=]+$/gi)),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}),
updateUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(new RegExp/https?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=]+$/gi),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}),

updateUserAvatar);

module.exports = router;
