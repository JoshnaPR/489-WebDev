const express = require("express");
const router = express.Router();
const RestaurantController = require("../controllers/RestaurantController");
const authenticate = require("../middlewares/authMiddleware");

router.post("/", authenticate, RestaurantController.createRestaurant);
router.get("/", RestaurantController.getRestaurants);
router.get("/:id", RestaurantController.getRestaurantById);
router.put("/:id", authenticate, RestaurantController.updateRestaurant);
router.delete("/:id", authenticate, RestaurantController.deleteRestaurant);

module.exports = router;
