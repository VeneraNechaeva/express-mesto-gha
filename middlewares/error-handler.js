// Централизованная обработка ошибок

const utils = require('../utils/utils');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = utils.ERROR_DEFAULT, message } = err;
  console.log(err);
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === utils.ERROR_DEFAULT
        ? 'На сервере произошла ошибка'
        : message,
    });
};

module.exports = { errorHandler };
