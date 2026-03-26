import models, { sequelize } from '../../core/models.index.js';

export const createRider = async (req, res) => {
	try {
		const { firstName, lastName, phoneNumber } = req.body;
		const companyId = req.company.id;

		if (!firstName || !lastName || !phoneNumber) {
			return res.status(400).json({ error: 'All fields are required' });
		}

		const existingRider = await models.Rider.findOne({ where: { phoneNumber } });
		if (existingRider) {
			return res.status(409).json({ error: 'Rider with this phone number already exists' });
		}

		const rider = await models.Rider.create({
			firstName,
			lastName,
			phoneNumber,
			companyId
		});

		res.status(201).json(rider);
	} catch (error) {
		console.error("Create Rider Error:", error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

export const getRiders = async (req, res) => {
	try {
		const riders = await models.Rider.findAll({
			where: { companyId: req.company.id },
         attributes: { 
            include: [
               [sequelize.fn('COUNT', sequelize.col('deliveries.id')), 'deliveryCount']
            ]
         },
         include: [
            {
               model: models.Delivery,
               as: 'deliveries',
               attributes: []
            }
         ],
         group: ['Rider.id'],
         order: [['createdAt', 'DESC']]
		});
		res.status(200).json(riders);
	} catch (error) {
		console.error("Fetch Riders Error:", error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};


export const updateRiderStatus = async (req, res) => {
	try {
		const { id } = req.params;
		const { status } = req.body;

		const rider = await models.Rider.findOne({
			where: { id, companyId: req.company.id }
		});

		if (!rider) {
			return res.status(404).json({ error: 'Rider not found' });
		}

      if (!['online', 'offline', 'on_delivery'].includes(status)) {
         return res.status(400).json({ error: 'Invalid status' });
      }

		rider.status = status;
		await rider.save();

		res.status(200).json(rider);
	} catch (error) {
		console.error("Update Rider Status Error:", error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

export const deleteRider = async (req, res) => {
	try {
		const { id } = req.params;

		const rider = await models.Rider.findOne({
			where: { id, companyId: req.company.id }
		});

		if (!rider) {
			return res.status(404).json({ error: 'Rider not found' });
		}

		await rider.destroy();
		res.status(200).json({ message: 'Rider removed successfully' });
	} catch (error) {
		console.error("Delete Rider Error:", error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
