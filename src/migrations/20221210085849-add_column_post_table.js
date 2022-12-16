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
        "Posts", // table name
        "access_modifier", // new field name
        {
          after: "friend_tag",
          type: Sequelize.STRING,
          defaultValue: 1,
        }
      ),
      queryInterface.addColumn(
        "Posts", // table name
        "like_count", // new field name
        {
          after: "friend_tag",
          type: Sequelize.INTEGER,
          defaultValue: 0,
        }
      ),
      queryInterface.addColumn(
        "Posts", // table name
        "share_post_id", // new field name
        {
          after: "friend_tag",
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
        "Posts", // table name
        "access_modifier", // new field name
        {
          type: Sequelize.STRING,
          defaultValue: 1,
        }
      ),
      queryInterface.removeColumn(
        "Posts", // table name
        "like_count", // new field name
        {
          type: Sequelize.STRING,
          defaultValue: 0,
        }
      ),
      queryInterface.removeColumn(
        "Posts", // table name
        "share_post_id", // new field name
        {
          type: Sequelize.STRING,
          defaultValue: 0,
        }
      ),
    ]);
  },
};
