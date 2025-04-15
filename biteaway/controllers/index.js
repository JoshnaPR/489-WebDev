var express = require('express');
var router = express.Router();
const HomeSettings = require("../models/HomeSettings");
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");


module.exports = {

  getIndexHome: async (req, res) => {
    try {
      const restaurants = await Restaurant.findAll(); // fetch all restaurants
      let homeSettings = await HomeSettings.findOne();

      if (!homeSettings) {
        homeSettings = await HomeSettings.create({
          heroTitle: 'Crave it? Bite-A-Way it.',
          heroDescription: 'Your favorite food delivered fresh & fast, every time.',
          heroButtonText: 'Explore Menu',
          featureTitle1: 'Fast Delivery',
          featureDescription1: 'No more long waits. We bring food hot to your doorstep in minutes.',
          featureTitle2: 'Endless Choices',
          featureDescription2: 'From sushi to shawarma, discover hundreds of local favorites.',
          featureTitle3: 'Secure Checkout',
          featureDescription3: 'Pay safely and easily with our encrypted, one-click payments.'
        });
      }      

      // sort accordingly
      // store vars; might have to move restaurants var or change to let
      // const { sort } = req.body
      // if (sort === "asc") {
      //   restaurants = await Restaurant.sortRestaurantByRatingAsc();     
      // } else if (sort === "desc") {
      //   restaurants = await Restaurant.sortRestaurantByRatingDesc();     
      // }

      res.render('indexHome', {
        restaurants,
        user: req.session.userId, // optional: if you're using session
        homeSettings
      });

    } catch (error) {
      console.error("Error loading indexHome:", error);
      res.status(500).send("Failed to load homepage.");
    }
  },

  getLogin: async (req, res) => {
    res.render('login')
  },

  getLogout: async (req, res) => {
    res.redirect("/")
  },

  getSignup: async (req, res) => {
    res.render('register');
  }
};
