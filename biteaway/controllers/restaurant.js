var express = require('express');
var router = express.Router();

const Restaurant = require("../models/Restaurant");
const Cuisine = require("../models/Cuisine");
const Review = require("../models/Review");
const Item = require("../models/Item");
const User = require("../models/User");


module.exports = {

    getRestaurantHome: async (req, res) => {
        const restaurant = await Restaurant.findRestaurant(req.params.id);
        const cuisines = await Cuisine.listCuisinesByRestaurant({ restaurantID: req.params.id });
        const reviews = await Review.listReviewsByRestaurant({ restaurantID: req.params.id });
        const items = await Item.listItemsByRestaurant({ restaurantID: req.params.id });
    
        let user = null;
        if (req.session.userId) {
            user = await User.findByPk(req.session.userId);
        }
    
        const isLoggedIn = !!req.session.userId;
    
        res.render('restaurantHome', { restaurant, cuisines, reviews, items, user, isLoggedIn });
    },
       
 
    getRestaurantMenu: async (req, res) => {
        const restaurant = await Restaurant.findRestaurant(req.params.id);
        const cuisines = await Cuisine.listCuisinesByRestaurant({ restaurantID: req.params.id });
        const items = await Item.listItemsByRestaurant({ restaurantID: req.params.id });
        const user = await User.findUser(req.session.userId);
    
        const isLoggedIn = !!req.session.userId;
    
        res.render('restaurantMenu', { restaurant, cuisines, items, user, isLoggedIn });
    },    

    // GET METHOD for reviews page
    getRestaurantReviews: async (req, res) => {
        const restaurant = await Restaurant.findRestaurant(req.params.id);
        const cuisines = await Cuisine.listCuisinesByRestaurant({ restaurantID: req.params.id})     // to display cuisine types
        const reviews = await Review.listReviewsByRestaurant({ restaurantID: req.params.id });      // to display review data for home page
        const users = await User.findAll()
        const user = await User.findUser(req.params.id);
        res.render('restaurantReviews', { restaurant, cuisines, reviews, user, users });
    }
}