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
      Post.hasMany(
        models.Video_Image,
        {
          foreignKey: "post_id",
          as: "file_data",
        },
        { onDelete: "cascade" }
      );
      Post.hasMany(
        models.Report,
        {
          foreignKey: "post_id",
          as: "report_post_data",
        },
        { onDelete: "cascade" }
      );
      Post.hasMany(
        models.likes,
        {
          foreignKey: "post_id",
          as: "like_data",
        },
        { onDelete: "cascade" }
      );
      Post.hasMany(
        models.Comment,
        {
          foreignKey: "post_id",
          as: "comment_data",
        },
        { onDelete: "cascade" }
      );
      Post.hasMany(
        models.Share_Post,
        {
          foreignKey: "post_id",
          as: "user_share",
        },
        { onDelete: "cascade" }
      );
      Post.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "id",
        as: "user_data",
      });
      Post.hasOne(models.Post, {
        foreignKey: "share_post_id",
        as: "post_data",
      });
      Post.belongsTo(models.Post, {
        foreignKey: "share_post_id",
        targetKey: "id",
        as: "post_data_two",
      });
    }
  }
  Post.init(
    {
      user_id: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      friend_tag: DataTypes.TEXT,
      access_modifier: DataTypes.STRING,
      like_count: DataTypes.INTEGER,
      comment_count: DataTypes.INTEGER,
      share_count: DataTypes.INTEGER,
      share_post_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
