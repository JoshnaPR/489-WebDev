const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

class Item extends Model {

    // associations
    // sources: https://sequelize.org/docs/v7/associations/belongs-to/ ; https://stackoverflow.com/questions/58823117/how-to-use-sequelize-belongsto
    static associate = models => {
        
        // item belongs to specific restaurant
        Item.belongsTo(models.Restaurant, {
            as: 'restaurant',
            foreignKey: 'restaurantID'
        });

        // item also can belong to a specific user order
        Item.belongsTo(models.Order, {
            as: 'order',
            foreignKey: 'orderID'
        });

    };

    // getter function ; using findOne due to composite primary key
    static async findItem({restaurantID,itemID}) {
        try {
            const item = await Item.findOne(restaurantID, itemID);

            if (item) {
                return item
            } else {
                return null
            }

        } catch (error) {
            console.log(error)
            return null
        }
    }
}

Item.init({
    itemID: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        allowNull: false
    },

    restaurantID: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        allowNull: false
    },

    itemName: {
        type: DataTypes.NUMBER,
        allowNull: false
    },

    itemPrice: {
        type: DataTypes.NUMBER,
        allowNull: false
    },

    itemDescription: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
  sequelize, 
  modelName: 'Item'
});

module.exports = Item