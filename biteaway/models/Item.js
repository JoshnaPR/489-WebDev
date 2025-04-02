const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

// note:
// multiple items belong under each restaurant (like a menu)

class Item extends Model {
    // based on cms example, find item with restaurant and item
    static async findItem({restaurantID,itemID}) {

        try {
            const item = await Item.findOne(restaurantID, itemID);        // might have to use findOne instead of findByPl

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

    // TODO: foreign key to user (belongsTo) -> https://sequelize.org/docs/v7/associations/belongs-to/
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