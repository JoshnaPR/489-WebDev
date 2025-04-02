const {Sequelize, DataTypes}=require('sequelize');
const sequelize=require('../database');

const User=sequelize.define('User',{
    FirstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    LastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CountryCode: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    PhoneNumber: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Password: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},{
    timestamps:true
});

module.exports=User;