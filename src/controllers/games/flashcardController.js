const FlashCardService = require('../../services/games/flashcardService');

// Crear flashcard
exports.createFlashCard = async (req, res, next) => {
  try {
    const flashCard = await FlashCardService.createFlashCard(req.body);
    res.status(201).json(flashCard);
  } catch (error) {
    next(error);
  }
};

// Obtener todas las flashcards
exports.getAllFlashCards = async (req, res, next) => {
  try {
    const flashCards = await FlashCardService.getAllFlashCards();
    res.json(flashCards);
  } catch (error) {
    next(error);
  }
};

// Obtener flashcards por module_id
exports.getFlashCardsByModuleId = async (req, res, next) => {
  const { module_id } = req.params;
  try {
    const flashCards = await FlashCardService.getFlashCardsByModuleId(module_id);
    res.json(flashCards);
  } catch (error) {
    next(error);
  }
};

// Obtener flashcard por ID
exports.getFlashCardById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const flashCard = await FlashCardService.getFlashCardById(id);
    if (!flashCard) {
      return res.status(404).json({ message: 'FlashCard no encontrada' });
    }
    res.json(flashCard);
  } catch (error) {
    next(error);
  }
};

// Actualizar flashcard
exports.updateFlashCard = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updated = await FlashCardService.updateFlashCard(id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'FlashCard no encontrada' });
    }
    res.json({ message: 'FlashCard actualizada correctamente' });
  } catch (error) {
    next(error);
  }
};

// Eliminar flashcard
exports.deleteFlashCard = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleted = await FlashCardService.deleteFlashCard(id);
    if (!deleted) {
      return res.status(404).json({ message: 'FlashCard no encontrada' });
    }
    res.json({ message: 'FlashCard eliminada correctamente' });
  } catch (error) {
    next(error);
  }
};
