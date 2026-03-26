import models from '../../core/models.index.js';
import { traccarRegisterDevice } from '../../core/traccar.service.js';

export const createDevice = async (req, res) => {
   try {
      const { name, uniqueId } = req.body;
      const companyId = req.company.id;
      const companyTraccarId = req.company.traccarId;

      if (!name || !uniqueId) {
         return res.status(400).json({ error: 'Name and Unique ID (IMEI) are required' });
      }

      // Check if device already exists in our system
      const existingDevice = await models.Device.findOne({ where: { uniqueId } });
      if (existingDevice) {
         return res.status(409).json({ error: 'Device already registered' });
      }

      // 1. Register with Traccar
      let traccarId = null;
      try {
         const tDevice = await traccarRegisterDevice(name, uniqueId, companyTraccarId);
         traccarId = tDevice.id;
      } catch (error) {
         console.warn("Continuing despite Traccar registration failure:", error.message);
      }

      // 2. Save in our DB
      const device = await models.Device.create({
         name,
         uniqueId,
         companyId,
         traccarId
      });


      res.status(201).json(device);
   } catch (error) {
      console.error("Register Device Error:", error);
      res.status(500).json({ error: 'Internal Server Error during device registration' });
   }
};

export const getDevices = async (req, res) => {
   try {
      const devices = await models.Device.findAll({
         where: { companyId: req.company.id },
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
