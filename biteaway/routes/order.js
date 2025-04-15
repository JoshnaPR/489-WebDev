var express = require('express');
var router = express.Router();
var controller = require('../controllers/order');

router.use("/static/", express.static("static"))
//router.use(express.urlencoded({ extended: true }));

//view cart, place order & confirm

router.get("/", async function (req, res) {
    res.redirect('/order/cart')
})

// for post method
router.post("/cart", controller.getCart);
router.get("/cart", controller.getCart);

router.get("/checkout", controller.getCheckout);

router.get("/confirm", controller.confirmOrder);
router.post("/confirm", controller.confirmOrder);

//add an item to the cart
router.post("/add2cart", (req, res) => {
    //get the ID from the button,
    const { itemID, restaurantID } = req.body;
    //console.log(itemID);

    controller.addToCart(itemID, restaurantID, res);
})

router.get("/tracking", controller.getOrderTracking);

module.exports = router;