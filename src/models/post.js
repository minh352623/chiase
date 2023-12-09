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
        models.video_image,
        {
          foreignKey: "post_id",
          as: "file_data",
        },
        { onDelete: "cascade" }
      );
      Post.hasMany(
        models.report,
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
        models.comment,
        {
          foreignKey: "post_id",
          as: "comment_data",
        },
        { onDelete: "cascade" }
      );
      Post.hasMany(
        models.share_post,
        {
          foreignKey: "post_id",
          as: "user_share",
        },
        { onDelete: "cascade" }
      );
      Post.belongsTo(models.user, {
        foreignKey: "user_id",
        targetKey: "id",
        as: "user_data",
      });
      Post.hasOne(models.post, {
        foreignKey: "share_post_id",
        as: "post_data",
      });
      Post.belongsTo(models.post, {
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
      request_useful: DataTypes.TEXT,
      useful: DataTypes.INTEGER,

    },
    {
      sequelize,
      modelName: "post",
    }
  );
  return Post;
};
