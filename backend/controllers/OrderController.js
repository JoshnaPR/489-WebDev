const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const Cart = require("../models/Cart");
const MenuItem = require("../models/MenuItem");

const placeOrder = async (req, res) => {
    try {
        const { userId } = req.body;

        // Fetch cart items
        const cartItems = await Cart.findAll({ where: { userId }, include: MenuItem });

        if (!cartItems.length) return res.status(400).json({ message: "Cart is empty" });

        // Calculate total price
        let totalPrice = cartItems.reduce((total, item) => total + (item.MenuItem.price * item.quantity), 0);

        // Create order
        const order = await Order.create({ userId, totalPrice });

        // Create order items
        for (let item of cartItems) {
            await OrderItem.create({
                orderId: order.id,
                menuItemId: item.menuItemId,
                quantity: item.quantity,
                price: item.MenuItem.price
            });
        }

        // Clear cart after order placement
        await Cart.destroy({ where: { userId } });

        res.status(201).json({ message: "Order placed successfully!", order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getOrdersByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.findAll({
            where: { userId },
            include: { model: OrderItem, include: MenuItem }
        });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: { model: OrderItem, include: MenuItem }
        });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await Order.findByPk(id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        order.status = status;
        await order.save();

        res.json({ message: "Order status updated!", order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { placeOrder, getOrdersByUser, getAllOrders, updateOrderStatus };
