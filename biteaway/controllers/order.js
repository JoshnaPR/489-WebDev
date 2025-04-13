var express = require('express');
var router = express.Router();

const Order = require("../models/Order");
const Item = require("../models/Item");
const User = require("../models/User");
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
        console.log("-----")

        const logged_in_user = 101
        let newOrder = ""

        // create an order
        // TODO: update with actual user data, orderPrice
        // TODO: check if there is an existing order already - (ex: if user is ordering multiple items)
        // probably can do this by checking by userID and status of userID's order; this way, we can add (+=) each item price to orderPrice
        const user = await Cart.findByUser(logged_in_user); // or just use logged_in_user if you already have it
        if (!user)
        {
            console.log("i am in if")
            //the current user does not have an order, create one
            newOrder = await Order.create({
                userID: logged_in_user,
                restaurantID: restaurantID,
                orderDate: new Date(),
                orderPrice: 0,  
                userAddress: "123 Baker's Street, Pullman, WA", // probably can update this to reference userID's address stored already
                status: "Pending",
            });

            const newCart = await Cart.create({
                userID: logged_in_user,
                itemID: itemID,
                orderID: newOrder.orderID
            });
        }
        else {
            console.log("i am in else")
            //there is a active order, add the item to that active order
            const activeOrder = await Order.findActiveOrder(user);
            if (activeOrder) {
                const newCart = await Cart.create({
                    userID: logged_in_user,
                    itemID: itemID,
                    orderID: activeOrder.orderID
                });

            }

        }

        // debugging
        // console.log("Order has been created.")
        // console.log("OrderID: ", newOrder.orderID)
        // console.log("UserID: ", newOrder.userID)
        // console.log("RestaurantID: ", newOrder.restaurantID)
        // console.log("OrderDate: ", newOrder.orderDate)
        // console.log("OrderPrice: ", newOrder.orderPrice)
        // console.log("UserAddress: ", newOrder.userAddress)
        // console.log("Status: ", newOrder.status)
        // console.log("-----")

        //cart ->
        //orderID - randomly generrated
        //itemID - from the button
        //userID - the user that is logged in rn

        // TODO: update cart, probably have a cart instance already existing per user account
        // remove items once order is done?
    

        // debugging
        // console.log("UserID: ", newCart.userID)
        // console.log("ItemID: ", newCart.itemID)
        // console.log("orderID: ", newCart.orderID)

        // redirect user back to restaurant
        // can edit the url accordingly/similar to cms examples if you want (and try/catch for error, check review.js)
        res.redirect(`/restaurant/${restaurantID}/menu?msg=success`)
    }

}