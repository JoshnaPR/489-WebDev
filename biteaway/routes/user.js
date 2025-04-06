var express = require('express');
var router = express.Router();

router.use("/static/", express.static("static"))

//home, favorites, order history,recently-viewed, settings