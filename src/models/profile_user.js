"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile_User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile_User.belongsTo(models.option_profile, {
        foreignKey: "option_profile_id",
        targetKey: "id",
        as: "option_data",
      });
    }
  }
  Profile_User.init(
    {
      user_id: DataTypes.INTEGER,
      option_profile_id: DataTypes.INTEGER,
      value: DataTypes.TEXT,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "profile_user",
    }
  );
  return Profile_User;
};
