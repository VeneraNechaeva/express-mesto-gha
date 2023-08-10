// Защита роутов авторизацией (Авторизационный мидлвэр)
const jwt = require('jsonwebtoken');
// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  // достаём токен из Куки
  // const tokenType = req.cookies.token;
  const jwtToken = req.cookies.jwt;
  // убеждаемся, что он есть или начинается с Bearer
  // if (!tokenType || !tokenType.startsWith('Bearer')) {
  //   return res
  //     .status(401)
  //     .send({ message: 'Необходима авторизация' });
  // }

  // извлечём токен (выкинув из заголовка приставку 'Bearer ')

  let payload;

  try {
    // верифицируем токен (verify вернёт пейлоуд токена, если он прошёл проверку)
    payload = jwt.verify(jwtToken, 'some-secret-key');
  } catch (err) {
    // отправим ошибку, если не получилось
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
