'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		// Add traccarId to Companies
		await queryInterface.addColumn('Companies', 'traccarId', {
			type: Sequelize.INTEGER,
			unique: true,
			allowNull: true
		});

		await queryInterface.sequelize.query('ALTER TYPE "enum_Riders_status" ADD VALUE IF NOT EXISTS \'on_delivery\'');

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

		// Indexes
		await queryInterface.addIndex('Devices', ['uniqueId']);
		await queryInterface.addIndex('Devices', ['companyId']);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Devices');
		await queryInterface.removeColumn('Companies', 'traccarId');
	}
};
