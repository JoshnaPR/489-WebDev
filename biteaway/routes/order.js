var express = require('express');
var router = express.Router();
var controller = require('../controllers/order');

router.use("/static/", express.static("static"))
//router.use(express.urlencoded({ extended: true }));

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

    // TODO; each user session has a cart automatically?

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

//router.get("/add2cart", controller.addToCart);

//add an item to the cart
router.post("/add2cart", (req, res) => {
    //get the ID from the button,
    const { itemID, restaurantID } = req.body;
    //console.log(itemID);

    controller.addToCart(itemID, restaurantID, res);
})

module.exports = router;