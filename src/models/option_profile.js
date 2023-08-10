"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Option_Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Option_Profile.belongsTo(models.cate_profile, {
        foreignKey: "cate_id",
        targetKey: "id",
        as: "cate_data",
      });
      Option_Profile.hasMany(models.profile_user, {
        foreignKey: "option_profile_id",
        as: "profile_data",
      });
    }
  }
  Option_Profile.init(
    {
      key: DataTypes.STRING,
      cate_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "option_profile",
    }
  );
  return Option_Profile;
};
