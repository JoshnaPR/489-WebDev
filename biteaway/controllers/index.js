var express = require('express');
var router = express.Router();
const HomeSettings = require("../models/HomeSettings");
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");

module.exports = {
    getIndexHome: async (req, res) => {
        try {
            let homeSettings = await HomeSettings.findOne();
            if (!homeSettings) {
                homeSettings = await HomeSettings.create({
                    heroTitle: 'Welcome to Our Platform',
                    heroDescription: 'Delivering excellence every day.',
                    heroButtonText: 'Explore'
                });
            }
            res.render('indexHome', {
                homeSettings
            })
        } catch (error) {
            console.error("Error loading admin dashboard:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    getLogin: async (req, res) => {

    },

    getSignup: async (req, res) => {
    }
}