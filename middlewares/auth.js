// Защита роутов авторизацией (Авторизационный мидлвэр)
const jwt = require('jsonwebtoken');

const utils = require('../utils/utils');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  // достаём токен из Куки
  const jwtToken = req.cookies.jwt;

  let payload;

  try {
    // верифицируем токен (verify вернёт пейлоуд токена, если он прошёл проверку)
    payload = jwt.verify(jwtToken, 'some-secret-key');
  } catch (err) {
    // отправим ошибку, если не получилось
    return res.status(utils.IncorrectAuthorizationError).send({ message: 'Необходима авторизация' });
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
