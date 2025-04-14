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
    }
}, {
    sequelize,
    modelName: 'HomeSettings',
    tableName: 'home_settings'
});

module.exports = HomeSettings;
