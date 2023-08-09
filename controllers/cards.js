const utils = require('../utils/utils');

const Card = require('../models/card');

const errMessgesDict = {
  [utils.ERROR_INCORRECT_DATA]: 'Переданы некорректные данные.',
  [utils.ERROR_NOT_FOUND]: 'Карточка не найдена.',
  [utils.ERROR_DEFAULT]: 'На сервере произошла ошибка.',
};

const errNameToCodeDict = {
  CastError: utils.ERROR_INCORRECT_DATA,
  ValidationError: utils.ERROR_NOT_FOUND,
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => utils.processError(err, res, errMessgesDict));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(utils.CREATE_SUCCESS).send({ data: card }))
    .catch((err) => utils.processError(err, res, errMessgesDict));
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findById(cardId)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (card.owner.toString() === userId) {
        Card.findByIdAndRemove(cardId)
          .then((cardAfterDel) => utils.checkNonEmptyData(cardAfterDel, res, errMessgesDict))
          .catch((err) => utils.processError(err, res, errMessgesDict, errNameToCodeDict));
      } else {
        return Promise.reject(new Error('Нельзя удалять чужие карточки!'));
      }
    })
    .catch((err) => utils.processError(err, res, errMessgesDict, errNameToCodeDict));
};

/// /// ///
module.exports.likeCard = (req, res) => {
  const userId = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: userId } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => utils.checkNonEmptyData(card, res, errMessgesDict))
    .catch((err) => utils.processError(err, res, errMessgesDict, errNameToCodeDict));
};

module.exports.dislikeCard = (req, res) => {
  const userId = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: userId } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => utils.checkNonEmptyData(card, res, errMessgesDict))
    .catch((err) => utils.processError(err, res, errMessgesDict, errNameToCodeDict));
};
