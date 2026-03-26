import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Rider extends Model {
		static associate(models) {
			Rider.belongsTo(models.Company, {
				foreignKey: 'companyId',
				as: 'company'
			});

			Rider.hasMany(models.Delivery, {
				foreignKey: 'riderId',
				as: 'deliveries'
			});
		}
	}

	Rider.init({
		firstName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		phoneNumber: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		status: {
			type: DataTypes.ENUM('online', 'offline', 'on_delivery'),
			defaultValue: 'offline'
		},
		companyId: {
			type: DataTypes.INTEGER,
			allowNull: false
		}		
	}, {
		sequelize,
		modelName: 'Rider'
	});

	return Rider;
}
