// const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();

// Импорт контроллеров
const {
  getUsers, getUserById, updateUser, updateUserAvatar, getCurrentUser,
} = require('../controllers/users');

// // Импорт валидаторов запросов
// const {
//   getCurrentUserValidator, getUsersValidator, getUserByIdValidator,
//   updateUserValidator, updateUserAvatarValidator,
// } = require('../validators/user_validator');

/// /// /// Роут для получения информации о текущем пользователе
router.get('/users/me', getCurrentUser);

router.get('/users', getUsers);

router.get('/users/:userId', getUserById);

/// /// ///
router.patch('/users/me', updateUser);

router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
