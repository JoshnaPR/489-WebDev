var express = require('express');
var router = express.Router();

const User = require("../models/User");
const Restaurant = require("../models/Restaurant");

module.exports = {

    getIndexHome: async (req, res) => {
        res.render('indexHome')
    },

    getLogin: async (req, res) => {
    },

    getSignup: async (req, res) => {
    }

}