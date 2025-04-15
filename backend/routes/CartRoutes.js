const express = require("express");
const router = express.Router();
const CartController = require("../controllers/CartController");
const authenticate = require("../middlewares/authMiddleware");

router.post("/", authenticate, CartController.addToCart);
router.get("/:userId", authenticate, CartController.getCartItems);
router.put("/:id", authenticate, CartController.updateCartItem);
router.delete("/:id", authenticate, CartController.removeFromCart);
router.delete("/clear/:userId", authenticate, CartController.clearCart);

module.exports = router;
