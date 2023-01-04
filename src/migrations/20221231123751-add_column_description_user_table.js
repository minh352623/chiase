// "use strict";

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     /**
//      * Add altering commands here.
//      *
//      * Example:
//      * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
//      */
//     return Promise.all([
//       queryInterface.addColumn(
//         "users", // table name
//         "description", // new field name
//         {
//           after: "group_id",
//           type: Sequelize.TEXT,
//           allowNull: true,
//         }
//       ),
//     ]);
//   },

//   async down(queryInterface, Sequelize) {
//     /**
//      * Add reverting commands here.
//      *
//      * Example:
//      * await queryInterface.dropTable('users');
//      */
//     return Promise.all([
//       queryInterface.removeColumn(
//         "users", // table name
//         "description", // new field name
//         {
//           type: Sequelize.TEXT,
//           allowNull: true,
//         }
//       ),
//     ]);
//   },
// };
