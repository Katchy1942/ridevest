'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('Companies', 'averageDeliveryPrice', {
			type: Sequelize.FLOAT,
			allowNull: true,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('Companies', 'averageDeliveryPrice');
	}
};
