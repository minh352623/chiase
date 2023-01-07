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
        "users", // table name
        "email_veryfied_at", // new field name
        {
          after: "description",
          type: Sequelize.DATE,
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
        "users", // table name
        "email_veryfied_at", // new field name
        {
          type: Sequelize.DATE,
          allowNull: true,
        }
      ),
    ]);
  },
};
