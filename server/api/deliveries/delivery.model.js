'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Delivery extends Model {
		static associate(models) {
			// A delivery belongs to a company
			Delivery.belongsTo(models.Company, {
				foreignKey: 'companyId',
				as: 'company'
			});

			// A delivery can be assigned to a rider
			Delivery.belongsTo(models.Rider, {
				foreignKey: 'riderId',
				as: 'rider'
			});
		}
	}

	Delivery.init({
		companyId: DataTypes.INTEGER,
		riderId: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		trackingId: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		pickupLocation: DataTypes.STRING,
		dropoffLocation: DataTypes.STRING,
		pickupCoordinates: {
			type: DataTypes.JSONB,
			allowNull: true
		},
		dropoffCoordinates: {
			type: DataTypes.JSONB,
			allowNull: true
		},
		distance: DataTypes.DECIMAL(10, 2),
		receiverName: DataTypes.STRING,
		receiverPhone: DataTypes.STRING,
		senderName: DataTypes.STRING,
		senderPhone: DataTypes.STRING,
		vehicleType: DataTypes.STRING,
		weightEstimate: DataTypes.DECIMAL(10, 2),
		price: DataTypes.DECIMAL(10, 2),
		description: DataTypes.TEXT,
		businessName: {
			type: DataTypes.STRING,
			allowNull: true
		},
		status: {
			type: DataTypes.STRING,
			defaultValue: 'unassigned'
		}
	}, {
		sequelize,
		modelName: 'Delivery',
	});

	return Delivery;
}