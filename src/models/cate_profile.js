'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cate_Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cate_Profile.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cate_profile',
  });
  return Cate_Profile;
};