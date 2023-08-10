"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Report.belongsTo(models.user, {
        foreignKey: "user_id_report",
        targetKey: "id",
        as: "user_data",
      });
      Report.belongsTo(models.option_report, {
        foreignKey: "option_id_report",
        targetKey: "id",
        as: "option_data",
      });
    }
  }
  Report.init(
    {
      post_id: DataTypes.INTEGER,
      user_id_report: DataTypes.INTEGER,
      option_id_report: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "report",
    }
  );
  return Report;
};
