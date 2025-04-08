const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

class Restaurant extends Model {

    // associations
    // sources: https://sequelize.org/docs/v7/associations/belongs-to/ ; https://stackoverflow.com/questions/58823117/how-to-use-sequelize-belongsto
    static associate = models => {
        
        // restaurant has many cuisines
        Restaurant.hasMany(models.Cuisine, {
            as: 'cuisines',
            foreignKey: 'restaurantID' // due to has-many relationship
        });

        // restaurant has many reviews
        Restaurant.hasMany(models.Review, {
            as: 'reviews',
            foreignKey: 'restaurantID' // due to has-many relationship
        });

        // restaurant has many items
        Restaurant.hasMany(models.Item, {
            as: 'items',
            foreignKey: 'restaurantID' // due to has-many relationship
        });

    };

    // based on cms example, find restaurant by primary key
    static async findRestaurant(restaurantID) {
        try {
            const restaurant = await Restaurant.findByPk(restaurantID)
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

    restaurantRating: {
        type: DataTypes.NUMBER,
        allowNull: false
    }

}, {
  sequelize, 
  modelName: 'Restaurant'
});

module.exports = Restaurant