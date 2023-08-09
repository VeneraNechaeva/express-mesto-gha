const mongoose = require('mongoose');

// Импортируем модуль bcrypt для хеширования пароля
const bcrypt = require('bcryptjs');

const validator = require('validator');

// Создаём схему
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'Минимальная длина поля "about" - 2'],
    maxlength: [30, 'Максимальная длина поля "about" - 30'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return /https?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=]+$/gi.test(v);
      },
      message: 'Некорректный URL',
    },
  },
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено'],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректный Email',
    },
  },
  password: {
    type: String,
    select: false,
    required: [true, 'Поле "password" должно быть заполнено'],
    minlength: [8, 'Минимальная длина поля "password" - 8'],
    maxlength: [20, 'Максимальная длина поля "password" - 20'],
  },
}, { versionKey: false });

// Добавим собственный метод findUserByCredentials схеме пользователя
// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  // проверяем есть ли пользователь в базе с указанной почтой
  return this.findOne({ email }).select('+password') // this — это модель User
    // eslint-disable-next-line consistent-return
    .then((user) => {
      // пользователь не найден — отклоняем промис
      // с ошибкой и переходим в блок catch
      if (!user) {
        console.log('not find user');
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      // нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // хеши не совпали — отклоняем промис
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

// Создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
