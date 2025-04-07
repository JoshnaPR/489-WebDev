var express = require('express');
var router = express.Router();

const Restaurant = require("../models/Restaurant");

module.exports = {
    getRestaurant: async (req, res) => {

        const restaurant = await Restaurant.findRestaurant(req.params.id);
        
        res.render('restaurantHome', { restaurant })
    }
}