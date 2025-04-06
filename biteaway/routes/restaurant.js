var express = require('express');
var router = express.Router();

router.use("/static/", express.static("static"))

const Restaurant = require('../models/Restaurant');

router.get("/", async function (req, res) {

    //probably find my by PK (which is recieved when user selects option from homepage)

    // const courses = await Course.findAll();
    // if(req.query.msg){
    //   res.locals.msg = req.query.msg
    //   res.locals.courseid = req.query.courseid
    // }
    // res.render('restaurantHome', { restaurant })
    res.render('restaurantHome')

})

router.get("/menu", async function (req, res) {
    res.render('restaurantMenu')
    //res.redirect("restaurantMenu")
})

router.get("/reviews", async function (req, res) {
    res.render("restaurantReviews")
})

module.exports = router;