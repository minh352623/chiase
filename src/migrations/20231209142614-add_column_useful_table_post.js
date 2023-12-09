'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn(
        "posts", // table name
        "request_useful", // new field name
        {
          after: "share_count",
          type: Sequelize.TEXT,
        }
      ),
      queryInterface.addColumn(
        "posts", // table name
        "useful", // new field name
        {
          after: "share_count",
          type: Sequelize.INTEGER,
          defaultValue:0
        }
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
