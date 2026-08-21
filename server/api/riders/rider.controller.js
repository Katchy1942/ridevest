import bcrypt from 'bcryptjs';
import models, { sequelize } from "../../core/models.index.js";

export const registerRider = async (req, res) => {
	try {
		const { fullName, phone, whatsappNumber, trackerId, password, companyId } = req.body;

		if (!fullName || !phone || !whatsappNumber || !trackerId || !password || !companyId) {
			return res.status(400).json({ error: "All fields are required" });
		}

		// Ensure company exists
		const company = await models.Company.findByPk(companyId);
		if (!company) {
			return res.status(404).json({ error: "Selected company does not exist" });
		}

		const existingRider = await models.Rider.findOne({
			where: { phone },
		});
		if (existingRider) {
			return res
				.status(409)
				.json({ error: "Rider with this phone number already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const profilePhoto = req.file ? req.file.path.replace(/\\/g, '/') : null;

		const rider = await models.Rider.create({
			fullName,
			phone,
			whatsappNumber,
			trackerId,
			password: hashedPassword,
			profilePhoto,
			companyId: parseInt(companyId, 10),
			status: 'offline',
		});

		const riderData = rider.toJSON();
		delete riderData.password;

		res.status(201).json({ message: "Rider registered successfully", rider: riderData });
	} catch (error) {
		console.error("Register Rider Error:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const createRider = async (req, res) => {
	try {
		const { fullName, firstName, lastName, phone, phoneNumber, whatsappNumber, trackerId, password, companyId: bodyCompanyId } = req.body;
		const companyId = req.company?.id || bodyCompanyId;

		const finalName = fullName || `${firstName || ''} ${lastName || ''}`.trim();
		const finalPhone = phone || phoneNumber;

		if (!finalName || !finalPhone || !companyId) {
			return res.status(400).json({ error: "Name, phone number, and company are required" });
		}

		const company = await models.Company.findByPk(companyId);
		if (!company) {
			return res.status(404).json({ error: "Selected company does not exist" });
		}

		const existingRider = await models.Rider.findOne({
			where: { phone: finalPhone },
		});
		if (existingRider) {
			return res
				.status(409)
				.json({ error: "Rider with this phone number already exists" });
		}

		const hashedPassword = password ? await bcrypt.hash(password, 10) : await bcrypt.hash('123456', 10);
		const profilePhoto = req.file ? req.file.path.replace(/\\/g, '/') : null;

		const rider = await models.Rider.create({
			fullName: finalName,
			phone: finalPhone,
			whatsappNumber: whatsappNumber || finalPhone,
			trackerId: trackerId || '',
			password: hashedPassword,
			profilePhoto,
			companyId: parseInt(companyId, 10),
			status: 'offline',
		});

		const riderData = rider.toJSON();
		delete riderData.password;

		res.status(201).json(riderData);
	} catch (error) {
		console.error("Create Rider Error:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const getRiders = async (req, res) => {
	try {
		const riders = await models.Rider.findAll({
			where: { companyId: req.company.id },
			attributes: {
				include: [
					[
						sequelize.literal(
							`(SELECT COUNT(*) FROM "Deliveries" WHERE "Deliveries"."riderId" = "Rider"."id")`
						),
						"deliveryCount",
					],
				],
			},
			order: [["createdAt", "DESC"]],
		});
		res.status(200).json(riders);
	} catch (error) {
		console.error("Fetch Riders Error:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const updateRiderStatus = async (req, res) => {
	try {
		const { id } = req.params;
		const { status } = req.body;

		const rider = await models.Rider.findOne({
			where: { id, companyId: req.company.id },
		});

		if (!rider) {
			return res.status(404).json({ error: "Rider not found" });
		}

		if (!["online", "offline", "on_delivery"].includes(status)) {
			return res.status(400).json({ error: "Invalid status" });
		}

		rider.status = status;
		await rider.save();

		res.status(200).json(rider);
	} catch (error) {
		console.error("Update Rider Status Error:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const deleteRider = async (req, res) => {
	try {
		const { id } = req.params;

		const rider = await models.Rider.findOne({
			where: { id, companyId: req.company.id },
		});

		if (!rider) {
			return res.status(404).json({ error: "Rider not found" });
		}

		await rider.destroy();
		res.status(200).json({ message: "Rider removed successfully" });
	} catch (error) {
		console.error("Delete Rider Error:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
