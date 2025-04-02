const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

class Cuisine extends Model {
    
    static async findCuisine({restaurantID, cuisineType}) {
        // using findOne since cuisine is a multi-valued attribute of restaurant
        try {
            const cuisine = await Cuisine.findOne(restaurantID, cusineType)
            if (user) {
                return user
            } else {
                return null
            }

        } catch (error) {
            console.log(error)
            return null
        }

    }
}

// cuisine is a multi-valued attribute of restaurant
// we store pk as {cuisine, restaurant} to demonstrate this relationship (451)
Cuisine.init({
    cuisineType: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },

    // TODO: foreign key to restaurant (belongsTo) -> https://sequelize.org/docs/v7/associations/belongs-to/
    restaurantID: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    }

}, {
  sequelize, 
  modelName: 'Cuisine'
});

module.exports = Cuisine