const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

// https://stackoverflow.com/questions/79229550/sequelize-error-restaurant-belongsto-called-with-something-thats-not-a-subclas

const User = require("./User");
const Order = require("./Order");
const Restaurant = require("./Restaurant");
const Review = require("./Review");
const Item = require("./Item");
const Cuisine = require("./Cuisine");
const Cart = require("./Cart");

function setUpAssociations() {
    User.associate({ Cart })
    Cuisine.associate({ Restaurant })
    Item.associate({ Restaurant, Order, Cart })
    Order.associate({ User, Item, Restaurant, Cart })
    Restaurant.associate({ Cuisine, Review, Item, Order })
    Review.associate({ User, Restaurant })
    Cart.associate({ Order, Item, User })
}

module.exports = setUpAssociations;

