'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Deliveries', 'pickupCoordinates');
    await queryInterface.removeColumn('Deliveries', 'dropoffCoordinates');
    await queryInterface.removeColumn('Deliveries', 'distance');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Deliveries', 'pickupCoordinates', {
      type: Sequelize.JSONB,
      allowNull: true
    });
    await queryInterface.addColumn('Deliveries', 'dropoffCoordinates', {
      type: Sequelize.JSONB,
      allowNull: true
    });
    await queryInterface.addColumn('Deliveries', 'distance', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    });
  }
};
