const FlashCard = require('../../models/FlashcardModel');

const FlashCardService = {
  // Crear flashcard
  async createFlashCard(data) {
    return await FlashCard.create(data);
  },

  // Obtener todas las flashcards
  async getAllFlashCards() {
    return await FlashCard.findAll();
  },

  // Obtener flashcards por module_id
  async getFlashCardsByModuleId(module_id) {
    return await FlashCard.findAll({
      where: { module_id }
    });
  },

  // Obtener flashcard por ID
  async getFlashCardById(id) {
    return await FlashCard.findByPk(id);
  },

  // Actualizar flashcard
  async updateFlashCard(id, data) {
    return await FlashCard.update(data, {
      where: { flashcard_id: id }
    });
  },

  // Eliminar flashcard
  async deleteFlashCard(id) {
    return await FlashCard.destroy({
      where: { flashcard_id: id }
    });
  }
};

module.exports = FlashCardService;
