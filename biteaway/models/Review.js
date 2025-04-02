const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

// note:
// multiple reviews belong under each restaurant

class Review extends Model {
    // based on cms example, find item with restaurant and review
    static async findReview({restaurantID,reviewID}) {

        try {
            const review = await Review.findOne(restaurantID, reviewID);        // might have to use findOne instead of findByPl

            if (review) {
                return review
            } else {
                return null
            }

        } catch (error) {
            console.log(error)
            return null
        }
        
    }
}

Review.init({
    reviewID: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        allowNull: false
    },

    // TODO: foreign key to user (belongsTo) -> https://sequelize.org/docs/v7/associations/belongs-to/
    userID: {
        type: DataTypes.NUMBER,
        allowNull: false
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