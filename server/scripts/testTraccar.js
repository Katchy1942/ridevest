import dotenv from 'dotenv';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const traccarUrl = process.env.TRACCAR_URL;
const traccarUser = process.env.TRACCAR_USER;
const traccarPassword = process.env.TRACCAR_PASSWORD;

if (!traccarUrl || !traccarUser || !traccarPassword) {
   console.warn('Warning: Some environment variables are missing!');
}

async function testTraccar() {
	console.log('Testing Traccar connectivity...');
	console.log('URL:', traccarUrl);
	console.log('User:', traccarUser);

	try {
		const response = await axios.get(`${traccarUrl}/api/devices`, {
			auth: {
				username: traccarUser,
				password: traccarPassword
			}
		});
		console.log('Connection successful!');
		console.log('Devices count:', response.data.length);
	} catch (error) {
		console.error('Connection failed!');
		if (error.response) {
			console.error('Status:', error.response.status);
			console.error('Data:', error.response.data);
		} else {
			console.error('Error:', error.message);
		}
	}
}

testTraccar();
