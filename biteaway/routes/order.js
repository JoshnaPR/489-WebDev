var express = require('express');
var router = express.Router();

router.use("/static/", express.static("static"))

//view cart, place order & confirm

router.get("/", async function (req, res) {
    res.redirect('/order/cart')
})

router.get("/cart", async function (req, res) {
    res.render('orderCart')
})

router.get("/checkout", async function (req, res) {
    res.render('placeOrder')
})

router.get("/confirm", async function (req, res) {
    res.render('orderConfirmation')
})

module.exports = router;