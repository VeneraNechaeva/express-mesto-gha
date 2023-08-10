const mongoose = require('mongoose');

// Создаём схему
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },
  link: {
    type: String,
    validate: {
      validator(v) {
        return /https?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=]+$/gi.test(v);
      },
      message: 'Некорректный URL',
    },
    required: [true, 'Поле "link" должно быть заполнено'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Поле "owner" должно быть заполнено'],
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

// Создаём модель и экспортируем её
module.exports = mongoose.model('card', cardSchema);
