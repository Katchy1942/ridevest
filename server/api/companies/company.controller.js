import models from '../../core/models.index.js';

export const registerCompany = async (req, res) => {
	try {
		let {
			companyName, 
			whatsappNumber, 
			mobileNumber, 
			email,
			address, 
			state, 
			timeFrom,
			timeTo,
			averageDeliveryPrice,
			password, 
			confirmPassword
		} = req.body;

		const availableDays = Array.isArray(req.body.availableDays) 
			? req.body.availableDays 
			: (req.body.availableDays ? [req.body.availableDays] : []);
		
		const supportedModes = Array.isArray(req.body.supportedModes) 
			? req.body.supportedModes 
			: (req.body.supportedModes ? [req.body.supportedModes] : []);

		const logoPath = req.file ? req.file.path.replace(/\\/g, '/') : null;

		// Backend Validation
		if (!companyName || !email || !password || !confirmPassword) {
			return res.status(400).json({ error: 'Missing required fields' });
		}

		const existingCompany = await models.Company.findOne({ where: { email } });
		if (existingCompany) {
			return res.status(409).json({ error: 'Email is already taken by another company' });
		}

		const newCompany = await models.Company.create({
			companyName,
			whatsappNumber,
			mobileNumber,
			email,
			address,
			state,
			availableDays,
			timeFrom,
			timeTo,
			supportedModes,
			logoPath,
			averageDeliveryPrice,
			password, 
			confirmPassword
		});

		const companyData = newCompany.toJSON();
		delete companyData.password;
		delete companyData.confirmPassword;

		return res.status(201).json({
			message: 'Company registered successfully',
			company: companyData
		});
		
	} catch (error) {
		console.error("Company Registration Error:", error);
		if (error.message === 'Password confirmation does not match password') {
			return res.status(400).json({ error: error.message });
		}
		
		return res.status(500).json({ error: 'Internal Server Error during registration' });
	}
};

export const getCompaniesByState = async (req, res) => {
	try {
		const { state } = req.params;
		if (!state) return res.status(400).json({ error: 'State parameter is required' });

		const companies = await models.Company.findAll({
			where: { state },
			attributes: ['id', 'companyName', 'logoPath', 'averageDeliveryPrice', 'supportedModes', 'availableDays', 'timeFrom', 'timeTo']
		});

		return res.status(200).json({ companies });
	} catch (error) {
		console.error("Fetch Companies Error:", error);
		return res.status(500).json({ error: 'Failed to fetch companies' });
	}
};
