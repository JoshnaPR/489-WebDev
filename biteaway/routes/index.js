var express = require('express');
var router = express.Router();
var controller = require('../controllers/index');

router.use("/static/", express.static("static"))

//landing page with restaurant browsing options
//users should be able to view home page without logging in

//if not logged in -> login page with option to sign up

//admin and user can only be accessed by logged in accounts

// controller for going to homepage
router.get("/", controller.getIndexHome);

// controller for going to login page
router.get("/login", controller.getLogin);

// controller for going to signup page
router.get("/signup", controller.getSignup);

module.exports = router;