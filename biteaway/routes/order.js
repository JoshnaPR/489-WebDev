// routes/order.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/order');
const { isLoggedIn } = require('../controllers/auth');
const { isAuthenticated, isAdmin } = require('../controllers/auth')

// Serve static assets
router.use('/static', express.static('static'));

// Redirect root order path to cart
router.get('/', (req, res) => {
    res.redirect('/order/cart');
});

// View cart (GET + POST supported)
router.get('/cart', controller.getCart);
router.post('/cart', controller.getCart);

// Checkout and confirm pages
router.get('/checkout', controller.getCheckout);
router.get('/confirm', controller.confirmOrder);
router.post('/confirm', controller.confirmOrder);

// Add an item to the cart
router.post('/add2cart', (req, res) => {
    const { itemID, restaurantID } = req.body;
    controller.addToCart(itemID, restaurantID, res);
});

// Protected route for placing order
router.post('/order', isLoggedIn, async (req, res) => {
    // You can implement logic here if needed
    res.send('Order placed!');
});

module.exports = router;
