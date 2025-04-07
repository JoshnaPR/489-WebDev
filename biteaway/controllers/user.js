var express = require('express');
var router = express.Router();

const User = require("../models/User");

//find user

module.exports = {
    getUserHome: async (req, res) => {

        const user = await User.findUser(req.params.id);      

        res.render('userHome', { user })
    }
}