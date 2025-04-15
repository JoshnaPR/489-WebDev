const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

const Restaurant = require('./Restaurant');

class Cuisine extends Model {

    // associations
    // sources: https://sequelize.org/docs/v7/associations/belongs-to/ ; https://stackoverflow.com/questions/58823117/how-to-use-sequelize-belongsto
    static associate (models) {
        // cuisine belongs to specific restaurant
        Cuisine.belongsTo(models.Restaurant, {
            as: 'restaurant',
            foreignKey: 'restaurantID'
        });

    };
    
    // getter function ; using findOne due to composite primary key
    static async findCuisine({restaurantID, cuisineType}) {
        try {
            const cuisine = await Cuisine.findOne(restaurantID, cuisineType)
            if (cuisine) {
                return cuisine
            } else {
                return null
            }

        } catch (error) {
            console.log(error)
            return null
        }
    };

    // getter function ; return list of cuisines (without restaurantID)
    static async listCuisines() {
        try {
            const list = await Cuisine.findAll()
            return list
            
        } catch (error) {
            console.log(error)
            return null
        }
    };

    // getter function ; return list of cuisines under restaurantID
    static async listCuisinesByRestaurant({restaurantID}) {
        try {
            const list = await Cuisine.findAll({
                where: { restaurantID }
            })
            return list
            
        } catch (error) {
            console.log(error)
            return null
        }
    };
}

// cuisine is a multi-valued attribute of restaurant
// we store pk as {cuisine, restaurant} to demonstrate this relationship
Cuisine.init({
    cuisineType: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },

    restaurantID: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    }

}, {
  sequelize, 
  modelName: 'Cuisine'
});


// // associations
// // sources: https://sequelize.org/docs/v7/associations/belongs-to/ ; https://stackoverflow.com/questions/58823117/how-to-use-sequelize-belongsto
// static associate (models) {
//     // cuisine belongs to specific restaurant
//     Cuisine.belongsTo(models.Restaurant, {
//         as: 'restaurant',
//         foreignKey: 'restaurantID'
//     });

// };

// // cuisine belongs to specific restaurant
// Cuisine.belongsTo(Restaurant, {
//     as: 'restaurant',
//     foreignKey: 'restaurantID'
// });

module.exports = Cuisine