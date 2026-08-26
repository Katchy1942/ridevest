import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "@/lib/axios";
import { validatePassword } from "@/utils/validators";

const getErrorMessage = (err: any, fallback: string): string => {
	const data = err?.response?.data;
	if (!data) return fallback;
	const raw = data.error ?? data.message ?? data;
	if (typeof raw === "string") return raw;
	if (typeof raw === "object" && raw !== null) {
		return String(raw.message ?? raw.code ?? fallback);
	}
	return fallback;
};

export const useCompanyLoginHandler = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const response = await api.post("/auth/login", { email, password });
			const { token, company } = response.data;

			localStorage.setItem("token", token);
			localStorage.setItem("company", JSON.stringify(company));
			localStorage.setItem("userRole", "company");

			toast.success("Successfully logged in!");
			setTimeout(() => {
				navigate("/dashboard");
			}, 1000);
		} catch (err: any) {
			toast.error(
				getErrorMessage(err, "Login failed. Check your credentials."),
			);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		email,
		setEmail,
		password,
		setPassword,
		showPassword,
		setShowPassword,
		isLoading,
		handleLogin,
	};
};

export const useRiderLoginHandler = () => {
	const navigate = useNavigate();
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!phone.trim()) return toast.error("Mobile number is required");
		if (!password) return toast.error("Password is required");

		setIsLoading(true);

		try {
			const response = await api.post("/riders/login", { phone, password });
			const { token, rider } = response.data;

			localStorage.setItem("token", token);
			localStorage.setItem("rider", JSON.stringify(rider));
			localStorage.setItem("userRole", "rider");

			toast.success("Successfully logged in!");
			setTimeout(() => {
				navigate("/dashboard/riders");
			}, 1000);
		} catch (err: any) {
			console.error(err);
			toast.error(
				getErrorMessage(err, "Login failed. Check your credentials."),
			);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		phone,
		setPhone,
		password,
		setPassword,
		showPassword,
		setShowPassword,
		isLoading,
		handleLogin,
	};
};

const companyRegisterInitial = {
	companyName: "",
	whatsappNumber: "",
	mobileNumber: "",
	email: "",
	address: "",
	state: "",
	availableDays: [] as string[],
	timeFrom: "",
	timeTo: "",
	averageDeliveryPrice: "",
	supportedModes: [] as string[],
	password: "",
	confirmPassword: "",
};

export const useCompanyRegisterHandler = () => {
	const [formData, setFormData] = useState(companyRegisterInitial);
	const [logo, setLogo] = useState<File | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const toggleMode = (mode: string) => {
		setFormData((prev) => ({
			...prev,
			supportedModes: prev.supportedModes.includes(mode)
				? prev.supportedModes.filter((m) => m !== mode)
				: [...prev.supportedModes, mode],
		}));
	};

	const toggleDay = (day: string) => {
		setFormData((prev) => ({
			...prev,
			availableDays: prev.availableDays.includes(day)
				? prev.availableDays.filter((d) => d !== day)
				: [...prev.availableDays, day],
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.companyName.trim())
			return toast.error("Company name is required");
		if (!formData.whatsappNumber.trim())
			return toast.error("WhatsApp number is required");
		if (!formData.mobileNumber.trim())
			return toast.error("Mobile number is required");
		if (!formData.email.trim())
			return toast.error("Email address is required");
		if (!formData.state) return toast.error("Please select a state");
		if (!formData.address.trim())
			return toast.error("Company address is required");
		if (formData.availableDays.length === 0)
			return toast.error("Please select at least one operating day");
		if (!formData.timeFrom) return toast.error("Opening time is required");
		if (!formData.timeTo) return toast.error("Closing time is required");
		if (!formData.averageDeliveryPrice)
			return toast.error("Average delivery price is required");
		if (formData.supportedModes.length === 0)
			return toast.error("Please select at least one transport mode");
		if (!logo) return toast.error("A company logo is required");

		const pwdValidation = validatePassword(formData.password);
		if (!pwdValidation.isValid) return toast.error(pwdValidation.message);

		if (formData.password !== formData.confirmPassword)
			return toast.error("Passwords do not match");

		setIsLoading(true);

		try {
			const submitData = new FormData();

			Object.entries(formData).forEach(([key, value]) => {
				if (Array.isArray(value)) {
					value.forEach((item) => submitData.append(key, item));
				} else {
					submitData.append(key, value as string);
				}
			});

			submitData.append("logo", logo);

			const response = await api.post("/companies/register", submitData);
			toast.success(response.data.message || "Registration successful!");

			setTimeout(() => {
				window.location.href = "/login";
			}, 1500);
		} catch (error: any) {
			console.error(error);
			toast.error(getErrorMessage(error, "Failed to register company"));
		} finally {
			setIsLoading(false);
		}
	};

	return {
		formData,
		setFormData,
		logo,
		setLogo,
		isLoading,
		showPassword,
		setShowPassword,
		showConfirmPassword,
		setShowConfirmPassword,
		handleChange,
		toggleMode,
		toggleDay,
		handleSubmit,
	};
};

const riderRegisterInitial = {
	fullName: "",
	phone: "",
	whatsappNumber: "",
	trackerId: "",
	password: "",
	confirmPassword: "",
	companyId: "",
};

export const useRiderRegisterHandler = () => {
	const [formData, setFormData] = useState(riderRegisterInitial);
	const [companies, setCompanies] = useState<
		{ id: number; companyName: string }[]
	>([]);
	const [loadingCompanies, setLoadingCompanies] = useState(false);
	const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	useEffect(() => {
		const fetchCompanies = async () => {
			setLoadingCompanies(true);
			try {
				const response = await api.get("/companies/all");
				setCompanies(response.data.companies || []);
			} catch (error) {
				console.error("Error fetching companies:", error);
				toast.error("Failed to load companies");
			} finally {
				setLoadingCompanies(false);
			}
		};
		fetchCompanies();
	}, []);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.companyId)
			return toast.error("Please select a company to join");
		if (!formData.fullName.trim())
			return toast.error("Full name is required");
		if (!formData.phone.trim())
			return toast.error("Phone number is required");
		if (!formData.whatsappNumber.trim())
			return toast.error("WhatsApp number is required");
		if (!formData.trackerId.trim())
			return toast.error("Tracker ID is required");
		if (!formData.password) return toast.error("Password is required");
		if (formData.password !== formData.confirmPassword)
			return toast.error("Passwords do not match");
		if (!profilePhoto) return toast.error("A profile photo is required");

		setIsLoading(true);
		try {
			const submitData = new FormData();
			submitData.append("companyId", formData.companyId);
			submitData.append("fullName", formData.fullName);
			submitData.append("phone", formData.phone);
			submitData.append("whatsappNumber", formData.whatsappNumber);
			submitData.append("trackerId", formData.trackerId);
			submitData.append("password", formData.password);
			submitData.append("profilePhoto", profilePhoto);

			const response = await api.post("/riders/register", submitData);
			toast.success(response.data.message || "Registration successful!");

			setTimeout(() => {
				window.location.href = "/login";
			}, 1500);
		} catch (error: any) {
			console.error(error);
			toast.error(getErrorMessage(error, "Failed to register rider"));
		} finally {
			setIsLoading(false);
		}
	};

	return {
		formData,
		setFormData,
		companies,
		loadingCompanies,
		profilePhoto,
		setProfilePhoto,
		isLoading,
		showPassword,
		setShowPassword,
		showConfirmPassword,
		setShowConfirmPassword,
		handleChange,
		handleSubmit,
	};
};
