const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize');
const Restaurant = require('./Restaurant');

class Review extends Model {

    // associations
    // sources: https://sequelize.org/docs/v7/associations/belongs-to/ ; https://stackoverflow.com/questions/58823117/how-to-use-sequelize-belongsto
    static associate = models => {
        
        // review belongs to specific user
        Review.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userID'
        });

        // review belongs to specific restaurant
        Review.belongsTo(models.Restaurant, {
            as: 'restaurant',
            foreignKey: 'restaurantID'
        });
    };

    // getter function ; using findOne due to composite primary key
    static async findReview({restaurantID,reviewID}) {  
        try {
            const review = await Review.findOne(restaurantID, reviewID);

            if (review) {
                return review
            } else {
                return null
            }

        } catch (error) {
            console.log(error)
            return null
        }
    };

    // count the number of reviews a user had made
    static async countReviews({userID}) {
        try {
            const reviewCount = await Review.count({
                where: { userID }
            })
            return reviewCount    

        } catch (error) {
            console.log(error)
            return null
        }
    };

    // getter function ; return list of cuisines under userID
    static async listReviews({userID}) {
        // source: https://stackoverflow.com/questions/53757460/sequelize-findall-include-same-models-2-times-with-different-condition
        try {
            const list = await Review.findAll({
                where: { userID },
                include: [{
                    model: Restaurant,
                    as: 'restaurant'
                }]
            })
            
            return list
            
        } catch (error) {
            console.log(error)
            return null
        }
    };

}

Review.init({
    reviewID: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        allowNull: false
    },

    userID: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },

    restaurantID: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },

    reviewRating: {
        type: DataTypes.NUMBER,
        allowNull: false
    },

    reviewDescription: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
  sequelize, 
  modelName: 'Review'
});

module.exports = Review