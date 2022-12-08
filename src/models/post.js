"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.hasMany(models.Video_Image, {
        foreignKey: "post_id",
        as: "file_data",
      });
      Post.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "id",
        as: "user_data",
      });
    }
  }
  Post.init(
    {
      user_id: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      friend_tag: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
