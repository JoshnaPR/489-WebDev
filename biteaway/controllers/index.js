const User = require("../models/User");
const Restaurant = require("../models/Restaurant");

module.exports = {
  getIndexHome: async (req, res) => {
    try {
      const restaurants = await Restaurant.findAll(); // fetch all restaurants
      res.render('indexHome', {
        restaurants,
        user: req.session.userId // optional: if you're using session
      });
    } catch (error) {
      console.error("Error loading indexHome:", error);
      res.status(500).send("Failed to load homepage.");
    }
  },

  getLogin: async (req, res) => {
    res.render('login'); // or whatever your login EJS is
  },

  getSignup: async (req, res) => {
    res.render('register'); // or your signup EJS
  }
};
