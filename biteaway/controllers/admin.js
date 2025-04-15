const { Op } = require('sequelize');
var express = require('express');
var router = express.Router();


const User = require("../models/User");
const Order = require("../models/Order");
const Item = require("../models/Item");
const Restaurant = require("../models/Restaurant");
const HomeSettings = require('../models/HomeSettings');

module.exports = {
    // GET METHOD for admin landing/dashboard page
    getAdminLanding: async (req, res) => {
        try {
            const totalUsers = await User.count();
            const totalRestaurants = await Restaurant.count();
            const totalOrders = await Order.count();
            const totalProducts = await Item.count();

            const completedOrders = await Order.count({ where: { status: 'completed' } });
            const pendingOrders = await Order.count({ where: { status: 'pending' } });
            const cancelledOrders = await Order.count({ where: { status: 'cancelled' } });

            const revenueResult = await Order.findAll({
                attributes: [[
                    Order.sequelize.fn('SUM', Order.sequelize.col('orderPrice')), 'total'
                ]],
                raw: true
            });
            const totalRevenue = revenueResult[0]?.total || 0;

            res.render('adminLanding', {
                totalUsers,
                totalRestaurants,
                totalOrders,
                totalProducts,
                totalRevenue,
                completedOrders,
                pendingOrders,
                cancelledOrders
            });
        } catch (error) {
            console.error("Error loading admin dashboard:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    // POST METHOD to add home settings
    addHomeSettings: async (req, res) => {
        try {
            const {
                heroTitle,
                heroDescription,
                heroButtonText,
                featureTitle1, featureDescription1,
                featureTitle2, featureDescription2,
                featureTitle3, featureDescription3
            } = req.body;

            // Check if the HomeSettings entry exists
            let homeSettings = await HomeSettings.findOne();
            if (homeSettings) {
                // If the settings exist, update them
                homeSettings.heroTitle = heroTitle;
                homeSettings.heroDescription = heroDescription;
                homeSettings.heroButtonText = heroButtonText;

                // Update the feature fields with values provided in the request
                homeSettings.featureTitle1 = featureTitle1;
                homeSettings.featureDescription1 = featureDescription1;
                homeSettings.featureTitle2 = featureTitle2;
                homeSettings.featureDescription2 = featureDescription2;
                homeSettings.featureTitle3 = featureTitle3;
                homeSettings.featureDescription3 = featureDescription3;

                await homeSettings.save();  // Save the updated settings
            } else {
                // If no settings exist, create a new one
                homeSettings = await HomeSettings.create({
                    heroTitle,
                    heroDescription,
                    heroButtonText,
                    featureTitle1,
                    featureDescription1,
                    featureTitle2,
                    featureDescription2,
                    featureTitle3,
                    featureDescription3
                });
            }

            // After saving or updating the settings, render the page with the updated settings
            res.render('adminSetting', {
                message: "Home settings updated successfully.",
                homeSettings
            });
        } catch (error) {
            console.error("Error adding home settings:", error);
            res.status(500).send("Internal Server Error");
        }
    },
    restaurantOverview: async (req, res) => {
        try {
            const restaurants = await Restaurant.findAll();
            const totalRestaurants = await Restaurant.count();
            const topRatings = await Restaurant.count({
                where: {
                    restaurantRating: { [Op.gt]: 4 }
                }
            });

            res.render('adminRestuarantOverview', {
                restaurants,
                totalRestaurants,
                topRatings
            });
        } catch (error) {
            console.error("Error loading restaurant overview:", error);
            res.status(500).send("Internal Server Error");
        }
    },
    addRestaurant: async (req, res) => {
        try {
            const {
                restaurantName,
                phoneNumber,
                restaurantAddress,
                openingTime,
                closingTime,
                restaurantRating = 0,  // If rating is not provided, default to 0
            } = req.body;

            // Check if the restaurant entry already exists by name or other unique identifier
            let restaurant = await Restaurant.findOne({ where: { restaurantName: restaurantName } });
            if (restaurant) {
                // If the restaurant exists, update the record
                restaurant.restaurantName = restaurantName;
                restaurant.phoneNumber = phoneNumber;
                restaurant.restaurantAddress = restaurantAddress;
                restaurant.openingTime = openingTime;
                restaurant.closingTime = closingTime;
                restaurant.restaurantRating = restaurantRating;  // Update the rating

                await restaurant.save();  // Save the updated restaurant
            } else {
                // If no restaurant exists, create a new entry with auto-generated restaurantID
                restaurant = await Restaurant.create({
                    restaurantName: restaurantName,
                    phoneNumber: phoneNumber,
                    restaurantAddress: restaurantAddress,
                    openingTime: openingTime,
                    closingTime: closingTime,
                    restaurantRating: restaurantRating,  // Added rating for the new restaurant
                });
            }
            // After saving or updating, render the page with the updated restaurant information
            res.render('adminRestaurant', {
                message: "Restaurant information updated successfully.",
                restaurant
            });
        } catch (error) {
            console.error("Error adding restaurant:", error);
            res.status(500).send("Internal Server Error");
        }
    },
    menuOverview: async (req, res) => {
        try {
            const items = await Item.findAll({
                include: [{
                    model: Restaurant,
                    as: 'restaurant', // match the alias used in the Item.belongsTo association
                    attributes: ['restaurantName'] // fetch only the name
                }]
            });
            res.render('adminMenuOverview', {
                items
            });
        } catch (error) {
            console.error("Error loading restaurant overview:", error);
            res.status(500).send("Internal Server Error");
        }
    },
    addMenuItem: async (req, res) => {
        try {
            const {
                restaurantID,
                itemName,
                itemPrice,
                itemDescription
            } = req.body;

            // Find the restaurant using restaurantID
            const restaurant = await Restaurant.findOne({
                where: { restaurantID }
            });
            if (!restaurant) {
                return res.status(404).send("Restaurant not found");
            }

            // Create the item (auto itemID generation is expected in DB schema)
            const item = await Item.create({
                restaurantID,
                itemName,
                itemPrice,
                itemDescription
            });

            // After adding, you can redirect or re-render
            res.render('adminMenu', {
                message: "Menu item added successfully.",
                item
            });

        } catch (error) {
            console.error("Error adding menu item:", error);
            res.status(500).send("Internal Server Error");
        }
    }

};
