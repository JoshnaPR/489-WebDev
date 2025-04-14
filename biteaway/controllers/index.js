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
                    heroButtonText: 'Explore',
                    featureTitle1: 'Feature 1',
                    featureDescription1: 'Description 1',
                    featureTitle2: 'Feature 2',
                    featureDescription2: 'Description 2',
                    featureTitle3: 'Feature 3',
                    featureDescription3: 'Description 3'
                });
            }

            // Extract feature titles and descriptions from the homeSettings
            const { featureTitle1, featureDescription1, featureTitle2, featureDescription2, featureTitle3, featureDescription3 } = homeSettings;

            // Pass the homeSettings object and feature data to the view for rendering
            res.render('indexHome', {
                homeSettings,
                featureTitle1,
                featureDescription1,
                featureTitle2,
                featureDescription2,
                featureTitle3,
                featureDescription3
            });

        } catch (error) {
            console.error("Error loading home settings:", error);
            res.status(500).send("Internal Server Error");
        }
    },
    getLogin: async (req, res) => {
        // Your login logic here
    },

    getSignup: async (req, res) => {
        // Your signup logic here
    }
}
