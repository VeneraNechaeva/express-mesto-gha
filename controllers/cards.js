const utils = require('../utils/utils');

const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(utils.CREATE_SUCCESS).send({ data: cards });
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findById(cardId)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        throw new utils.NotFoundError('Карточка не найден.');
      }
      if (card.owner.toString() === userId) {
        Card.findByIdAndRemove(cardId)
          .then((cardAfterDel) => res.send(cardAfterDel))
          .catch((err) => Promise.reject(err));
      } else {
        return Promise.reject(new utils.DeleteCardError('Нельзя удалять чужие карточки!'));
      }
    })
    .catch(next);
};

/// /// ///
module.exports.likeCard = (req, res, next) => {
  const userId = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: userId } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new utils.NotFoundError('Карточка не найденa.');
      }
      res.status(utils.CREATE_SUCCESS).send(card);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  const userId = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: userId } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new utils.NotFoundError('Карточка не найденa.');
      }
      res.send(card);
    })
    .catch(next);
};
