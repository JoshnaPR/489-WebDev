var express = require('express');
var router = express.Router();

const Review = require("../models/Review");

module.exports = {
    // GET METHOD to find review
    getReview: async (req, res) => {
        const review = await Review.findReview(req.params.restaurantID, req.params.reviewID);
        // res.render('temp', { review })
    }
}