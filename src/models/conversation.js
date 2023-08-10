"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Conversation.hasMany(models.message, {
        foreignKey: "id_conversation",
        as: "message_data",
      });
    }
  }
  Conversation.init(
    {
      user_one: DataTypes.INTEGER,
      user_second: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "conversation",
    }
  );
  return Conversation;
};
