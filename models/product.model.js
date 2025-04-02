const db = require('@config/dbConnect');

// Hàm lấy tất cả sản phẩm
const getAllProducts = (callback) => {
    const query = 'SELECT * FROM mobile';
    db.query(query, callback);
}

// Hàm lấy sản phẩm theo id
const getProductById = (productId, callback) => {
    const query = 'SELECT * FROM mobile WHERE id = ?';
    db.query(query, [productId], callback);
}

// Hàm thêm sản phẩm mới
const addProduct = (product, callback) => {
    const { brand, model, price, storage_capacity, os } = product;
    const query = 'INSERT INTO mobile (brand, model, price, storage_capacity, os) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [brand, model, price, storage_capacity, os], callback);
}

// Hàm cập nhật sản phẩm
const updateProduct = (productId, updateItem, callback) => {
    const selectQuery = 'SELECT * FROM mobile WHERE id = ?';
    db.query(selectQuery, [productId], (err, results) => {
        if (err) {
            return callback(null, null);
        }
        if (results.length === 0) {
            return callback(null, null);
        }

        const fields = [];
        const values = [];

        for (let key of Object.keys(updateItem)) {
            fields.push(`${key} = ?`);
            values.push(updateItem[key]);
        }

        const updateQuery = `UPDATE mobile SET ${fields.join(', ')} WHERE id = ?`;
        values.push(productId);

        db.query(updateQuery, values, (err, result) => {
            if (err) {
                return callback(err, null);
            }

            if (result.affectedRows === 0) {
                return callback(null, null);
            }

            const selectQuery = 'SELECT * FROM mobile WHERE id = ?';
            db.query(selectQuery, [productId], (err, results) => {
                if (err) {
                    return callback(err, null);
                }
                return callback(null, results[0]);
            });
        });
    });
}

// Hàm xoá sản phẩm
const deleteProduct = (productId, callback) => {
    const selectQuery = 'SELECT * FROM mobile WHERE id = ?';
    db.query(selectQuery, [productId], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        if (results.length === 0) {
            return callback(null, null);
        }

        const deleteQuery = 'DELETE FROM mobile WHERE id = ?';
        db.query(deleteQuery, [productId], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            if (result.affectedRows === 0) {
                return callback(null, null);
            }
            return callback(null, { message: 'Product deleted successfully' });
        })
    });
}

module.exports = { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct };