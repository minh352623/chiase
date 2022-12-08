"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group_User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Group_User.hasMany(models.User, {
        foreignKey: "group_id",
        as: "user_data",
      });
    }
  }
  Group_User.init(
    {
      name: DataTypes.STRING,
      permission: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Group_User",
    }
  );
  return Group_User;
};
