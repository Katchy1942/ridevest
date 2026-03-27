import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import models, { sequelize } from './core/models.index.js';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
	try {
		await sequelize.authenticate();
		console.log('Database connected successfully via Sequelize.');

		// Sync all models with the database
		// await sequelize.sync({ alter: true });

		app.listen(PORT, () => {
			console.log(`Server running on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.error('Unable to start server:', error);
		process.exit(1);
	}
}

startServer();
