const Cart = require('@models/cart.model');
const CartItem = require('@models/cartItem.model');
const { parse } = require('dotenv');

const getCartByUserId = async (userId) => {
    try {
        const cart = await Cart.findOne({
            where: { user_id: userId },
            include: {
                model: CartItem,
                as: 'cartItems',
                attributes: ['id', 'product_id', 'quantity'],
            },
        });
        return cart;
    } catch (error) {
        throw error;
    }
}

const addItemToCart = async (userId, productId, quantity) => {
    try {
        let cart = await Cart.findOne({ where: { user_id: userId } });
        if (!cart) {
            cart = await Cart.create({ user_id: userId });
        }

        const [cartItem, created] = await CartItem.findOrCreate({
            where: { cart_id: cart.id, product_id: productId },
            defaults: { quantity },
        });

        if (!created) {
            cartItem.quantity += Number(quantity);
            await cartItem.save();
        }

        return cartItem;
    } catch (error) {
        throw error;
    }
}

const updateCartItem = async (userId, productId, quantity) => {
    try {
        const cart = await Cart.findOne({ where: { user_id: userId } });
        if (!cart) {
            throw new Error('Cart not found for this user');
        }

        const cartItem = await CartItem.findOne({ where: { cart_id: cart.id, product_id: productId } });
        if (!cartItem) {
            throw new Error('Cart item not found');
        }

        cartItem.quantity = Number(quantity);

        if (cartItem.quantity <= 0) {
            await cartItem.destroy();
            return null;
        }
        await cartItem.save();
        return cartItem;
    } catch (error) {
        throw error;
    }
}

const removeItemFromCart = async (userId, productId) => {
    try {
        const cart = await Cart.findOne({
            where: { user_id: userId },
            include: {
                model: CartItem,
                as: 'cartItems',
                attributes: ['id', 'product_id', 'quantity'],
            },
        });

        if (!cart) {
            throw new Error('Cart not found for this user');
        }

        const cartItem = await CartItem.findOne({ where: { cart_id: cart.id, product_id: productId } });
        if (!cartItem) {
            return { message: 'Cart item removed successfully' }
        }

        await cartItem.destroy();
        return { message: 'Cart item removed successfully' }
    } catch (error) {
        throw error;
    }
}

const clearCart = async (userId) => {
    try {
        const cart = await Cart.findOne({
            where: { user_id: userId },
            include: {
                model: CartItem,
                as: 'cartItems',
                attributes: ['id', 'product_id', 'quantity'],
            },
        });
        if (!cart) {
            throw new Error('Cart not found for this user');
        }

        await CartItem.destroy({ where: { cart_id: cart.id } });
        return { message: 'Cart cleared successfully' };
    } catch (error) {
        throw error;
    }
}

module.exports = { getCartByUserId, addItemToCart, updateCartItem, removeItemFromCart, clearCart };
