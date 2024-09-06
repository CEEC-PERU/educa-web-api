const Classroom = require('../../models/Classroom');

exports.getAllClassroom = async () => {
  try {
    return await Classroom.findAll({});
  } catch (error) {
    console.error('Error fetching classroom:', error);
    throw new Error('Error fetching categories');
  }
};

exports.getClassroomById = async (classroomId) => {
  try {
    return await Classroom.findByPk(classroomId, {});
  } catch (error) {
    console.error('Error fetching category by ID:', error);
    throw new Error('Error fetching category by ID');
  }
};

// Crear una nueva categoría
exports.createClassroom = async (classroomData) => {
  try {
    return await Classroom.create(classroomData);
  } catch (error) {
    console.error('Error al crear la classroom:', error);
    throw new Error('Error creating classroom');
  }
};

{/*
// Actualizar una categoría existente
exports.updateClassroom = async (categoryId, categoryData) => {
  try {
    const category = await Classroom.findByPk(categoryId);
    if (category) {
      await category.update(categoryData);
      return category;
    }
    return null;
  } catch (error) {
    console.error('Error al actualizar la categoría:', error);
    throw new Error('Error updating category');
  }
};

// Eliminar una categoría
exports.deleteCategory = async (categoryId) => {
  try {
    const category = await Classroom.findByPk(categoryId);
    if (category) {
      await category.destroy();
      return category;
    }
    return null;
  } catch (error) {
    console.error('Error al eliminar la categoría:', error);
    throw new Error('Error deleting category');
  }
};
 */}