'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require('../data/usercourses.json').map(el => {
      delete el.id
      el.createdAt = el.updatedAt = new Date()
      return el
    })

    await queryInterface.bulkInsert('UserCourses', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserCourses', null)
  }
};
