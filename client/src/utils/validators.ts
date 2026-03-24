export const validatePassword = (password: string) => {
	const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,}$/;
	
	if (password.length < 6) {
		return {
			isValid: false,
			message: "Password must be at least 6 characters long."
		};
	}
	
	if (!regex.test(password)) {
		return {
			isValid: false,
			message: "Password must be alphanumeric (contain at least one letter, one number, and no special characters)."
		};
	}

	return { isValid: true, message: "" };
};
