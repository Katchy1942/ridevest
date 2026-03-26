'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Device extends Model {
		static associate(models) {
			Device.belongsTo(models.Company, {
				foreignKey: 'companyId',
				as: 'company'
			});

         Device.belongsTo(models.Rider, {
            foreignKey: 'linkedRiderId',
            as: 'rider'
         });
		}
	}

	Device.init({
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		uniqueId: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		companyId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
      linkedRiderId: {
         type: DataTypes.INTEGER,
         allowNull: true
      },
      traccarId: {

         type: DataTypes.INTEGER,
         unique: true,
         allowNull: true
      }
	}, {
		sequelize,
		modelName: 'Device',
	});

	return Device;
}
