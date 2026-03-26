import dotenv from 'dotenv';
dotenv.config();
import models from '../../core/models.index.js';

const fetchPlaceCoordinates = async (placeId) => {
   const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
   
   try {
      const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': API_KEY,
            'X-Goog-FieldMask': 'location'
         }
      });

      const data = await response.json();
      const { latitude, longitude } = data.location;
      
      return { latitude, longitude };
   } catch (error) {
      console.error("Error fetching place details:", error);
   }
};

const calculateDistance = (coords1, coords2) => {
	const R = 6371; // Earth's radius in km
	const dLat = (coords2.latitude - coords1.latitude) * Math.PI / 180;
	const dLon = (coords2.longitude - coords1.longitude) * Math.PI / 180;
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(coords1.latitude * Math.PI / 180) * Math.cos(coords2.latitude * Math.PI / 180) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c;
};

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
      pickupPlaceId,
      destinationPlaceId,
      trackingId
	} = req.body;

   const pickupCoords = await fetchPlaceCoordinates(pickupPlaceId || pickup);
   const dropoffCoords = await fetchPlaceCoordinates(destinationPlaceId || destination);

   if (!pickupCoords || !dropoffCoords) {
      return res.status(400).json({ message: 'For accurate tracking, please select a landmark for pickup and dropoff' });
   }

   const distance = calculateDistance(pickupCoords, dropoffCoords);

	try {
		const company = await models.Company.findOne({
			where: { companyName: courier }
		});

		if (!company) {
			return res.status(404).json({ message: 'Company not found' });
		}

		const delivery = await models.Delivery.create({
			companyId: company.id,
			trackingId,
			pickupLocation: pickup,
			dropoffLocation: destination,
         pickupCoordinates: pickupCoords,
         dropoffCoordinates: dropoffCoords,
         distance,
			receiverName,
			receiverPhone,
			senderName,
			senderPhone,
			weightEstimate,
			description: deliveryNotes,
			businessName,
			vehicleType: transportMode,
			price: company.averageDeliveryPrice,
			status: 'unassigned'
		});

		res.status(201).json(delivery);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getDeliveries = async (req, res) => {
	try {
		const deliveries = await models.Delivery.findAll({
			where: { companyId: req.company.id },
			include: [
				{
					model: models.Rider,
					as: 'rider',
					attributes: ['firstName', 'lastName']
				}
			],
			order: [['createdAt', 'DESC']]
		});

		res.status(200).json(deliveries);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};