"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "id",
        as: "user_data",
      });
      Comment.belongsTo(models.Post, {
        foreignKey: "post_id",
        targetKey: "id",
        as: "post_data",
      });
      Comment.hasMany(
        models.Like_comment,
        {
          foreignKey: "comment_id",
          as: "like_comment_data",
        },
        { onDelete: "cascade" }
      );
    }
  }
  Comment.init(
    {
      post_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      text: DataTypes.TEXT,
      file: DataTypes.TEXT,
      parent_id: DataTypes.INTEGER,
      like_count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
