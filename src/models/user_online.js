"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_Online extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_Online.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "id",
        as: "user_data",
      });
    }
  }
  User_Online.init(
    {
      user_id: DataTypes.INTEGER,
      total_time_online: DataTypes.INTEGER,
      total_login: DataTypes.INTEGER,
      devices: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User_Online",
    }
  );
  return User_Online;
};
