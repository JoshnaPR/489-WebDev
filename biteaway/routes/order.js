var express = require('express');
var router = express.Router();
var controller = require('../controllers/order');

router.use("/static/", express.static("static"))

//view cart, place order & confirm

router.get("/", async function (req, res) {
    res.redirect('/order/cart')
})

router.get("/cart", async function (req, res) {
    const currentStep = 1;
    const cartItems = 1;
    const promoCode = '';
    const promoMessage = '';
    const cart = '';
    res.render('orderCart' , { currentStep, cartItems, promoCode, promoMessage, cart } )
})

router.get("/checkout", async function (req, res) {
    const currentStep = 2;
    const cartItems = 1;
    const promocode = '';
    const promoMessage = '';
    const cart = '';
    const user = '';
    const selectedPayment = '';

    res.render('placeOrder', { currentStep, cartItems, promocode, promoMessage, cart, user, selectedPayment })
})

router.get("/confirm", async function (req, res) {
    const currentStep = 3;
    const cartItems = 1;
    const promoCode = '';
    const promoMessage = '';
    const cart = '';
    const user = '';

    res.render('orderConfirmation', { currentStep, cartItems, promoCode, promoMessage, cart, user })
})

router.get("/add2cart", controller.addToCart);
    


module.exports = router;