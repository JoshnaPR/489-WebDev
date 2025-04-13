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
        const user = await Cart.findByUser(logged_in_user);
        //look through cart table to see if the user already has items in the cart
        if (!user) {
            //the current user does not have an existing active order or any items in the cart
            //create a new order
            newOrder = await Order.create({
                userID: logged_in_user,
                restaurantID: restaurantID,
                orderDate: new Date(),
                orderPrice: 0,
                userAddress: "123 Baker's Street, Pullman, WA",
                status: "Pending",
            });
            //this will give us an order ID for this order

            //add the item that the user clicked on to the cart
            const newCart = await Cart.create({
                userID: logged_in_user,
                itemID: itemID,
                orderID: newOrder.orderID
            });

            //update the order details by adding the item price to the total price
            newOrder.orderPrice += Item.findByPk(itemID).itemPrice;
        }
        else {
            //there is a active order, add the item to that active order
            const activeOrder = await Order.findActiveOrder(user);
            //check order table for orders belonging to the current user which are active/pending
            //this will give us the orderID
            if (activeOrder) {
                //add the item to the cart with the same orderID & also update the price
                const newCart = await Cart.create({
                    userID: logged_in_user,
                    itemID: itemID,
                    orderID: activeOrder.orderID
                });

                activeOrder.orderPrice += Item.findByPk(itemID).itemPrice;

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
        //orderID - randomly generated
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
    },

    getCart: async (restaurantID, res) => {

        const currentStep = 1;
        const logged_in_user = 101;


        // what orderCart ejs does ->
        // 1. iterate through the cart and display through the item (from Cart)
        // 2. show total price of cart (from Order)
        const cartItems = Cart.listCartByUser(logged_in_user);
        //here i am trying to get an array/list of all the items in the cart belonging to the current user
        const cart = Order.findActiveOrder(logged_in_user);
        //here i want to find the current active order (associated with the above items)

        //leave empty - will not be used
        const promoCode = '';
        const promoMessage = '';

        //console.log(cartItems)

        res.render('orderCart', { currentStep, cartItems, promoCode, promoMessage, cart })
    }

}