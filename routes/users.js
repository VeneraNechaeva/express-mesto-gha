const router = require('express').Router();

// Импорт контроллеров
const {
  getUsers, getUserById, updateUser, updateUserAvatar, getCurrentUser,
} = require('../controllers/users');

// Импорт валидаторов запросов
const {
  getCurrentUserValidator, getUserByIdValidator,
  updateUserValidator, updateUserAvatarValidator,
} = require('../validators/user_validator');

/// /// /// Роут для получения информации о текущем пользователе
router.get('/users/me', getCurrentUserValidator, getCurrentUser);

router.get('/users', getUsers);

router.get('/users/:userId', getUserByIdValidator, getUserById);

/// /// ///
router.patch('/users/me', updateUserValidator, updateUser);

router.patch('/users/me/avatar', updateUserAvatarValidator, updateUserAvatar);

module.exports = router;
