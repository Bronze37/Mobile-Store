const categoryService = require('@services/category.service');

const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        return res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const getCategoryById = async (req, res) => {
    try {
        const category = await categoryService.getCategoryById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        return res.status(200).json(category);
    } catch (error) {
        console.error('Error fetching category:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const createCategory = async (req, res) => {
    try {
        const category = await categoryService.createCategory(req.body);
        return res.status(201).json(category);
    } catch (error) {
        console.error('Error creating category:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const updateCategory = async (req, res) => {
    try {
        const category = await categoryService.updateCategory(req.params.id, req.body);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        return res.status(200).json(category);
    } catch (error) {
        console.error('Error updating category:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteCategory = async (req, res) => {
    try {
        const category = await categoryService.deleteCategory(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        return res.status(204).send();
    } catch (error) {
        console.error('Error deleting category:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };