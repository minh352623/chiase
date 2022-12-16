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
        "posts", // table name
        "comment_count", // new field name
        {
          after: "like_count",
          type: Sequelize.INTEGER,
          defaultValue: 0,
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
        "posts", // table name
        "comment_count", // new field name
        {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        }
      ),
    ]);
  },
};
