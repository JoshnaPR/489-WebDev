var express = require('express');
var router = express.Router();

router.use("/static/", express.static("static"))

//landing page with restaurant browsing options
//users should be able to view home page without logging in

//if not logged in -> login page with option to sign up

//admin and user can only be accessed by logged in accounts