var express = require('express');
var router = express.Router();

router.use("/static/", express.static("static"))

//restaurant order management page