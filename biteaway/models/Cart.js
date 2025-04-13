const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

// const Order = require('./Order');
// const Item = require('./Item');
// const User = require('./User');

class Cart extends Model {

    // associations
    // sources: https://sequelize.org/docs/v7/associations/belongs-to/ ; https://stackoverflow.com/questions/58823117/how-to-use-sequelize-belongsto
    static associate = models => {

        //Carts belongs to specific item and order
        Cart.belongsTo(models.Order, {
            as: 'order',
            foreignKey: 'orderID'
        });

        Cart.belongsTo(models.Item, {
            as: 'item',
            foreignKey: 'itemID'
        });

        Cart.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userID'
        });

    };

    // getter function ; using findOne due to composite primary key
    static async findByUser(userID) {
        try {

            const cart = await Cart.findOne({
                where: {
                    userID,
                },
            });

            if (cart){
                return cart
            }
            else {
                return null
            }
           
            
        } catch (error) {
            console.log(error)
            return null
        }
    };
 
}

Cart.init({
    // note: not sure if we can have order as primary key
    // cartID: {
    //     type: DataTypes.INTEGER,
    //     autoIncrement: true,
    //     //generate an ID: https://www.yugabyte.com/blog/automatic-id-generation-postgresql-nodejs-sequelize/
    //     primaryKey: true
    // },
    
    itemID: {
        type: DataTypes.NUMBER,
        allowNull: false
    },

    orderID: {
        type: DataTypes.NUMBER,
        allowNull: false
    },

    userID: {
        type: DataTypes.NUMBER,
        allowNull: false,
        //primaryKey: true

    },

}, {
    sequelize,
    modelName: 'Cart'
});

module.exports = Cart