var express = require('express');
var router = express.Router();
var controller = require('../controllers/index');

router.use("/static/", express.static("static"))

// controller for going to homepage
router.get("/", controller.getIndexHome);

// TODO: temp for now: sort restaurants on home by rating; add a form in ejs file
// router.post("/", controller.getIndexHome);

// controller for going to login page
router.get("/login", controller.getLogin);

// controller for going to signup page
router.get("/signup", controller.getSignup);

module.exports = router;