var express = require('express');
var router = express.Router();
var controller = require('../controllers/user');

router.use("/static/", express.static("static"))

//home, favorites, order history,recently-viewed, settings

router.get("/:id", controller.getUserHome);

router.get("/favorites", async function (req, res) {
    res.render('userFavorites')
})

router.get("/order-history", async function (req, res) {
    res.render('userOrderHistory')
})

router.get("/recently-viewed", async function (req, res) {
    res.render('userRecentlyViewed')
})

router.get("/settings", async function (req, res) {
    res.render('userSettings')
})

module.exports = router;