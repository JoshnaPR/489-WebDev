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

    addToCart: async (itemID, restaurantID, res) => {

        // debugging 
        console.log("itemID: ", itemID)
        console.log("restaurantID: ", restaurantID)

        //create an order
        // TODO: update with actual user data, orderPrice
        const newOrder = await Order.create({
            userID: 101,
            restaurantID: restaurantID,
            orderDate: new Date(),
            orderPrice: 0,  
            userAddress: "123 Baker's Street, Pullman, WA",
            status: "Pending",
        });

        // debugging
        console.log("Order has been created.")
        console.log("OrderID: ", newOrder.orderID)
        console.log("UserID: ", newOrder.userID)
        console.log("RestaurantID: ", newOrder.restaurantID)
        console.log("OrderDate: ", newOrder.orderDate)
        console.log("OrderPrice: ", newOrder.orderPrice)
        console.log("UserAddress: ", newOrder.userAddress)
        console.log("Status: ", newOrder.status)

        //cart ->
        //orderID - randomly generrated
        //itemID - from the button
        //userID - the user that is logged in rn

        // TODO: update cart, maybe have a cart instance already existing per user account
        // remove items once order is done?
        const newCart = await Cart.create({
            userID: 101,
            itemID: itemID,
            orderID: newOrder.orderID
        });

        // debugging
        console.log("UserID: ", newCart.userID)
        console.log("ItemID: ", newCart.itemID)
        console.log("orderID: ", newCart.orderID)

        // redirect user back to restaurant
        res.redirect(`/restaurant/${restaurantID}/menu`)
    }

}