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
        console.log("Request body:", req.body);

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
    }
};
