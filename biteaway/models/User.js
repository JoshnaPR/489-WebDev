const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

class User extends Model {
    // based on cms example, find user by primary key (userID)
    static async findUser(userID) {

        try {
            const user = await User.findByPk(userID)
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

User.init({
    userID: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        allowNull: false
    },

    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    countryCode: {
        type: DataTypes.NUMBER,
        allowNull: false
    },

    phoneNumber: {
        type: DataTypes.NUMBER,
        allowNull: false
    },

    userAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
  sequelize, 
  modelName: 'User'
});

module.exports = User