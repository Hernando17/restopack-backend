"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Table extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Table.init(
    {
      number: DataTypes.INTEGER,
      isOrdered: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Table",
    }
  );
  return Table;
};
