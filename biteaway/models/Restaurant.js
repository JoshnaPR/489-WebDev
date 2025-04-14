const sequelize  = require('../db')
const { Model, DataTypes } = require('sequelize')

class Restaurant extends Model {

    // associations
    // sources: https://sequelize.org/docs/v7/associations/belongs-to/ ; https://stackoverflow.com/questions/58823117/how-to-use-sequelize-belongsto
    static associate (models) {
        
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

        // restaurant has many orders
        Restaurant.hasMany(models.Order, {
            as: 'orders',
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

    // TODO:[ ---------- FINISH IMPLEMENTING/TESTING THESE ---------- ]

    // SORTING/FORMATTING: return list of sorted restaurants, sorted by rating, descending
    static async sortRestaurantByRatingDesc() {
        try {
            const list = await Restaurant.findAll({
                // sort
                order: [
                    ['restaurantRating', 'DESC']
                ]
            })
            
            return list
            
        } catch (error) {
            console.log(error)
            return null
        }
    };

    // SORTING/FORMATTING: return list of sorted restaurants, sorted by rating, ascending
    static async sortRestaurantByRatingAsc() {
        try {
            const list = await Restaurant.findAll({
                // sort
                order: [
                    ['restaurantRating', 'ASC']
                ]
            })
            
            return list
            
        } catch (error) {
            console.log(error)
            return null
        }
    };

    // TODO:[ ---------- FINISH IMPLEMENTING/TESTING THESE ---------- ]

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
    },

    openingTime: {
        type: DataTypes.STRING,
        allowNull: false
    },

    closingTime: {
        type: DataTypes.STRING,
        allowNull: false
    },

    phoneNumber: {
        type: DataTypes.NUMBER,
        allowNull: false
    },

}, {
  sequelize, 
  modelName: 'Restaurant'
});

module.exports = Restaurant