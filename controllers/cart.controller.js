const cartService = require('@services/cart.service');

const getCartByUserId = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await cartService.getCartByUserId(userId);
        return res.status(200).json(cart);
    } catch (error) {
        console.error('Error fetching cart:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const addItemToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;
        const cartItem = await cartService.addItemToCart(userId, productId, quantity);
        return res.status(201).json(cartItem);
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const updateCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;
        const cartItem = await cartService.updateCartItem(userId, productId, quantity);
        return res.status(200).json(cartItem);
    } catch (error) {
        console.error('Error updating cart item:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const removeItemFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;
        const result = await cartService.removeItemFromCart(userId, productId);
        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ error: 'Cart item not found' });
        }
    } catch (error) {
        console.error('Error deleting cart item:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await cartService.clearCart(userId);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error clearing cart:', error);
        if (error.message === 'Cart not found for this user') {
            return res.status(404).json({ error: 'Cart not found' });
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { getCartByUserId, addItemToCart, updateCartItem, removeItemFromCart, clearCart };