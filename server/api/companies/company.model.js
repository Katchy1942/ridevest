'use strict';
import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

export default (sequelize) => {
	class Company extends Model {
		static associate(models) {
			// A company can have many deliveries
			Company.hasMany(models.Delivery, {
				foreignKey: 'companyId',
				as: 'deliveries'
			});
		}
	}

	Company.init({
		companyName: DataTypes.STRING,
		whatsappNumber: DataTypes.STRING,
		mobileNumber: DataTypes.STRING,
		email: DataTypes.STRING,
		address: DataTypes.STRING,
		state: DataTypes.STRING,
		availableDays: DataTypes.ARRAY(DataTypes.STRING),
		timeFrom: DataTypes.STRING,
		timeTo: DataTypes.STRING,
		supportedModes: DataTypes.ARRAY(DataTypes.STRING),
		averageDeliveryPrice: DataTypes.FLOAT,
		logoPath: DataTypes.STRING,
      traccarId: {
         type: DataTypes.INTEGER,
         unique: true,
         allowNull: true
      },
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		confirmPassword: {
			type: DataTypes.VIRTUAL,
			set(value) {
				if (value !== this.password) {
					throw new Error('Password confirmation does not match password');
				}
				this.setDataValue('confirmPassword', value);
			}
		}
	}, {
		sequelize,
		modelName: 'Company',
		hooks: {
			beforeCreate: async (company) => {
				if (company.password) {
					company.password = await bcrypt.hash(company.password, 10);
				}
			},
			beforeUpdate: async (company) => {
				if (company.changed('password')) {
					company.password = await bcrypt.hash(company.password, 10);
				}
			}
		}
	});

	return Company;
}