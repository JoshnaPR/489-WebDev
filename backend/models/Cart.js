const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');
const MenuItem = require('./MenuItem');

const Cart = sequelize.define("Cart", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id"
        },
        allowNull: false
    },
    menuItemId: {
        type: DataTypes.INTEGER,
        references: {
            model: MenuItem,
            key: "id"
        },
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
}, {
    timestamps: true
});

// Define relationships
User.hasMany(Cart, { foreignKey: "userId", onDelete: "CASCADE" });
Cart.belongsTo(User, { foreignKey: "userId" });

MenuItem.hasMany(Cart, { foreignKey: "menuItemId", onDelete: "CASCADE" });
Cart.belongsTo(MenuItem, { foreignKey: "menuItemId" });

module.exports = Cart;
