var express = require('express');
var router = express.Router();

const Restaurant = require("../models/Restaurant");

module.exports = {
    // GET METHOD for home page
    getRestaurantHome: async (req, res) => {
        const restaurant = await Restaurant.findRestaurant(req.params.id);
        res.render('restaurantHome', { restaurant })
    },

    // GET METHOD for menu page
    getRestaurantMenu: async (req, res) => {
        const restaurant = await Restaurant.findRestaurant(req.params.id);
        res.render('restaurantMenu', { restaurant })
    },

    // GET METHOD for reviews page
    getRestaurantReviews: async (req, res) => {
        const restaurant = await Restaurant.findRestaurant(req.params.id);
        res.render('restaurantReviews', { restaurant })
    }
}