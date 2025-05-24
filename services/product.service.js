const Product = require('@models/product.model');
const Category = require('@models/category.model');
const { Op } = require('sequelize');

// Hàm lấy tất cả sản phẩm
const getProductsByFilters = async (filters) => {
    try {
        const whereClause = {};
        if (filters.model) {
            whereClause.model = {
                [Op.like]: `%${filters.model}%`,
            };
        }
        
        if (filters.brand) {
            whereClause.brand = filters.brand;
        }
        if (filters.minPrice) {
            whereClause.price = { [Op.gte]: filters.minPrice };
        }
        if (filters.maxPrice) {
            whereClause.price = { ...whereClause.price, [Op.lte]: filters.maxPrice };
        }
        if (filters.storage_capacity) {
            whereClause.storage_capacity = filters.storage_capacity;
        }
        if (filters.os) {
            whereClause.os = filters.os;
        }
        if (filters.categoryId) {
            whereClause.categoryId = filters.categoryId;
        }

        const products = await Product.findAll({
            where: whereClause,
            include: {
                model: Category,
                as: 'category',
                attributes: ['name', 'description'],
            },
            attributes: ['id', 'brand', 'model', 'price', 'storage_capacity', 'os'],
        });
        return products;
    } catch (error) {
        throw error;
    }
};

// Hàm lấy sản phẩm theo id
const getProductById = async (id) => {
    try {
        const product = await Product.findByPk(id, {
            include: {
                model: Category,
                as: 'category',
                attributes: ['name', 'description'],
            },
            attributes: ['id', 'brand', 'model', 'price', 'storage_capacity', 'os'],
        });
        return product;
    } catch (error) {
        throw error;
    }
}

// Hàm thêm sản phẩm
const addProduct = async (product) => {
    try {
        const newProduct = await Product.create(product);
        return newProduct;
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            throw new Error('Product with the same model already exists');
        }
        throw error;
    }
}


// Hàm cập nhật sản phẩm
const updateProduct = async (id, product) => {
    try {
        const existingProduct = await Product.findByPk(id);
        if (!existingProduct) {
            throw new Error('Product not found');
        }
        const [affectedRows] = await Product.update(product, { where: { id } });
        if (affectedRows === 0) {
            throw new Error('Failed to update product');
        }
        const updatedProduct = await Product.findByPk(id);
        return updatedProduct;
    } catch (error) {
        console.error('Error updating product:', error.message);
        throw error;
    }
};

// Hàm xoá sản phẩm
const deleteProduct = async (id) => {
    try {
        const existingProduct = await Product.findOne({ where: { id } });
        if (!existingProduct) {
            throw new Error('Product not found');
        }
        const affectedRows = await Product.destroy({ where: { id } });
        if (affectedRows === 0) {
            throw new Error('Failed to delete product');
        }
        return affectedRows;
    } catch (error) {
        throw error;
    }
}

module.exports = { getProductsByFilters, getProductById, addProduct, updateProduct, deleteProduct };