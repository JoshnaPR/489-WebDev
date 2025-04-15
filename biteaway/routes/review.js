var express = require('express');
var router = express.Router();
var controller = require('../controllers/review');

router.use("/static/", express.static("static"))

router.post("/add-review", (req, res) => {
    console.log("Inside of router.post for add-review")

    // id from currently logged in user
    const userID = req.session.userId;

    // https://expressjs.com/en/guide/error-handling.html
    if (!userID) {
        return res.status(401).send('Must login to leave a review!')
    }
    
    // getting information
    const { ratingRange, reviewText, restaurantID } = req.body
    controller.leaveReview(ratingRange, reviewText, userID, restaurantID, res);
})

module.exports = router;