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
		}
	}

	Delivery.init({
		companyId: DataTypes.INTEGER,
		pickupLocation: DataTypes.STRING,
		dropoffLocation: DataTypes.STRING,
		vehicleType: DataTypes.STRING,
		price: DataTypes.DECIMAL(10, 2),
		description: DataTypes.TEXT,
		status: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'Delivery',
	});

	return Delivery;
}