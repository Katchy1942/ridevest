import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, ArrowRight, Eye, EyeOff, Check, X } from "lucide-react";
import { ImageUpload } from "../../components/ui/ImageUpload";
import api from "@/lib/axios";

const RiderRegister = () => {
	const [formData, setFormData] = useState({
		fullName: "",
		phone: "",
		whatsappNumber: "",
		trackerId: "",
		password: "",
		confirmPassword: "",
		companyId: "",
	});
	const [companies, setCompanies] = useState<{ id: number; companyName: string }[]>([]);
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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
		if (!formData.password)
			return toast.error("Password is required");
		if (formData.password !== formData.confirmPassword)
			return toast.error("Passwords do not match");
		if (!profilePhoto)
			return toast.error("A profile photo is required");

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
			const errorMsg =
				error.response?.data?.error || "Failed to register rider";
			toast.error(errorMsg);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
			{/* Profile Photo */}
			<div>
				<label className="block text-sm font-medium text-zinc-300 mb-2">
					Profile Photo
				</label>
				<ImageUpload
					onImageSelect={setProfilePhoto}
					disabled={isLoading}
					variant="avatar"
				/>
			</div>

			{/* Company Dropdown */}
			<div>
				<label className="block text-sm font-medium text-zinc-300 mb-2">
					Select Company
				</label>
				<select
					name="companyId"
					value={formData.companyId}
					onChange={handleChange}
					disabled={isLoading || loadingCompanies}
					className="w-full px-4 py-2 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors disabled:opacity-50 cursor-pointer"
				>
					<option value="">
						{loadingCompanies ? "Loading companies..." : "-- Select an existing company --"}
					</option>
					{companies.map((company) => (
						<option key={company.id} value={company.id}>
							{company.companyName}
						</option>
					))}
				</select>
				<p className="text-xs text-zinc-500 mt-1.5">
					Select the existing logistics company you are registering under.
				</p>
			</div>

			{/* Full Name */}
			<div>
				<label className="block text-sm font-medium text-zinc-300 mb-2">
					Full Name
				</label>
				<input
					type="text"
					name="fullName"
					value={formData.fullName}
					onChange={handleChange}
					placeholder="John Doe"
					disabled={isLoading}
					className="w-full px-4 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors disabled:opacity-50"
				/>
			</div>
			{/* Phone + WhatsApp */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
				<div>
					<label className="block text-sm font-medium text-zinc-300 mb-2">
						Phone Number
					</label>
					<input
						type="tel"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						placeholder="070 0000 0000"
						disabled={isLoading}
						className="w-full px-4 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors disabled:opacity-50"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-zinc-300 mb-2">
						WhatsApp Number
					</label>
					<input
						type="tel"
						name="whatsappNumber"
						value={formData.whatsappNumber}
						onChange={handleChange}
						placeholder="070 0000 0000"
						disabled={isLoading}
						className="w-full px-4 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors disabled:opacity-50"
					/>
				</div>
			</div>
			{/* Tracker ID */}
			<div>
				<label className="block text-sm font-medium text-zinc-300 mb-2">
					Tracker ID
				</label>
				<input
					type="number"
					name="trackerId"
					value={formData.trackerId}
					onChange={handleChange}
					placeholder="Provided by your company"
					disabled={isLoading}
					className="w-full px-4 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors disabled:opacity-50"
				/>
				<p className="text-xs text-zinc-500 mt-1.5">
					Ask your company admin for your unique tracker ID.
				</p>
			</div>
			{/* Password */}
			<div>
				<label className="block text-sm font-medium text-zinc-300 mb-2">
					Password
				</label>
				<div className="relative">
					<input
						type={showPassword ? "text" : "password"}
						name="password"
						value={formData.password}
						onChange={handleChange}
						placeholder="••••••••"
						disabled={isLoading}
						className="w-full px-4 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors disabled:opacity-50 pr-10"
					/>
					<button
						type="button"
						onClick={() => setShowPassword((p) => !p)}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
					>
						{showPassword ? (
							<EyeOff size={16} strokeWidth={1.5} />
						) : (
							<Eye size={16} strokeWidth={1.5} />
						)}
					</button>
				</div>
			</div>

			{/* Confirm Password */}
			<div>
				<label className="block text-sm font-medium text-zinc-300 mb-2">
					Confirm Password
				</label>
				<div className="relative">
					<input
						type={showConfirmPassword ? "text" : "password"}
						name="confirmPassword"
						value={formData.confirmPassword}
						onChange={handleChange}
						placeholder="••••••••"
						disabled={isLoading}
						className="w-full px-4 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors disabled:opacity-50 pr-10"
					/>
					<button
						type="button"
						onClick={() => setShowConfirmPassword((p) => !p)}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
					>
						{showConfirmPassword ? (
							<EyeOff size={16} strokeWidth={1.5} />
						) : (
							<Eye size={16} strokeWidth={1.5} />
						)}
					</button>
				</div>
			</div>

			{/* Real-time Password Validation UI */}
			{(formData.password.length > 0 || formData.confirmPassword.length > 0) && (
				<div className="bg-zinc-900/80 p-4 rounded-lg border border-zinc-800 text-xs mt-1">
					<p className="font-medium text-zinc-300 mb-3 border-b border-zinc-800 pb-2">
						Password Requirements
					</p>
					<div className="grid grid-cols-1 gap-2.5">
						<div
							className={`flex items-center gap-2 transition-colors ${formData.password.length >= 6 ? "text-emerald-500" : "text-zinc-500"}`}
						>
							{formData.password.length >= 6 ? (
								<Check size={14} />
							) : (
								<X size={14} />
							)}
							<span>At least 6 characters long</span>
						</div>
						<div
							className={`flex items-center gap-2 transition-colors ${/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/.test(formData.password) ? "text-emerald-500" : "text-zinc-500"}`}
						>
							{/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/.test(formData.password) ? (
								<Check size={14} />
							) : (
								<X size={14} />
							)}
							<span>Alphanumeric (letters &amp; numbers only)</span>
						</div>
						<div
							className={`flex items-center gap-2 transition-colors ${formData.password.length > 0 && formData.password === formData.confirmPassword ? "text-emerald-500" : "text-zinc-500"}`}
						>
							{formData.password.length > 0 && formData.password === formData.confirmPassword ? (
								<Check size={14} />
							) : (
								<X size={14} />
							)}
							<span>Passwords match</span>
						</div>
					</div>
				</div>
			)}
			<button
				type="submit"
				disabled={isLoading}
				className="w-full py-2 px-4 mt-2 bg-emerald-600 hover:bg-emerald-500 text-black text-sm tracking-tight font-medium rounded-full shadow-sm transition-colors disabled:opacity-50 cursor-pointer flex justify-center items-center"
			>
				{isLoading ? (
					<>
						<Loader2 className="animate-spin mr-2" size={20} />
						<span>Registering...</span>
					</>
				) : (
					<span className="flex items-center gap-1.5">
						Register
						<ArrowRight size={15} strokeWidth={1.5} />
					</span>
				)}
			</button>
		</form>
	);
};
export default RiderRegister;