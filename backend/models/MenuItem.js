const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Restaurant = require('./Restaurant'); 

const MenuItem = sequelize.define("MenuItem", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING, // e.g., "Drinks", "Burgers", "Pizzas"
        allowNull: false
    },
    restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Restaurant,
            key: "id"
        },
        onDelete: "CASCADE"
    }
}, {
    timestamps: true
});

// Define the relationship: A Restaurant has many MenuItems
Restaurant.hasMany(MenuItem, { foreignKey: "restaurantId", onDelete: "CASCADE" });
MenuItem.belongsTo(Restaurant, { foreignKey: "restaurantId" });

module.exports = MenuItem;
