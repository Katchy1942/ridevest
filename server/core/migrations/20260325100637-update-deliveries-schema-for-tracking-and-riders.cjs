'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		// Add columns to existing Deliveries table
		const columns = [
			{ name: 'riderId', type: Sequelize.INTEGER, allowNull: true, references: { model: 'Riders', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'SET NULL' },
			{ name: 'trackingId', type: Sequelize.STRING, unique: true, allowNull: false },
			{ name: 'pickupCoordinates', type: Sequelize.JSONB, allowNull: true },
			{ name: 'dropoffCoordinates', type: Sequelize.JSONB, allowNull: true },
			{ name: 'distance', type: Sequelize.DECIMAL(10, 2), allowNull: true },
			{ name: 'receiverName', type: Sequelize.STRING, allowNull: true },
			{ name: 'receiverPhone', type: Sequelize.STRING, allowNull: true },
			{ name: 'senderName', type: Sequelize.STRING, allowNull: true },
			{ name: 'senderPhone', type: Sequelize.STRING, allowNull: true },
			{ name: 'weightEstimate', type: Sequelize.DECIMAL(10, 2), allowNull: true },
			{ name: 'businessName', type: Sequelize.STRING, allowNull: true },
		];

		for (const col of columns) {
			await queryInterface.addColumn('Deliveries', col.name, {
			type: col.type,
			allowNull: col.allowNull,
			unique: col.unique,
			references: col.references,
			onUpdate: col.onUpdate,
			onDelete: col.onDelete
			});
		}

		// Update status column default
		await queryInterface.changeColumn('Deliveries', 'status', {
			type: Sequelize.STRING,
			defaultValue: 'unassigned'
		});
	},

	async down (queryInterface, Sequelize) {
		const columns = [
			'riderId', 'trackingId', 'pickupCoordinates', 'dropoffCoordinates', 
			'distance', 'receiverName', 'receiverPhone', 'senderName', 
			'senderPhone', 'weightEstimate', 'businessName'
		];

		for (const col of columns) {
			await queryInterface.removeColumn('Deliveries', col);
		}

		await queryInterface.changeColumn('Deliveries', 'status', {
			type: Sequelize.STRING,
			defaultValue: null
		});
	}
};
