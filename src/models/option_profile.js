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
      Option_Profile.belongsTo(models.Cate_Profile, {
        foreignKey: "cate_id",
        targetKey: "id",
        as: "cate_data",
      });
      Option_Profile.hasMany(models.Profile_User, {
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
      modelName: "Option_Profile",
    }
  );
  return Option_Profile;
};
