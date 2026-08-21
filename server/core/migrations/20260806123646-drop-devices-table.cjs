'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('Devices', ['uniqueId']);
    await queryInterface.removeIndex('Devices', ['companyId']);

    await queryInterface.dropTable('Devices');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Devices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      uniqueId: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      companyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Companies',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      linkedRiderId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Riders',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      traccarId: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // restore indexes
    await queryInterface.addIndex('Devices', ['uniqueId']);
    await queryInterface.addIndex('Devices', ['companyId']);
  }
};
