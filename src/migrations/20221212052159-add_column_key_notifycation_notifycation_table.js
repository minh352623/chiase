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
        "notifycations", // table name
        "key", // new field name
        {
          after: "id",
          type: Sequelize.STRING,
          defaultValue: "like",
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
      queryInterface.addColumn(
        "notifycations", // table name
        "key", // new field name
        {
          type: Sequelize.STRING,
          defaultValue: "like",
        }
      ),
    ]);
  },
};
