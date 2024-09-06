const classroomService = require('../../services/enterprise/classroomService');

exports.getAllClassroom= async (req, res) => {
  try {
    const classroom = await classroomService.getAllClassroom();
    res.json(classroom);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
{/*
exports.getCategoryById = async (req, res) => {
  const categoryId = parseInt(req.params.id, 10);
  if (isNaN(categoryId)) {
    return res.status(400).json({ error: 'Invalid category ID' });
  }

  try {
    const category = await classroomService.getCategoryById(categoryId);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
*/}

// Crear una nueva categoría
exports.createClassroom = async (req, res) => {
  try {
    const newClassroom = await classroomService.createClassroom(req.body);
    res.status(200).json({
      message: "Clase creada exitosamente",
      newCategory
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
{/*
// Actualizar una categoría existente
exports.updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const updatedCategory = await categoryService.updateCategory(categoryId, req.body);
    if (updatedCategory) {
      res.json(updatedCategory);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Eliminar una categoría
exports.deleteCategory = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const deletedCategory = await categoryService.deleteCategory(categoryId);
    if (deletedCategory) {
      res.json({ message: 'Category deleted successfully' });
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
*/}