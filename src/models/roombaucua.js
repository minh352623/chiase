"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RoomBauCua extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RoomBauCua.hasMany(models.UserRoomBC, {
        foreignKey: "id_room",
        as: "user_room_data",
      });
      RoomBauCua.belongsTo(models.User, {
        foreignKey: "own_room",
        targetKey: "id",
        as: "own_data",
      });
    }
  }
  RoomBauCua.init(
    {
      name: DataTypes.STRING,
      size: DataTypes.INTEGER,
      code_room: DataTypes.STRING,
      count_user: DataTypes.INTEGER,
      password: DataTypes.STRING,
      own_room: DataTypes.INTEGER,
      blocked: DataTypes.INTEGER,
      started: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "RoomBauCua",
    }
  );
  return RoomBauCua;
};
