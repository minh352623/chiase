"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Share_Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Share_Post.belongsTo(models.user, {
        foreignKey: "user_id",
        targetKey: "id",
        as: "user_data",
      });
    }
  }
  Share_Post.init(
    {
      user_id: DataTypes.INTEGER,
      post_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "share_post",
    }
  );
  return Share_Post;
};
