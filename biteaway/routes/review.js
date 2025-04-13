var express = require('express');
var router = express.Router();
var controller = require('../controllers/review');

router.use("/static/", express.static("static"))

router.post("/add-review", (req, res) => {
    console.log("Inside of router.post for add-review")
    
    // getting information
    const { ratingRange, reviewText, userID, restaurantID } = req.body
    controller.leaveReview(ratingRange, reviewText, userID, restaurantID, res);
})

module.exports = router;