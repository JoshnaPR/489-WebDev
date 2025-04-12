var express = require('express');
var router = express.Router();
var controller = require('../controllers/restaurant');
var reviewController = require('../controllers/review');

router.use("/static/", express.static("static"))

// home page
router.get("/:id", controller.getRestaurantHome);

// menu page
router.get("/:id/menu", controller.getRestaurantMenu);

// reviews page
router.get("/:id/reviews", controller.getRestaurantReviews);

// reviews - creating/posting
router.post("/:id/reviews", (req, res) => {
    console.log("Inside of router.post for reviews")
    // console.log(req.body)
    
    // getting information
    const { ratingRange, reviewText, userID, restaurantID } = req.body

    reviewController.leaveReview(ratingRange, reviewText, userID, restaurantID, res);
})

module.exports = router;