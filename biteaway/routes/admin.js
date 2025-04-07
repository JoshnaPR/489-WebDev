var express = require('express');
var router = express.Router();

router.use("/static/", express.static("static"))

//restaurant order management page

router.get("/", async function (req, res) {
    res.redirect('/admin/manage')
})

router.get("/manage", async function (req, res) {
    res.render('adminOrders')
})

module.exports = router;