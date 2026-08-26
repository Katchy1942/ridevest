require("dotenv").config();

const sslOptions = {
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
};

module.exports = {
	development: {
		url: process.env.DATABASE_URL,
		dialect: "postgres",
		...sslOptions,
	},
	test: {
		url: process.env.DATABASE_URL,
		dialect: "postgres",
		...sslOptions,
	},
	production: {
		url: process.env.DATABASE_URL,
		dialect: "postgres",
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	},
};
