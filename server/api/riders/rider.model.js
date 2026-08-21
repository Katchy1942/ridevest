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
		fullName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		phone: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		whatsappNumber: {
			type: DataTypes.STRING,
			allowNull: false
		},
		trackerId: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		profilePhoto: {
			type: DataTypes.STRING,
			allowNull: true
		},
		status: {
			type: DataTypes.ENUM('online', 'offline', 'on_delivery'),
			defaultValue: 'offline'
		},
		companyId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		firstName: {
			type: DataTypes.VIRTUAL,
			get() {
				const name = this.getDataValue('fullName') || '';
				return name.split(' ')[0] || '';
			}
		},
		lastName: {
			type: DataTypes.VIRTUAL,
			get() {
				const name = this.getDataValue('fullName') || '';
				return name.split(' ').slice(1).join(' ') || '';
			}
		},
		phoneNumber: {
			type: DataTypes.VIRTUAL,
			get() {
				return this.getDataValue('phone');
			}
		}
	}, {
		sequelize,
		modelName: 'Rider'
	});

	return Rider;
}
