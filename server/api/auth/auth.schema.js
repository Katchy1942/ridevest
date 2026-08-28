import { z } from "zod";

export const loginCompanySchema = z.object({
	email: z
		.string()
		.email("Invalid email format")
		.max(255, "Email is too long"),
	password: z
		.string()
		.min(1, "Password is required")
		.max(100, "Password is too long"),
});

export const loginRiderSchema = z.object({
	phone: z
		.string()
		.min(1, "Mobile number is required")
		.max(20, "Mobile number is too long"),
	password: z
		.string()
		.min(1, "Password is required")
		.max(100, "Password is too long"),
});
