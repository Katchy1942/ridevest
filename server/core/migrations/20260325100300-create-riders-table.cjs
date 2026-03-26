'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable('Riders', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			firstName: {
				type: Sequelize.STRING,
				allowNull: false
			},
			lastName: {
				type: Sequelize.STRING,
				allowNull: false
			},
			phoneNumber: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false
			},
			status: {
				type: Sequelize.ENUM('online', 'offline', 'busy'),
				defaultValue: 'offline'
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
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},

	async down (queryInterface, Sequelize) {
		await queryInterface.dropTable('Riders');
		await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Riders_status";');
	}
};
