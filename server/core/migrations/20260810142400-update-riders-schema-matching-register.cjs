'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		const table = await queryInterface.describeTable('Riders');

		if (table.firstName) {
			await queryInterface.removeColumn('Riders', 'firstName');
		}
		if (table.lastName) {
			await queryInterface.removeColumn('Riders', 'lastName');
		}
		if (table.phoneNumber) {
			await queryInterface.removeColumn('Riders', 'phoneNumber');
		}

		if (!table.fullName) {
			await queryInterface.addColumn('Riders', 'fullName', {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: 'Rider'
			});
		}
		if (!table.phone) {
			await queryInterface.addColumn('Riders', 'phone', {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
				defaultValue: ''
			});
		}
		if (!table.whatsappNumber) {
			await queryInterface.addColumn('Riders', 'whatsappNumber', {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: ''
			});
		}
		if (!table.trackerId) {
			await queryInterface.addColumn('Riders', 'trackerId', {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: ''
			});
		}
		if (!table.password) {
			await queryInterface.addColumn('Riders', 'password', {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: ''
			});
		}
		if (!table.profilePhoto) {
			await queryInterface.addColumn('Riders', 'profilePhoto', {
				type: Sequelize.STRING,
				allowNull: true
			});
		}
	},

	async down (queryInterface, Sequelize) {
		const table = await queryInterface.describeTable('Riders');

		if (table.fullName) await queryInterface.removeColumn('Riders', 'fullName');
		if (table.phone) await queryInterface.removeColumn('Riders', 'phone');
		if (table.whatsappNumber) await queryInterface.removeColumn('Riders', 'whatsappNumber');
		if (table.trackerId) await queryInterface.removeColumn('Riders', 'trackerId');
		if (table.password) await queryInterface.removeColumn('Riders', 'password');
		if (table.profilePhoto) await queryInterface.removeColumn('Riders', 'profilePhoto');

		if (!table.firstName) {
			await queryInterface.addColumn('Riders', 'firstName', {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: ''
			});
		}
		if (!table.lastName) {
			await queryInterface.addColumn('Riders', 'lastName', {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: ''
			});
		}
		if (!table.phoneNumber) {
			await queryInterface.addColumn('Riders', 'phoneNumber', {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
				defaultValue: ''
			});
		}
	}
};
