import express, { json } from 'express';
import cors from 'cors';
import companyRoutes from './api/companies/company.routes.js';
import authRoutes from './api/auth/auth.routes.js';
import deliveryRoutes from './api/deliveries/delivery.routes.js';

const app = express();

app.use(cors());
app.use(json());
app.use('/uploads', express.static('uploads'));

app.use('/api/companies', companyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/deliveries', deliveryRoutes);

app.get('/health', (req, res) => {
	res.status(200).json({ status: 'OK' });
});

export default app;
