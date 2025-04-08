var express = require('express');
var router = express.Router();

const User = require("../models/User");

module.exports = {
    // GET METHOD for user home page
    getUserHome: async (req, res) => {
        const user = await User.findUser(req.params.id);      
        res.render('userHome', { user })
    }, 

    // GET METHOD for user settings page
    getUserSettings: async (req, res) => {
        const user = await User.findUser(req.params.id);      
        res.render('userSettings', { user })
    },

    // GET METHOD for user recently viewed page
    getUserRecentlyViewed: async (req, res) => {
        const user = await User.findUser(req.params.id);      
        res.render('userRecentlyViewed', { user })
    },

    // GET METHOD for user favorites page
    getUserFavorites: async (req, res) => {
        const user = await User.findUser(req.params.id);      
        res.render('userFavorites', { user })
    }, 

    // GET METHOD for user order history page
    getUserOrderHistory: async (req, res) => {
        const user = await User.findUser(req.params.id);      
        res.render('userOrderHistory', { user })
    }, 
}