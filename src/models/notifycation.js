"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notifycation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Notifycation.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "id",
        as: "user_data",
      });
    }
  }
  Notifycation.init(
    {
      user_id: DataTypes.INTEGER,
      text: DataTypes.TEXT,
      post_id: DataTypes.INTEGER,
      read: DataTypes.INTEGER,
      key: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Notifycation",
    }
  );
  return Notifycation;
};
