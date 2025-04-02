const express = require("express");
const router = express.Router();
const MenuItemController = require("../controllers/MenuItemController");
const authenticate = require("../middlewares/authMiddleware");

router.post("/", authenticate, MenuItemController.createMenuItem);
router.get("/:restaurantId", MenuItemController.getMenuItemsByRestaurant);
router.put("/:id", authenticate, MenuItemController.updateMenuItem);
router.delete("/:id", authenticate, MenuItemController.deleteMenuItem);

module.exports = router;
