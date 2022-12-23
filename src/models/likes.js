"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      likes.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "id",
        as: "user_data",
      });
    }
  }
  likes.init(
    {
      user_id: DataTypes.INTEGER,
      post_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "likes",
    }
  );
  return likes;
};
