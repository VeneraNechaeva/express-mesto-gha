// Подключаем лимитер запросов ( для ограничения количества запросов )
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  massage: 'В настоящий момент превышено количество запросов на сервер. Пожалуйста повторите позже. Спасибо.',
});

module.exports = { limiter };
