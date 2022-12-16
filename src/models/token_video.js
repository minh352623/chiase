'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token_Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Token_Video.init({
    user_id: DataTypes.INTEGER,
    token: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Token_Video',
  });
  return Token_Video;
};