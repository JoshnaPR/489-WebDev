var express = require('express');
var router = express.Router();
var controller = require('../controllers/admin');

router.use("/static/", express.static("static"))

//restaurant order management page

router.get("/", controller.getAdminLanding);

router.get("/orders", async function (req, res) {
    const stats = {
        totalOrders: 0,
        processing: 0,
        delivering: 0,
        completed: 0
    };
    res.render('adminOrders', { stats: stats, orders: [] });
})
//Restaurant management routes
router.get("/restaurants/add", async function (req, res) {
    res.render("adminRestaurant");
});
router.post("/restaurants/add", controller.addRestaurant);

router.get("/restaurants", controller.restaurantOverview);

//Menu Items Routes
router.get("/menu-items", controller.menuOverview)
router.get("/menu-items/add", async function (req, res) {
    res.render('adminMenu');
})
router.post("/menu-items/add", controller.addMenuItem);

router.get("/settings", async function (req, res) {
    res.render("adminSetting");
});

router.post("/settings", controller.addHomeSettings);

router.get("/manage", async function (req, res) {
    const stats = {
        totalOrders: 0,
        processing: 0,
        delivering: 0,
        completed: 0
    };
    res.render('adminOrders', { stats: stats, orders: [] });
})

module.exports = router;