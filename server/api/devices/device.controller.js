import models from '../../core/models.index.js';
import { traccarRegisterDevice } from '../../core/traccar.service.js';

export const createDevice = async (req, res) => {
   try {
      const { name, uniqueId, linkedRiderId } = req.body;
      const companyId = req.company.id;

      if (!name || !uniqueId) {
         return res.status(400).json({ error: 'Name and Unique ID (IMEI) are required' });
      }

      const existingDevice = await models.Device.findOne({ where: { uniqueId } });
      if (existingDevice) {
         return res.status(409).json({ error: 'Device with this Unique ID already exists' });
      }

      const traccarDevice = await traccarRegisterDevice(name, uniqueId);

      const device = await models.Device.create({
         name,
         uniqueId,
         companyId,
         linkedRiderId: linkedRiderId || null,
         traccarId: traccarDevice.id
      });

      res.status(201).json(device);
   } catch (error) {
      console.error("Register Device Error:", error);
      
      const responseData = error.response?.data;
      let errorMessage = 'Internal Server Error during device registration';

      // Catch Traccar duplicate uniqueId error (looks like a long stack trace but contains the violation)
      if (typeof responseData === 'string' && responseData.includes('uniqueId') && responseData.includes('violation')) {
         errorMessage = 'This Device ID (IMEI) is already used by another company. Please use a unique one.';
      } else if (responseData?.error) {
         errorMessage = responseData.error;
      } else if (error.message) {
         errorMessage = error.message;
      }

      res.status(error.response?.status || 500).json({ error: errorMessage });
   }
};

export const getDevices = async (req, res) => {
   try {
      const devices = await models.Device.findAll({
         where: { companyId: req.company.id },
         include: [
            {
               model: models.Rider,
               as: 'rider',
               attributes: ['id', 'firstName', 'lastName', 'phoneNumber']
            }
         ],
         order: [['createdAt', 'DESC']]
      });
      res.status(200).json(devices);
   } catch (error) {
      console.error("Fetch Devices Error:", error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
};

export const deleteDevice = async (req, res) => {
   try {
      const { id } = req.params;
      const device = await models.Device.findOne({ where: { id, companyId: req.company.id } });
      
      if (!device) {
         return res.status(404).json({ error: 'Device not found' });
      }

      await device.destroy();
      res.status(200).json({ message: 'Device deleted successfully' });
   } catch (error) {
      console.error("Delete Device Error:", error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
};
