const sequelize = require('../db');
const { Model, DataTypes } = require('sequelize');

class HomeSettings extends Model { }

HomeSettings.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    heroTitle: {
        type: DataTypes.STRING,
        allowNull: true
    },
    heroDescription: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    heroButtonText: {
        type: DataTypes.STRING,
        allowNull: true
    },
    featureTitle1: {  // First feature title
        type: DataTypes.STRING,
        allowNull: true
    },
    featureDescription1: {  // First feature description
        type: DataTypes.TEXT,
        allowNull: true
    },
    featureTitle2: {  // Second feature title
        type: DataTypes.STRING,
        allowNull: true
    },
    featureDescription2: {  // Second feature description
        type: DataTypes.TEXT,
        allowNull: true
    },
    featureTitle3: {  // Third feature title
        type: DataTypes.STRING,
        allowNull: true
    },
    featureDescription3: {  // Third feature description
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'HomeSettings',
    tableName: 'home_settings'
});

module.exports = HomeSettings;
