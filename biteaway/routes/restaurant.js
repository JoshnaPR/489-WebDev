var express = require('express');
var router = express.Router();
var controller = require('../controllers/restaurant');

router.use("/static/", express.static("static"))

// home page
router.get("/:id", controller.getRestaurantHome);

// menu page
router.get("/:id/menu", controller.getRestaurantMenu);

// reviews page
router.get("/:id/reviews", controller.getRestaurantReviews)

// sort reviews according to rating
router.post("/:id/reviews", (req, res) => {
    // store var
    const { restaurantID, sort } = req.body

    controller.sortRestaurantReviews(restaurantID, sort, res);
})

module.exports = router;