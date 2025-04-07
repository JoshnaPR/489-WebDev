var express = require('express');
var router = express.Router();
var controller = require('../controllers/restaurant');

router.use("/static/", express.static("static"))

//const Restaurant = require('../models/Restaurant');

router.get("/:id", controller.getRestaurant);

//probably find my by PK (which is recieved when user selects option from homepage)
//console.log(restaurant)
//res.render('restaurantHome')

router.get("/menu", async function (req, res) {
    res.render('restaurantMenu')
    //res.redirect("restaurantMenu")
})

router.get("/reviews", async function (req, res) {
    res.render("restaurantReviews")
})

module.exports = router;