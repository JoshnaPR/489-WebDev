const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

class Order extends Model {

    // associations
    // sources: https://sequelize.org/docs/v7/associations/belongs-to/ ; https://stackoverflow.com/questions/58823117/how-to-use-sequelize-belongsto
    static associate = models => {
        
        // order belongs to specific user
        Order.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userID'
        });

    };

    // getter function ; using findOne due to composite primary key
    static async findOrder({userID, orderID}) {
        try {
            const order = await Order.findOne(userID, orderID)

            if (order) {
                return order
            } else {
                return null
            }
            
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

Order.init({
    orderID: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        allowNull: false
    },

    // TODO: foreign key to user (belongsTo) -> https://sequelize.org/docs/v7/associations/belongs-to/
    userID: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        allowNull: false
    },

    restaurantID: {
        type: DataTypes.NUMBER,
        allowNull: false
    },

    orderDate: {
        type: DataTypes.DATE,
        allowNull: false
    },

    orderPrice: {
        type: DataTypes.NUMBER,
        allowNull: false
    },

    userAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
    
}, {
  sequelize, 
  modelName: 'Order'
});

module.exports = Order