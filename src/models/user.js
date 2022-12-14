"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //định nghĩa quan hệ với các bảng chổ này...
      User.belongsTo(models.Group_User, {
        foreignKey: "group_id",
        targetKey: "id",
        as: "group_data",
      });
      User.hasMany(models.Profile_User, {
        foreignKey: "user_id",
        as: "profile_data",
      });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      gender: DataTypes.BOOLEAN, //gioi tính true là nữ,false mặc định là nam
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      group_id: DataTypes.STRING,
      avatar: DataTypes.STRING,
      bg_img: DataTypes.STRING,
      description: DataTypes.TEXT,
      id_facebook: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: "deletedAt",
      modelName: "User",
    }
  );
  return User;
};
