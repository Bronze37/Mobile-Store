const productService = require('@services/product.service');

// Lấy tất cả sản phẩm
const getAllProducts = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const products = await productService.getAllProducts();
        return res.status(200).json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Lấy sản phẩm theo id
const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        return res.status(200).json(product);
    } catch (err) {
        console.error('Error fetching products:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// Thêm sản phẩm
const addProduct = async (req, res) => {
    try {
        const product = await productService.addProduct(req.body);
        return res.status(201).json(product);
    } catch (error) {
        console.error('Error adding product:', error);
        if (error.message === 'Product already exists') {
            return res.status(409).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// Cập nhật sản phẩm
const updateProduct = async (req, res) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        return res.status(200).json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        if (error.message === 'Product already exists') {
            return res.status(409).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// Xóa sản phẩm
const deleteProduct = async (req, res) => {
    try {
        const product = await productService.deleteProduct(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        if (product === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        if (error.message === 'Product not found') {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct };