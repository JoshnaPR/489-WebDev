const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

const User = require('./User');
const Restaurant = require('./Restaurant');
const Item = require('./Item');
// const Cart = require('./Cart');

class Order extends Model {

    // associations
    // sources: https://sequelize.org/docs/v7/associations/belongs-to/ ; https://stackoverflow.com/questions/58823117/how-to-use-sequelize-belongsto
    static associate = models => {
        
        // order belongs to specific user
        Order.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userID'
        });

        // order belongs to specific restaurant
        Order.belongsTo(models.Restaurant, {
            as: 'restaurant',
            foreignKey: 'restaurantID'
        });

        // many-to-many relationship between item and order ; will use cart as many-to-many
        // source: https://sequelize.org/docs/v7/associations/belongs-to-many/ ; https://stackoverflow.com/questions/54865569/sequelize-belongstomany-foreignkey-attribute-not-woking
        Order.belongsToMany(models.Item, {
            as: 'items',
            foreignKey: 'orderID',
            otherKey: 'itemID',
            through: models.Cart
        });
    };

    // getter function ; using findOne due to composite primary key
    static async findOrder({userID, orderID}) {
        try {
            const order = await Order.findOne(userID, orderID)

            if (order) {
                return order
            } else {
                return null
            }
            
        } catch (error) {
            console.log(error)
            return null
        }
    };

    static async findActiveOrder({userID}) {
        try {
            // console.log("FINDORDER userID", userID)

            const order = await Order.findOne({
                where: {
                    userID,
                    status: "Pending",
                },
            });

            if (order){
                return order
            }
            else {
                return null
            }
           
            
        } catch (error) {
            console.log(error)
            return null
        }
    };

    static async findTrackingOrder({userID}) {
        try {
            // console.log("FINDORDER userID", userID)

            const order = await Order.findOne({
                where: {
                    userID,
                    status: "Preparing",
                },
            });

            if (order){
                return order
            }
            else {
                return null
            }
           
            
        } catch (error) {
            console.log(error)
            return null
        }
    };

    // getter function ; return list of orders by user
    static async listOrdersByUser({userID}) {
        try {
            const list = await Order.findAll({
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

    // count the number of items under a order
    // TODO: fix this later. move to cart model?
    static async countItemsByOrder({orderID}) {
        try {
            const itemCount = await Cart.count({
                where: { orderID }
            })

            return itemCount    

        } catch (error) {
            console.log(error)
            return null
        }
    };

    // getter function ; return list of items under an order
    // TODO: fix this later. move to cart model?
    static async listItems({orderID}) {
        // source: https://stackoverflow.com/questions/53757460/sequelize-findall-include-same-models-2-times-with-different-condition
        try {
            const list = await Cart.findAll({
                where: { orderID },
                include: [{
                    model: Item,
                    as: 'item'
                }]
            })

            return list
            
        } catch (error) {
            console.log(error)
            return null
        }
    };

    // getter function ; return list of orders under userID
    static async listOrderByUser({userID}) {
        // source: https://stackoverflow.com/questions/53757460/sequelize-findall-include-same-models-2-times-with-different-condition
        try {
            const list = await Order.findAll({
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

Order.init({
    orderID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        //generate an ID: https://www.yugabyte.com/blog/automatic-id-generation-postgresql-nodejs-sequelize/
        primaryKey: true,
        allowNull: false
    },

    userID: {
        type: DataTypes.NUMBER,
        allowNull: false
    },

    restaurantID: {
        type: DataTypes.NUMBER,
        allowNull: false
    },

    orderDate: {
        type: DataTypes.DATE,
        allowNull: false
    },

    orderPrice: {
        type: DataTypes.NUMBER,
        allowNull: false
    },

    userAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
    
}, {
  sequelize, 
  modelName: 'Order'
});

module.exports = Order