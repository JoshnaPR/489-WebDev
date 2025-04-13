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

// TODO: implement sorted view here?
router.post("/:id/reviews", (req, res) => {
    console.log("Inside of router.post for sorting reviews")

    console.log(req.body)


    // store var
    const { restaurantID, sort } = req.body

    console.log(restaurantID)
    console.log(sort)

    controller.sortRestaurantReviews(restaurantID, sort, res);

    // reviewController.leaveReview(ratingRange, reviewText, userID, restaurantID, res);
})

module.exports = router;