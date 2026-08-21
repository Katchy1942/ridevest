import dotenv from "dotenv";
dotenv.config();
import models from "../../core/models.index.js";

export const createDelivery = async (req, res) => {
	const {
		courier,
		pickup,
		destination,
		receiverName,
		receiverPhone,
		senderName,
		senderPhone,
		weightEstimate,
		deliveryNotes,
		businessName,
		transportMode,
		trackingId,
	} = req.body;

	try {
		const company = await models.Company.findOne({
			where: { companyName: courier },
		});

		if (!company) {
			return res.status(404).json({ message: "Company not found" });
		}

		const delivery = await models.Delivery.create({
			companyId: company.id,
			trackingId,
			pickupLocation: pickup,
			dropoffLocation: destination,
			receiverName,
			receiverPhone,
			senderName,
			senderPhone,
			weightEstimate,
			description: deliveryNotes,
			businessName,
			vehicleType: transportMode,
			price: company.averageDeliveryPrice,
			status: "unassigned",
		});

		res.status(201).json(delivery);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const assignRiderToDelivery = async (req, res) => {
	try {
		const { id } = req.params;
		const { riderId } = req.body;

		if (!riderId) {
			return res.status(400).json({ error: "Rider ID is required" });
		}

		const delivery = await models.Delivery.findOne({
			where: { id, companyId: req.company.id },
		});

		if (!delivery) {
			return res.status(404).json({ error: "Delivery not found" });
		}

		const rider = await models.Rider.findOne({
			where: { id: riderId, companyId: req.company.id },
		});

		if (!rider) {
			return res.status(404).json({ error: "Rider not found" });
		}

		if (rider.status === "on_delivery") {
			return res
				.status(400)
				.json({ error: "Rider is already on a delivery" });
		}

		// Update delivery
		delivery.riderId = riderId;
		delivery.status = "In Transit";
		await delivery.save();

		// Update rider status
		rider.status = "on_delivery";
		await rider.save();

		res.status(200).json({
			message: "Rider assigned successfully",
			delivery,
		});
	} catch (error) {
		console.error("Assign Rider Error:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const getDeliveries = async (req, res) => {
	try {
		const deliveries = await models.Delivery.findAll({
			where: { companyId: req.company.id },
			include: [
				{
					model: models.Rider,
					as: "rider",
					attributes: ["id", "fullName", "phone", "profilePhoto", "status", "firstName", "lastName"],
				},
			],
			order: [["createdAt", "DESC"]],
		});

		res.status(200).json(deliveries);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getDeliveryByTrackingId = async (req, res) => {
	try {
		const { trackingId } = req.params;
		const delivery = await models.Delivery.findOne({
			where: { trackingId },
			include: [
				{
					model: models.Rider,
					as: "rider",
					attributes: ["id", "fullName", "phone", "profilePhoto", "status", "firstName", "lastName"],
				},
			],
		});

		if (!delivery) {
			return res.status(404).json({ error: "Delivery not found" });
		}

		res.status(200).json(delivery);
	} catch (error) {
		console.error("Tracking Error:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
