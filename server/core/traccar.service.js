import axios from 'axios';

const traccarApi = axios.create({
   baseURL: process.env.TRACCAR_URL + '/api',
   auth: {
      username: process.env.TRACCAR_USER || 'admin',
      password: process.env.TRACCAR_PASSWORD || 'admin'
   }
});

export const traccarCreateUser = async (name, email, password) => {
   try {
      const response = await traccarApi.post('/users', {
         name,
         email,
         password
      });
      return response.data;
   } catch (error) {
      console.error('Traccar User Creation Error:', error.response?.data || error.message);
      throw error;
   }
};

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
      console.error('Traccar Registration Error:', error.response?.data || error.message);
      throw error;
   }
};


export default traccarApi;
