'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require('../data/courses.json').map(el => {
      delete el.id
      el.createdAt = el.updatedAt = new Date()
      return el
    })

    await queryInterface.bulkInsert('Courses', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Courses', null)
  }
};
