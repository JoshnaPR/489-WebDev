const Cart = require('../models/Cart');
const MenuItem = require('../models/MenuItem');

// Add item to cart
const addToCart = async (req, res) => {
    try {
        const { userId, menuItemId, quantity } = req.body;

        let cartItem = await Cart.findOne({ where: { userId, menuItemId } });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            cartItem = await Cart.create({ userId, menuItemId, quantity });
        }

        res.status(201).json({ message: "Item added to cart!", cartItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get cart items for a user
const getCartItems = async (req, res) => {
    try {
        const { userId } = req.params;
        const cartItems = await Cart.findAll({ 
            where: { userId },
            include: { model: MenuItem }
        });
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        const cartItem = await Cart.findByPk(id);
        if (!cartItem) return res.status(404).json({ message: "Item not found" });

        cartItem.quantity = quantity;
        await cartItem.save();

        res.json({ message: "Cart updated!", cartItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
    try {
        const { id } = req.params;

        const cartItem = await Cart.findByPk(id);
        if (!cartItem) return res.status(404).json({ message: "Item not found" });

        await cartItem.destroy();
        res.json({ message: "Item removed from cart!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Clear entire cart for a user
const clearCart = async (req, res) => {
    try {
        const { userId } = req.params;
        await Cart.destroy({ where: { userId } });
        res.json({ message: "Cart cleared!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addToCart, getCartItems, updateCartItem, removeFromCart, clearCart };
