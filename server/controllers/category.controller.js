import Category from '../models/Category.js';

export const createCategory = async (req, res) => {
  try {
    const { name, type } = req.body;
    const userId = req.userId;

    const newCategory = new Category({
      name,
      type,
      user: userId,
    });

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    if (err.code === 11000) { 
      return res.status(400).json({ message: 'Category with this name already exists for this user.' });
    }
    res.status(500).json({ message: err.message |
      | 'Error creating category.' });
}
};

export const getCategories = async (req, res) => {
  try {
    const userId = req.userId;
    const categories = await Category.find({ user: userId });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message |
| 'Error fetching categories.' });
}
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { name, type } = req.body;

    const updatedCategory = await Category.findOneAndUpdate(
      { _id: id, user: userId },
      { name, type },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found or you do not have permission to update it.' });
    }
    res.status(200).json(updatedCategory);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Category with this name already exists for this user.' });
    }
    res.status(500).json({ message: err.message |
| 'Error updating category.' });
}
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const deletedCategory = await Category.findOneAndDelete({ _id: id, user: userId });

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found or you do not have permission to delete it.' });
    }
    res.status(200).json({ message: 'Category deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message |
| 'Error deleting category.' });
}
};
