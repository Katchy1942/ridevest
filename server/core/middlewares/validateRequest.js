export const validateRequest = (schema) => {
	return async (req, res, next) => {
		try {
			await schema.parseAsync(req.body);
			next();
		} catch (error) {
			next(error); // Passes the ZodError to the central error handler
		}
	};
};
