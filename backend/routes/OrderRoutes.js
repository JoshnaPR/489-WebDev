const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const authenticate = require("../middlewares/authMiddleware");

router.post("/", authenticate, OrderController.placeOrder);
router.get("/user/:userId", authenticate, OrderController.getOrdersByUser);
router.get("/", authenticate, OrderController.getAllOrders);
router.put("/:id", authenticate, OrderController.updateOrderStatus);

module.exports = router;
