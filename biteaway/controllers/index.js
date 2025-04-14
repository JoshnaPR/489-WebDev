var express = require('express');
var router = express.Router();
const HomeSettings = require("../models/HomeSettings");
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");

module.exports = {
    getIndexHome: async (req, res) => {
        try {
            // Fetch the latest home settings from the database
            let homeSettings = await HomeSettings.findOne();

            // If no settings exist, you can create default settings (this is optional)
            if (!homeSettings) {
                homeSettings = await HomeSettings.create({
                    heroTitle: 'Welcome to Our Platform',
                    heroDescription: 'Delivering excellence every day.',
                    heroButtonText: 'Explore'
                });
            }

            // Pass the homeSettings object to the view for rendering
            res.render('indexHome', {
                homeSettings
            });

        } catch (error) {
            console.error("Error loading home settings:", error);
            res.status(500).send("Internal Server Error");
        }
    },
    getLogin: async (req, res) => {

    },

    getSignup: async (req, res) => {
    }
}