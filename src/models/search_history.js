'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Search_History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Search_History.init({
    user_id: DataTypes.INTEGER,
    keyword: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'search_history',
  });
  return Search_History;
};