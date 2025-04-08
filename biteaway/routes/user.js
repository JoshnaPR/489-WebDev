var express = require('express');
var router = express.Router();
var controller = require('../controllers/user');

router.use("/static/", express.static("static"))

//home, favorites, order history,recently-viewed, settings

// user home page
router.get("/:id", controller.getUserHome);

// user settings page
router.get("/:id/settings", controller.getUserSettings);

// user recently viewed page
router.get("/:id/recently-viewed", controller.getUserRecentlyViewed);

// user favorites page
router.get("/:id/favorites", controller.getUserFavorites);

// user order history page
router.get("/:id/order-history", controller.getUserOrderHistory);


module.exports = router;