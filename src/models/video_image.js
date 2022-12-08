"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Video_Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Video_Image.init(
    {
      post_id: DataTypes.INTEGER,
      link: DataTypes.TEXT,
      subvalue: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Video_Image",
    }
  );
  return Video_Image;
};
