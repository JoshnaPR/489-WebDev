var express = require('express');
var router = express.Router();

const Restaurant = require("../models/Restaurant");
const Cuisine = require("../models/Cuisine");

module.exports = {
    // GET METHOD for home page
    getRestaurantHome: async (req, res) => {
        const restaurant = await Restaurant.findRestaurant(req.params.id);
        const cuisines = await Cuisine.listCuisinesByRestaurant({ restaurantID: req.params.id})     // to display cuisine types
        res.render('restaurantHome', { restaurant, cuisines })
    },

    // GET METHOD for menu page
    getRestaurantMenu: async (req, res) => {
        const restaurant = await Restaurant.findRestaurant(req.params.id);
        const cuisines = await Cuisine.listCuisinesByRestaurant({ restaurantID: req.params.id})     // to display cuisine types
        res.render('restaurantMenu', { restaurant, cuisines })
    },

    // GET METHOD for reviews page
    getRestaurantReviews: async (req, res) => {
        const restaurant = await Restaurant.findRestaurant(req.params.id);
        const cuisines = await Cuisine.listCuisinesByRestaurant({ restaurantID: req.params.id})     // to display cuisine types
        res.render('restaurantReviews', { restaurant, cuisines })
    }
}