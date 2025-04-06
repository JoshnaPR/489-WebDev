var express = require('express');
var router = express.Router();

router.use("/static/", express.static("static"))

//view cart, place order & confirm