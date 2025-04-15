var express = require('express');
var router = express.Router();

const Order = require("../models/Order");
const Item = require("../models/Item");
const User = require("../models/User");
const Cart = require("../models/Cart");

module.exports = {

    addToCart: async (itemID, restaurantID, res) => {

        // debugging 
        console.log("itemID: ", itemID)
        console.log("restaurantID: ", restaurantID)
        console.log("-----")

        const logged_in_user = 101
        let newOrder = ""

        // create an order
        // TODO: update with actual user data
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
            const itemtemp = await Item.findByPk(itemID);
            newOrder.orderPrice += itemtemp.itemPrice;
            await newOrder.save();
            console.log(newOrder.orderPrice)
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

                const itemtemp = await Item.findByPk(itemID);
                activeOrder.orderPrice += itemtemp.itemPrice;
                console.log(activeOrder.orderPrice)
                await activeOrder.save();

            }
        }

        //cart ->
        //orderID - randomly generated
        //itemID - from the button
        //userID - the user that is logged in rn

        // redirect user back to restaurant
        // can edit the url accordingly/similar to cms examples if you want (and try/catch for error, check review.js)
        res.redirect(`/restaurant/${restaurantID}/menu?msg=success`)
    },

    getCart: async (restaurantID, res) => {
        console.log("Inside of getCart function")
        console.log("-----")

        const currentStep = 1;
        const logged_in_user = 101;

        // what orderCart ejs does ->
        // 1. iterate through the cart and display through the item (from Cart)
        // 2. show total price of cart (from Order)

        // cartItems will return a list of cart instances belonging to userID
        // access specific items by cartItems.item.itemID / itemName / etc, since cart is the relationship between order/item
        // similarly, can access specific order items by cartItems.order.orderID / status / etc.
        const cartItems = await Cart.listCartByUser(logged_in_user);

        // console.log("cart instances: ", cartItems);

        // cart will return the current active order (associated with the above items)
        let cart = await Order.findActiveOrder({userID : logged_in_user});

        if (!cart) {
            cart = {
                items: [],
                orderPrice: 0
            };
        }
        //console.log("order instance under userID, that is pending", cart);
        // console.log("-----")

        if (!cart) {
            cart = {
                items: [],
                orderPrice: 0
            };
        }

        //leave empty - will not be used
        const promoCode = '';
        const promoMessage = '';

        //console.log(cartItems)

        res.render('orderCart', { currentStep, cartItems, promoCode, promoMessage, cart })
    },

    getCheckout: async (req, res) => {
        const currentStep = 2;
        const logged_in_user = 101;

        const promocode = '';
        const promoMessage = '';

        const cartItems = await Cart.listCartByUser(logged_in_user);
        let cart = await Order.findActiveOrder({userID : logged_in_user});
        const user = await User.findUser(logged_in_user)

        if (!cart) {
            cart = {
                items: [],
                orderPrice: 0
            };
        }
        
        res.render('placeOrder', { currentStep, cartItems, promocode, promoMessage, cart, user })
    },

    confirmOrder: async (req, res) => {
        console.log("inside of controller's confirmOrder")
        console.log("-----")

        // TODO: update to display dynamic user
        const currentStep = 3;
        const logged_in_user = 101;

        // cartItems will return a list of cart instances belonging to userID
        const cartItems = await Cart.listCartByUser(logged_in_user);

        // leave empty - will not be used
        const promoCode = '';
        const promoMessage = '';

        // cart will return the current active order (associated with the above items)
        let cart = await Order.findActiveOrder({userID : logged_in_user});

        if (!cart) {
            cart = {
                items: [],
                orderPrice: 0
            };
        }
        
        // update cart after processing order
        //cart.status = 'In the Kitchen!'

        // finding user
        const user = await User.findUser(logged_in_user)
        
        res.render('orderConfirmation', { currentStep, cartItems, promoCode, promoMessage, cart, user })
    }

}