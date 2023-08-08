const router = require('express').Router();
const {
  getUsers, getUserById, updateUser, updateUserAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:userId', getUserById);

/// /// ///
router.patch('/users/me', updateUser);

router.patch('/users/me/avatar', updateUserAvatar);

/// /// /// Роут для получения информации о текущем пользователе
router.get('/users/me', getCurrentUser);

module.exports = router;
