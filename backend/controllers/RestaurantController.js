// This is where the actual logic lies for Restaurants
const Restaurant = require('../models/Restaurant');

// Create a new restaurant
const createRestaurant = async (req, res) => {
    try {
        const { name, address, phone, cuisineType } = req.body;
        const restaurant = await Restaurant.create({ name, address, phone, cuisineType });
        res.status(201).json({ message: "Restaurant added!", restaurant });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all restaurants
const getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single restaurant by ID
const getRestaurantById = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await Restaurant.findByPk(id);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a restaurant
const updateRestaurant = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, phone, cuisineType } = req.body;

        const restaurant = await Restaurant.findByPk(id);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        await restaurant.update({ name, address, phone, cuisineType });
        res.json({ message: "Restaurant updated!", restaurant });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a restaurant
const deleteRestaurant = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await Restaurant.findByPk(id);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        await restaurant.destroy();
        res.json({ message: "Restaurant deleted!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createRestaurant, getRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant };
