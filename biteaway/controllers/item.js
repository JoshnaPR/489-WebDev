var express = require('express');
var router = express.Router();

const Item = require("../models/Item");

module.exports = {
    // GET METHOD to find item
    getItem: async (req, res) => {
        const order = await Item.findItem(req.params.restaurantID, req.params.itemID);
        
        // TODO: determine item page
        // res.render('temp', { order })
    }
}