const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

class Restaurant extends Model {
    // based on cms example, find restaurant by primary key
    static async findRestaurant(restaurantID) {

        try {
            const restaurant = await restaurant.findByPk(restaurantID)
            if (restaurant) {
                return restaurant
            } else {
                return null
            }
        } catch (error) {
            console.log(error)
            return null
        }

    }
}

Restaurant.init({
    restaurantID: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        allowNull: false
    },

    restaurantName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    restaurantAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // cusines (multi-valued attribute), hasMany: https://sequelize.org/docs/v7/associations/has-many/

    // reviews (multi-valued attribute), hasMany: https://sequelize.org/docs/v7/associations/has-many/

    restaurantRating: {
        type: DataTypes.NUMBER,
        allowNull: false
    }

    // items (multi-valued attribute), hasMany: https://sequelize.org/docs/v7/associations/has-many/

}, {
  sequelize, 
  modelName: 'Restaurant'
});

module.exports = Restaurant