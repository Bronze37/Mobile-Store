const Product = require('@models/product.model');
const Category = require('@models/category.model');
const { get } = require('../routes/category.route');

const getAllCategories = async () => {
    try {
        const categories = await Category.findAll({
            include: {
                model: Product,
                as: 'products',
                attributes: ['brand', 'model', 'price', 'storage_capacity'],
            },
        });
        return categories;
    } catch (error) {
        throw error;
    }
}

const getCategoryById = async (id) => {
    try {
        const category = await Category.findByPk(id, {
            include: {
                model: Product,
                as: 'products',
                attributes: ['brand', 'model', 'price', 'storage_capacity'],
            },
            attributes: ['id', 'name', 'description'],
        });
        return category;
    } catch (error) {
        throw error;
    }
}

const createCategory = async (categoryData) => { 
    try {
        const category = await Category.create(categoryData);
        return category;
    } catch (error) {
        throw error;
    }
}

const updateCategory = async (id, categoryData) => {
    try {
        const category = await Category.findByPk(id);
        if (!category) {
            throw new Error('Category not found');
        }
        await category.update(categoryData);
        return category;
    } catch (error) {
        throw error;
    }
}

const deleteCategory = async (id) => {
    try {
        const category = await Category.findByPk(id);
        if (!category) {
            throw new Error('Category not found');
        }
        await category.destroy();
        return category;
    } catch (error) {
        throw error;
    }
}

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };