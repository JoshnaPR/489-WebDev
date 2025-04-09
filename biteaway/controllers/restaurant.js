var express = require('express');
var router = express.Router();

const Restaurant = require("../models/Restaurant");
const Cuisine = require("../models/Cuisine");
const Review = require("../models/Review");
const Item = require("../models/Item");


module.exports = {
    // GET METHOD for home page
    getRestaurantHome: async (req, res) => {
        const restaurant = await Restaurant.findRestaurant(req.params.id);
        const cuisines = await Cuisine.listCuisinesByRestaurant({ restaurantID: req.params.id})     // to display cuisine types
        const reviews = await Review.listReviewsByRestaurant({ restaurantID: req.params.id });      // to display review data for home page
        const items = await Item.listItemsByRestaurant({ restaurantID: req.params.id })              // to display items from restaurant menu
        res.render('restaurantHome', { restaurant, cuisines, reviews, items })
    },
 
    // GET METHOD for menu page
    getRestaurantMenu: async (req, res) => {
        const restaurant = await Restaurant.findRestaurant(req.params.id);
        const cuisines = await Cuisine.listCuisinesByRestaurant({ restaurantID: req.params.id })     // to display cuisine types
        const items = await Item.listItemsByRestaurant({ restaurantID: req.params.id })              // to display items from restaurant menu
        res.render('restaurantMenu', { restaurant, cuisines, items })
    },

    // GET METHOD for reviews page
    getRestaurantReviews: async (req, res) => {
        const restaurant = await Restaurant.findRestaurant(req.params.id);
        const cuisines = await Cuisine.listCuisinesByRestaurant({ restaurantID: req.params.id})     // to display cuisine types
        const reviews = await Review.listReviewsByRestaurant({ restaurantID: req.params.id });      // to display review data for home page
        res.render('restaurantReviews', { restaurant, cuisines, reviews })
    }
}