var express = require('express');
var router = express.Router();
var controller = require('../controllers/review');

router.use("/static/", express.static("static"))

router.post("/add-review", (req, res) => {
    console.log("Inside of router.post for add-review")

    // id from currently logged in user
    const userID = req.session.userId;
    
    // getting information
    const { ratingRange, reviewText, restaurantID } = req.body
    controller.leaveReview(ratingRange, reviewText, userID, restaurantID, res);
})

module.exports = router;