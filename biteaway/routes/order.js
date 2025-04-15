// routes/order.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/order');
const { isLoggedIn } = require('../controllers/auth');
const { isAuthenticated, isAdmin } = require('../controllers/auth')

// Serve static assets
router.use('/static', express.static('static'));

//view cart, place order & confirm

router.get("/", async function (req, res) {
    res.redirect('/order/cart')
})

// viewing cart
router.get("/cart", (req, res) => {

    // id from currently logged in user
    const userID = req.session.userId;

    // https://expressjs.com/en/guide/error-handling.html
    if (!userID) {
        return res.status(401).send('Must login to view items to cart!')
    }

    controller.getCart(userID, res)
});


// viewing cart
router.post("/cart", (req, res) => {

    // id from currently logged in user
    const userID = req.session.userId;

    // https://expressjs.com/en/guide/error-handling.html
    if (!userID) {
        return res.status(401).send('Must login to view items to cart!')
    }
    
    controller.getCart(userID, res)
});

// checkout
router.get("/checkout", (req, res) => {
    
    // id from currently logged in user
    const userID = req.session.userId;

    // https://expressjs.com/en/guide/error-handling.html
    if (!userID) {
        return res.status(401).send('Must login to continue with checkout!')
    }

    controller.getCheckout(userID, res)
});

// confirm order
router.get("/confirm", (req, res) => {

    // id from currently logged in user
    const userID = req.session.userId;

    // https://expressjs.com/en/guide/error-handling.html
    if (!userID) {
        return res.status(401).send('Must login to continue with confirmation!')
    }

    controller.confirmOrder(userID, res);
});

// confirm order
router.post("/confirm", (req, res) => {

    // id from currently logged in user
    const userID = req.session.userId;

    // https://expressjs.com/en/guide/error-handling.html
    if (!userID) {
        return res.status(401).send('Must login to continue with confirmation!')
    }

    controller.confirmOrder(userID, res);
});

// Add an item to the cart
router.post('/add2cart', (req, res) => {
    const { itemID, restaurantID } = req.body;
    //console.log(itemID);

    // id from currently logged in user
    const userID = req.session.userId;

    // https://expressjs.com/en/guide/error-handling.html
    if (!userID) {
        return res.status(401).send('Must login to add items to cart!')
    }

    controller.addToCart(itemID, restaurantID, userID, res);
})

router.get("/tracking", (req, res) => {
    
    // id from currently logged in user
    const userID = req.session.userId;

    // https://expressjs.com/en/guide/error-handling.html
    if (!userID) {
        return res.status(401).send('Must login to add view tracking!')
    }

    controller.getOrderTracking(userID, res);
});

module.exports = router;
