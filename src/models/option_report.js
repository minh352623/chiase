'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Option_Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Option_Report.init({
    img: DataTypes.STRING,
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'option_report',
  });
  return Option_Report;
};