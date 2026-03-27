import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';

const traccarApi = axios.create({
   baseURL: process.env.TRACCAR_URL + '/api',
   auth: {
      username: process.env.TRACCAR_USER,
      password: process.env.TRACCAR_PASSWORD
   }
});

export const traccarRegisterDevice = async (name, uniqueId, userId) => {
   try {
      const response = await traccarApi.post('/devices', {
         name,
         uniqueId
      });
      const device = response.data;

      if (userId) {
         await traccarApi.post('/permissions', {
            userId: userId,
            deviceId: device.id
         });
      }

      return device;
   } catch (error) {
      console.error('Traccar Registration Error Detail:', {
         status: error.response?.status,
         data: error.response?.data,
         message: error.message,
         url: error.config?.url
      });
      throw error;
   }
};


export default traccarApi;
