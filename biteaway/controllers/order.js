var express = require('express');
var router = express.Router();

const Order = require("../models/Order");

module.exports = {
    // GET METHOD to find order
    getOrder: async (req, res) => {
        const order = await Order.findOrder(req.params.userID, req.params.orderID);

        // TODO: determine order page
        // res.render('temp', { order })
    },

    addToCart: async (req, res) => {

    }

}