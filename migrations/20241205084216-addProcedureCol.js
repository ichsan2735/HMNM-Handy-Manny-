'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Courses', 'procedure', Sequelize.TEXT)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Courses', 'procedure')
  }
};
