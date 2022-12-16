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
        "post_id", // new field name
        {
          after: "text",
          type: Sequelize.INTEGER,
          allowNull: true,
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
        "notifycations", // table name
        "post_id", // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        }
      ),
    ]);
  },
};
