const express = require('express');
const router = express.Router();
const FlashCardController = require('../../controllers/games/flashcardController');

// Crear una flashcard
router.post('/', FlashCardController.createFlashCard);

// Obtener todas las flashcards
router.get('/', FlashCardController.getAllFlashCards);

// Obtener flashcards por module_id
router.get('/module/:module_id', FlashCardController.getFlashCardsByModuleId);

// Obtener flashcard por ID
router.get('/:id', FlashCardController.getFlashCardById);

// Actualizar flashcard por ID
router.put('/:id', FlashCardController.updateFlashCard);

// Eliminar flashcard por ID
router.delete('/:id', FlashCardController.deleteFlashCard);

module.exports = router;
