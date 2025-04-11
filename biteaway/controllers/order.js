var express = require('express');
var router = express.Router();

const Order = require("../models/Order");
const Item = require("../models/Item");
const Cart = require("../models/Cart");

module.exports = {
    // GET METHOD to find order
    getOrder: async (req, res) => {
        const order = await Order.findOrder(req.params.userID, req.params.orderID);

        // TODO: determine order page
        // res.render('temp', { order })
    },

    addToCart: async (itemID, restarantID) => {

        //create an order
        const newOrder = await Order.create({
            userID: 101,
            restaurantID: restarantID,
            orderDate: new Date(),
            orderPrice: 0,
            userAddress: "123 Baker's Street, Pullman, WA",
            status: "Pending",
        });

        //cart ->
        //orderID - randomly generrated
        //itemID - from the button
        //userID - the user that is logged in rn

        const newCart = await Cart.create({
            userID: 101,
            itemID: itemID,
            orderID: newOrder.orderID
        });



    }

}