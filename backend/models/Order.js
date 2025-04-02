// This is for the admin to understand who placed what order and whats the status of that order

const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = require("./User");

const Order = sequelize.define("Order", {
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
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("pending", "completed", "cancelled"),
        defaultValue: "pending"
    }
}, {
    timestamps: true
});

// Define relationships
User.hasMany(Order, { foreignKey: "userId", onDelete: "CASCADE" });
Order.belongsTo(User, { foreignKey: "userId" });

module.exports = Order;
