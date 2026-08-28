import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import models from "../../core/models.index.js";

export const loginCompany = async (req, res) => {
	const { email, password } = req.body;

	const company = await models.Company.findOne({ where: { email } });
	if (!company) {
		const err = new Error("Invalid email or password");
		err.statusCode = 401;
		throw err;
	}

	const isMatch = await bcrypt.compare(password, company.password);
	if (!isMatch) {
		const err = new Error("Invalid email or password");
		err.statusCode = 401;
		throw err;
	}

	const secret = process.env.JWT_SECRET;
	if (!secret) throw new Error("CRITICAL: JWT_SECRET is not defined.");

	const token = jwt.sign({ id: company.id, email: company.email }, secret, {
		expiresIn: "7d",
	});

	const companyData = company.toJSON();
	delete companyData.password;

	return res.status(200).json({
		message: "Login successful",
		token,
		company: companyData,
	});
};

export const loginRider = async (req, res) => {
	const { phone, password } = req.body;

	const rider = await models.Rider.findOne({ where: { phone } });
	if (!rider) {
		const err = new Error("Invalid mobile number or password");
		err.statusCode = 401;
		throw err;
	}

	const isMatch = await bcrypt.compare(password, rider.password);
	if (!isMatch) {
		const err = new Error("Invalid mobile number or password");
		err.statusCode = 401;
		throw err;
	}

	const secret = process.env.JWT_SECRET;
	if (!secret) throw new Error("CRITICAL: JWT_SECRET is not defined.");

	const token = jwt.sign(
		{ id: rider.id, phone: rider.phone, role: "rider" },
		secret,
		{
			expiresIn: "7d",
		},
	);

	const riderData = rider.toJSON();
	delete riderData.password;

	return res.status(200).json({
		message: "Login successful",
		token,
		rider: riderData,
	});
};
