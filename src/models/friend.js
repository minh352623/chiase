"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Friend.belongsTo(models.user, {
        foreignKey: "sender",
        targetKey: "id",
        as: "sender_data",
      });
      Friend.belongsTo(models.user, {
        foreignKey: "recie",
        targetKey: "id",
        as: "recie_data",
      });
    }
  }
  Friend.init(
    {
      sender: DataTypes.INTEGER,
      recie: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "friend",
    }
  );
  return Friend;
};
