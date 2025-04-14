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

// updating user information
router.post("/:id/settings", (req, res) => {
    console.log("Inside of router.post for updating user settings")
    console.log("----------")
    // console.log("req: ", req.body)

    const { userID, firstName, lastName, country, number, email, address, password } = req.body;
    controller.updateUserInformation( userID, firstName, lastName, country, number, email, address, password, res )
});
    
    
module.exports = router;