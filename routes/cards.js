const router = require('express').Router();

// Импорт контроллеров
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

// Импорт валидаторов запросов
const {
  getCardsValidator, createCardValidator, deleteCardValidator,
  likeCardValidator, dislikeCardValidator,
} = require('../validators/card_validator');

router.get('/cards', getCardsValidator, getCards);

router.post('/cards', createCardValidator, createCard);

router.delete('/cards/:cardId', deleteCardValidator, deleteCard);

/// /// ///
router.put('/cards/:cardId/likes', likeCardValidator, likeCard);

router.delete('/cards/:cardId/likes', dislikeCardValidator, dislikeCard);

module.exports = router;
