const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')
const Order = require('./Order');
const Item = require('./Item');

class OrderItem extends Model {

    // associations
    // sources: https://sequelize.org/docs/v7/associations/belongs-to/ ; https://stackoverflow.com/questions/58823117/how-to-use-sequelize-belongsto
    static associate = models => {
        
        // orderItems belongs to specific item and order
        OrderItem.belongsTo(models.Order, {
            as: 'order',
            foreignKey: 'orderID'
        });

        OrderItem.belongsTo(models.Item, {
            as: 'item',
            foreignKey: 'itemID'
        });

    };
}

OrderItem.init({
    itemID: {
        type: DataTypes.NUMBER,
        primaryKey: true,
    },
    
    orderID: {
        type: DataTypes.NUMBER,
        primaryKey: true,
    }

}, {
  sequelize, 
  modelName: 'OrderItem'
});

module.exports = OrderItem