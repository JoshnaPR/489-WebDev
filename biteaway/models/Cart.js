const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')
const Order = require('./Order');
const Item = require('./Item');
const User = require('./User');

class Cart extends Model {

    // associations
    // sources: https://sequelize.org/docs/v7/associations/belongs-to/ ; https://stackoverflow.com/questions/58823117/how-to-use-sequelize-belongsto
    static associate = models => {

        //Carts belongs to specific item and order
        Cart.belongsTo(models.Order, {
            as: 'order',
            foreignKey: 'orderID'
        });

        Cart.belongsTo(models.Item, {
            as: 'item',
            foreignKey: 'itemID'
        });

        // Cart.belongsTo(models.User, {
        //     as: 'user',
        //     foreignKey: 'userID'
        // });

    };
}

Cart.init({
    itemID: {
        type: DataTypes.NUMBER,
    },

    orderID: {
        type: DataTypes.NUMBER,
        primaryKey: true,
    },

    userID: {
        type: DataTypes.NUMBER,
        allowNull: false
    },

}, {
    sequelize,
    modelName: 'Cart'
});

module.exports = Cart