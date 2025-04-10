var express = require('express');
var router = express.Router();

router.use("/static/", express.static("static"))

//restaurant order management page

router.get("/", async function (req, res) {
    //res.redirect('/admin/manage')
    res.render('adminLanding');
})

router.get("/manage", async function (req, res) {
    const stats={
        totalOrders:0,
        processing: 0,
        delivering: 0,
        completed: 0
    };
    res.render('adminOrders', { stats: stats, orders: [] });
})

module.exports = router;