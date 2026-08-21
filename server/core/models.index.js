import sequelize from '../config/database.js';
import defineCompany from '../api/companies/company.model.js';
import defineDelivery from '../api/deliveries/delivery.model.js';
import defineRider from '../api/riders/rider.model.js';

const Company = defineCompany(sequelize);
const Delivery = defineDelivery(sequelize);
const Rider = defineRider(sequelize);

const models = {
	Company,
	Delivery,
	Rider
};

Object.keys(models).forEach((modelName) => {
	if (models[modelName].associate) {
		models[modelName].associate(models);
	}
});

export { sequelize };
export default models;
