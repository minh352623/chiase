"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn(
        "option_profiles", // table name
        "cate_id", // new field name
        {
          after: "key",
          type: Sequelize.INTEGER,
        }
      ),
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn(
        "option_profiles", // table name
        "cate_id", // new field name
        {
          after: "key",
          type: Sequelize.INTEGER,
        }
      ),
    ]);
  },
};
