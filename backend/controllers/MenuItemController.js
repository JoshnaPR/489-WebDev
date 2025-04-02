// This is where the actual logic lies for Menu Items
const MenuItem = require('../models/MenuItem');

// Create a new menu item
const createMenuItem = async (req, res) => {
    try {
        const { name, description, price, restaurantId } = req.body;
        const menuItem = await MenuItem.create({ name, description, price, category, restaurantId });
        res.status(201).json({ message: "Menu item added!", menuItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all menu items for a restaurant
const getMenuItemsByRestaurant = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const menuItems = await MenuItem.findAll({ where: { restaurantId } });
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a menu item
const updateMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category } = req.body;

        const menuItem = await MenuItem.findByPk(id);
        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        await menuItem.update({ name, description, price, category });
        res.json({ message: "Menu item updated!", menuItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a menu item
const deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const menuItem = await MenuItem.findByPk(id);
        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        await menuItem.destroy();
        res.json({ message: "Menu item deleted!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createMenuItem, getMenuItemsByRestaurant, updateMenuItem, deleteMenuItem };
