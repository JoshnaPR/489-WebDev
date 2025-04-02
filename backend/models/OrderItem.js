const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Order = require("./Order");
const MenuItem = require("./MenuItem");

const OrderItem = sequelize.define("OrderItem", {
    // this id is restaurant id
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    orderId: {
        type: DataTypes.INTEGER,
        references: {
            model: Order,
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
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    timestamps: true
});

// Define relationships
Order.hasMany(OrderItem, { foreignKey: "orderId", onDelete: "CASCADE" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

MenuItem.hasMany(OrderItem, { foreignKey: "menuItemId", onDelete: "CASCADE" });
OrderItem.belongsTo(MenuItem, { foreignKey: "menuItemId" });

module.exports = OrderItem;
