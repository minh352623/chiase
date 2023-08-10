"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserRoomBC extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserRoomBC.belongsTo(models.user, {
        foreignKey: "user_id",
        targetKey: "id",
        as: "user_data",
      });
      UserRoomBC.belongsTo(models.roombaucua, {
        foreignKey: "id_room",
        targetKey: "id",
        as: "room_data",
      });
    }
  }
  UserRoomBC.init(
    {
      user_id: DataTypes.INTEGER,
      id_room: DataTypes.STRING,
      code_transaction: DataTypes.TEXT,
      ready: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "userroombc",
    }
  );
  return UserRoomBC;
};
