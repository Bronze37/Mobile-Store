const Product = require('@models/product.model');

// Hàm lấy tất cả sản phẩm
const getAllProducts = async () => {
    try {
        const products = await Product.findAll();
        return products;
    } catch (error) {
        throw error;
    }
};

// Hàm lấy sản phẩm theo id
const getProductById = async (id) => {
    try {
        const product = await Product.findOne({ where: { id } });
        return product;
    } catch (error) {
        throw error;
    }
}

// Hàm thêm sản phẩm
const addProduct = async (product) => {
    try {
        const existingProduct = await Product.findOne({ where: { model: product.model } });
        if (existingProduct) {
            throw new Error('Product already exists');
        }
        const newProduct = await Product.create(product);
        return newProduct;
    } catch (error) {
        throw error;
    }
}


// Hàm cập nhật sản phẩm
const updateProduct = async (id, product) => {
    try {
        const existingProduct = await Product.findOne({ where: { id } });
        if (!existingProduct) {
            throw new Error('Product not found');
        }
        const affectedRows = await Product.update(product, { where: { id } });
        if (affectedRows[0] === 0) {
            throw new Error('Product not found');
        }
        const updatedProduct = await Product.findOne({ where: { id } });
        if (!updatedProduct) {
            throw new Error('Product not found');
        }
        return updatedProduct;
    } catch (error) {
        throw error;
    }
}

// Hàm xoá sản phẩm
const deleteProduct = async (id) => {
    try {
        const existingProduct = await Product.findOne({ where: { id } });
        if (!existingProduct) {
            throw new Error('Product not found');
        }
        const affectedRows = await Product.destroy({ where: { id } });
        if (affectedRows === 0) {
            throw new Error('Product not found');
        }
        return affectedRows;
    } catch (error) {
        throw error;
    }
}

module.exports = { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct };