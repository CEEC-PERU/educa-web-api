const Category = require('../../models/categoryModel');



exports.getAllCategories = async () => {
  try {
    return await Category.findAll({
      attributes: ['category_id', 'name', 'created_at' , 'logo'], // Include created_at if needed
      order: [['created_at', 'ASC']], // Order by created_at in ascending order
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Error fetching categories');
  }
};


exports.getCategoryById = async (categoryId) => {
  try {
    return await Category.findByPk(categoryId, {
      attributes: ['category_id', 'name'],
    });
  } catch (error) {
    console.error('Error fetching category by ID:', error);
    throw new Error('Error fetching category by ID');
  }
};

// Crear una nueva categoría
exports.createCategory = async (categoryData) => {
  try {
    return await Category.create(categoryData);
  } catch (error) {
    console.error('Error al crear la categoría:', error);
    throw new Error('Error creating category');
  }
};

// Actualizar una categoría existente
exports.updateCategory = async (categoryId, categoryData) => {
  try {
    const category = await Category.findByPk(categoryId);
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
    const category = await Category.findByPk(categoryId);
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
