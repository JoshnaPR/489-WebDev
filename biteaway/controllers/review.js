var express = require('express');
var router = express.Router();

const Restaurant = require("../models/Restaurant");
const Review = require("../models/Review");
const User = require("../models/User");

module.exports = {
    // handling reviews posted from the restaurant page
    leaveReview: async (ratingRange, reviewText, userID, restaurantID, res) => {
        console.log("Inside of leaveReview under review controller")
        // // debugging 
        // console.log("ratingRange: ", ratingRange)
        // console.log("reviewText: ", reviewText)
        // console.log("userID: ", userID)
        // console.log("restaurantID: ", restaurantID)
        // console.log("-----")

        try {
            // create new review 
            const newReview = await Review.create({
                restaurantID: restaurantID,
                userID: userID,
                reviewRating: ratingRange,
                reviewDescription: reviewText
            });
        
            // redirect user back to restaurant
            res.redirect(`/restaurant/${restaurantID}/reviews?msg=success&reviewid=${newReview.reviewID}`)

        } catch (error) {
            res.redirect(`/restaurant/${restaurantID}/reviews?msg=new URLSearchParams(error.toString()).toString()`)
        }
        
       
    }

}