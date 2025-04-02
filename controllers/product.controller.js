const productModel = require('@models/product.model');

// Lấy tất cả sản phẩm
const getAllProducts = (req, res) => {
    productModel.getAllProducts((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json(results);
    })
}

// Lấy sản phẩm theo id
const getProductById = (req, res) => { 
    productModel.getProductById(req.params.id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json(results[0]);
    })
}

// Thêm sản phẩm mới
const addProduct = (req, res) => {
    const product = req.body;
    productModel.addProduct(product, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(201).json({
            message: 'Product added successfully',
            data: {
                id: results.insertId,
                ...product
            }
        });
    })
}

// Cập nhật sản phẩm
const updateProduct = (req, res) => {
    productModel.updateProduct(req.params.id, req.body, (err, results) => { 
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results === null) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json({
            message: 'Product updated successfully',
            data: results
        });
    });
}

// Xoá sản phẩm
const deleteProduct = (req, res) => {
    productModel.deleteProduct(req.params.id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results === null) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json({
            data: results
        });
    })
}

module.exports = { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct };