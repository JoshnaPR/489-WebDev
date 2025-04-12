var express = require('express');
var router = express.Router();

const User = require("../models/User");
const Review = require("../models/Review");
const Cuisine = require("../models/Cuisine");
const Order = require("../models/Order");
const Item = require("../models/Item");
const Cart = require("../models/Cart");

module.exports = {
    // GET METHOD for user home page
    getUserHome: async (req, res) => {
        const user = await User.findUser(req.params.id);
        const reviews = await Review.listReviewsByUser({ userID: req.params.id });         // to display review data for home page
        const reviewNum = await Review.countReviews({ userID: req.params.id });      // to display number of reviews
        const cuisines = await Cuisine.listCuisines();                               // to display cuisines; will filter by restaurantID for review lists
        res.render('userHome', { user, reviews, reviewNum, cuisines })
    }, 

    // GET METHOD for user settings page
    getUserSettings: async (req, res) => {
        const user = await User.findUser(req.params.id);    
        const reviewNum = await Review.countReviews({ userID: req.params.id });      // to display number of reviews
        res.render('userSettings', { user, reviewNum })
    },

    // GET METHOD for user recently viewed page
    getUserRecentlyViewed: async (req, res) => {
        const user = await User.findUser(req.params.id);      
        const reviewNum = await Review.countReviews({ userID: req.params.id });      // to display number of reviews
        res.render('userRecentlyViewed', { user, reviewNum })
    },

    // GET METHOD for user favorites page
    getUserFavorites: async (req, res) => {
        const user = await User.findUser(req.params.id);  
        const reviewNum = await Review.countReviews({ userID: req.params.id });      // to display number of reviews
        res.render('userFavorites', { user, reviewNum })
    }, 

    // GET METHOD for user order history page
    getUserOrderHistory: async (req, res) => {
        const user = await User.findUser(req.params.id); 
        const reviewNum = await Review.countReviews({ userID: req.params.id });      // to display number of reviews 
        const orders = await Order.listOrdersByUser({ userID: req.params.id });      // to display user's order history

        // assigining each order with their item num
        for (const order of orders) {
            const itemNum = await Order.countItemsByOrder({ orderID: order.orderID });
            order.itemNum = itemNum;

            // get list of items under order
            const orderItems = await Order.listItems({ orderID: order.orderID });
            order.items = orderItems
        }

        res.render('userOrderHistory', { user, reviewNum, orders })
    }, 
}