var express = require('express');
var router = express.Router();
var controller = require('../controllers/restaurant');

router.use("/static/", express.static("static"))

// home page
router.get("/:id", controller.getRestaurantHome);

// menu page
router.get("/:id/menu", controller.getRestaurantMenu);

// reviews page
router.get("/:id/reviews", controller.getRestaurantReviews);

module.exports = router;