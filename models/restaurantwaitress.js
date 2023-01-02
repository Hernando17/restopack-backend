'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RestaurantWaitress extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    RestaurantWaitress.init({
        restaurantId: DataTypes.INTEGER,
        waitressId: DataTypes.INTEGER,
    }, {
        sequelize,
        paranoid: true,
        modelName: 'RestaurantWaitress',
    });
    return RestaurantWaitress;
};