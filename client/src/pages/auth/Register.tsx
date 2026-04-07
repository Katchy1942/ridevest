import { useState } from 'react';
import { toast } from 'sonner';
import { ImageUpload } from '../../components/ui/ImageUpload';
import api from '@/lib/axios';
import { Loader2, Bike, Clock, Eye, EyeOff, Check, X } from 'lucide-react';
import { validatePassword } from '@/utils/validators';
import { HugeiconsIcon } from '@hugeicons/react';
import { Car02Icon, TruckIcon } from '@hugeicons/core-free-icons';
import {
	Combobox,
	ComboboxInput,
	ComboboxContent,
	ComboboxList,
	ComboboxItem,
} from '../../components/ui/combobox';

const nigerianStates = [
	'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Federal Capital Territory', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Register = () => {
	const [formData, setFormData] = useState({
		companyName: '',
		whatsappNumber: '',
		mobileNumber: '',
		email: '',
		address: '',
		state: '',
		availableDays: [] as string[],
		timeFrom: '',
		timeTo: '',
		averageDeliveryPrice: '',
		supportedModes: [] as string[],
		password: '',
		confirmPassword: ''
	});
	const [logo, setLogo] = useState<File | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const toggleMode = (mode: string) => {
		setFormData(prev => ({
			...prev,
			supportedModes: prev.supportedModes.includes(mode) 
				? prev.supportedModes.filter(m => m !== mode)
				: [...prev.supportedModes, mode]
		}));
	};

	const toggleDay = (day: string) => {
		setFormData(prev => ({
			...prev,
			availableDays: prev.availableDays.includes(day)
				? prev.availableDays.filter(d => d !== day)
				: [...prev.availableDays, day]
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.companyName.trim()) return toast.error("Company name is required");
		if (!formData.whatsappNumber.trim()) return toast.error("WhatsApp number is required");
		if (!formData.mobileNumber.trim()) return toast.error("Mobile number is required");
		if (!formData.email.trim()) return toast.error("Email address is required");
		if (!formData.state) return toast.error("Please select a state");
		if (!formData.address.trim()) return toast.error("Company address is required");
		if (formData.availableDays.length === 0) return toast.error("Please select at least one operating day");
		if (!formData.timeFrom) return toast.error("Opening time is required");
		if (!formData.timeTo) return toast.error("Closing time is required");
		if (!formData.averageDeliveryPrice) return toast.error("Average delivery price is required");
		if (formData.supportedModes.length === 0) return toast.error("Please select at least one transport mode");
		if (!logo) return toast.error("A company logo is required");

		const pwdValidation = validatePassword(formData.password);
		if (!pwdValidation.isValid) return toast.error(pwdValidation.message);

		if (formData.password !== formData.confirmPassword) {
			return toast.error("Passwords do not match");
		}

		setIsLoading(true);
		
		try {
			const submitData = new FormData();
			
			Object.entries(formData).forEach(([key, value]) => {
				if (Array.isArray(value)) {
					value.forEach(item => submitData.append(key, item));
				} else {
					submitData.append(key, value as string);
				}
			});
			
			submitData.append('logo', logo);
			
			const logData: any = {};
			submitData.forEach((value, key) => {
				if (logData[key]) {
					if (!Array.isArray(logData[key])) logData[key] = [logData[key]];
					logData[key].push(value);
				} else {
					logData[key] = value;
				}
			});
			console.log(logData);
			
			const response = await api.post('/companies/register', submitData);
			
			toast.success(response.data.message || 'Registration successful!');
			
			setTimeout(() => {
				window.location.href = '/login';
			}, 1500);
			
		} catch (error: any) {
			console.error(error);
			const errorMsg = error.response?.data?.error || 'Failed to register company';
			toast.error(errorMsg);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='min-h-screen flex flex-col justify-center items-center md:p-10 p-4'>
			<div className='bg-zinc-900 p-6 rounded-xl shadow-sm w-full border border-zinc-800 max-w-md md:max-w-xl'>
				<h2 className='text-2xl font-semibold mb-8 flex justify-center text-zinc-100'>Register Your Company</h2>
				<form className='flex flex-col gap-5' onSubmit={handleSubmit} noValidate>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
						<div className="md:col-span-2">
							<label className="block text-sm font-medium text-zinc-300 mb-2">Company Name</label>
							<input 
								type="text"
								name="companyName"
								value={formData.companyName} 
								onChange={handleChange} 
								required 
								disabled={isLoading}
								className="w-full px-4 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors"
								placeholder="GIRA Logistics Ltd"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-zinc-300 mb-2">WhatsApp Number</label>
							<input 
								type="tel"
								name="whatsappNumber"
								value={formData.whatsappNumber} 
								onChange={handleChange} 
								required 
								disabled={isLoading}
								className="w-full px-4 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors"
								placeholder="+1 234 567 8900"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-zinc-300 mb-2">Mobile Number</label>
							<input 
								type="tel"
								name="mobileNumber"
								value={formData.mobileNumber} 
								onChange={handleChange} 
								required 
								disabled={isLoading}
								className="w-full px-4 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors"
								placeholder="+1 234 567 8900"
							/>
						</div>

						<div className="md:col-span-2">
							<label className="block text-sm font-medium text-zinc-300 mb-2">Email Address</label>
							<input 
								type="email"
								name="email"
								value={formData.email} 
								onChange={handleChange} 
								required 
								disabled={isLoading}
								className="w-full px-4 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors"
								placeholder="contact@company.com"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-zinc-300 mb-2">State / Region</label>
							<Combobox value={formData.state} onValueChange={(val: string | null) => val && setFormData(prev => ({ ...prev, state: val }))}>
								<ComboboxInput 
									placeholder="Select a Nigerian state" 
									className="w-full px-4 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors" 
								/>
								<ComboboxContent className="bg-zinc-900 border-zinc-800 text-zinc-200">
									<ComboboxList>
										{nigerianStates.map(state => (
											<ComboboxItem key={state} value={state} className="flex justify-between w-full hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer">
												<span>{state}</span>
											</ComboboxItem>
										))}
									</ComboboxList>
								</ComboboxContent>
							</Combobox>
						</div>

						<div>
							<label className="block text-sm font-medium text-zinc-300 mb-2">Price Per Delivery</label>
							<input className="w-full px-4 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors" type="number" name="averageDeliveryPrice" value={formData.averageDeliveryPrice} onChange={handleChange} required disabled={isLoading} placeholder="2000" />
						</div>

						<div className="md:col-span-2">
							<label className="block text-sm font-medium text-zinc-300 mb-2">Address</label>
							<textarea 
								name="address"
								value={formData.address} 
								onChange={handleChange} 
								required 
								disabled={isLoading}
								rows={2}
								className="w-full px-4 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors"
								placeholder="123 Logistics Way..."
							/>
						</div>

						<div className="md:col-span-2 space-y-4 pt-1">
							<label className="text-sm font-medium text-zinc-300">Operating Hours & Days</label>
							<div className="space-y-4 p-5 border border-zinc-700 rounded-lg bg-zinc-900/50 shadow-sm">
								<div className="flex flex-wrap gap-2">
									{daysOfWeek.map(day => (
										<div
											key={day}
											onClick={() => toggleDay(day)}
											className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors select-none ${
												formData.availableDays.includes(day)
												? 'bg-emerald-600/90 text-white shadow-sm'
												: 'bg-zinc-800 text-zinc-400 border border-zinc-700/50 hover:bg-zinc-700 hover:text-zinc-200'
											}`}
										>
											{day}
										</div>
									))}
								</div>
								
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-1.5">
										<label className="text-xs text-zinc-400 flex items-center gap-1.5">
											<Clock size={14} /> Opens From
										</label>
										<input 
											type="time" 
											name="timeFrom"
											value={formData.timeFrom}
											onChange={handleChange}
											className="w-full px-3 py-1.5 text-sm bg-zinc-800 border border-zinc-700 rounded-md shadow-sm focus:border-emerald-500 focus:outline-none text-zinc-100 placeholder-zinc-500"
										/>
									</div>
									<div className="space-y-1.5">
										<label className="text-xs text-zinc-400 flex items-center gap-1.5">
											<Clock size={14} /> Closes At
										</label>
										<input 
											type="time" 
											name="timeTo"
											value={formData.timeTo}
											onChange={handleChange}
											className="w-full px-3 py-1.5 text-sm bg-zinc-800 border border-zinc-700 rounded-md shadow-sm focus:border-emerald-500 focus:outline-none text-zinc-100 placeholder-zinc-500"
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="md:col-span-2 space-y-2 pt-1">
							<label className="block text-sm font-medium text-zinc-300">Supported Modes of Transport</label>
							<div className="grid grid-cols-3 gap-3">
								{[
									{ id: 'bike', label: 'Bike', Icon: Bike },
									{ id: 'car', label: 'Car', Icon: Car02Icon, isHuge: true },
									{ id: 'truck', label: 'Truck', Icon: TruckIcon, isHuge: true }
								].map(({ id, label, Icon, isHuge }) => {
									const RenderIcon = Icon as any;
									return (
									<div 
										key={id}
										onClick={() => toggleMode(id)}
										className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all cursor-pointer select-none ${
											formData.supportedModes.includes(id) 
											? 'bg-emerald-900/20 border-emerald-500 text-emerald-400 shadow-sm' 
											: 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:bg-zinc-800'
										}`}
									>
										{isHuge ? (
											<HugeiconsIcon icon={Icon as any} strokeWidth={1.5} size={22} className="mb-2" />
										) : (
											<RenderIcon strokeWidth={1.5} size={22} className="mb-2" />
										)}
										<span className="text-xs font-medium">{label}</span>
									</div>
								)})}
							</div>
						</div>

						<div className="md:col-span-2 mt-2">
							<label className="block text-sm font-medium text-zinc-300 mb-2">Company Logo</label>
							<ImageUpload 
								onImageSelect={setLogo} 
								disabled={isLoading} 
							/>
						</div>

						<div className="md:col-span-2 pt-5 border-t border-zinc-800/80 mt-2">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
								<div>
									<label className="block text-sm font-medium text-zinc-300 mb-2">Password</label>
									<div className="relative">
										<input 
											type={showPassword ? "text" : "password"}
											name="password"
											value={formData.password} 
											onChange={handleChange} 
											disabled={isLoading}
											className="w-full px-4 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors pr-10"
											placeholder="••••••••"
										/>
										<button 
											type="button" 
											onClick={() => setShowPassword(!showPassword)} 
											className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-300 transition-colors"
										>
											{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
										</button>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-zinc-300 mb-2">Confirm Password</label>
									<div className="relative">
										<input 
											type={showConfirmPassword ? "text" : "password"}
											name="confirmPassword"
											value={formData.confirmPassword} 
											onChange={handleChange} 
											disabled={isLoading}
											className="w-full px-4 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors pr-10"
											placeholder="••••••••"
										/>
										<button 
											type="button" 
											onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
											className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-300 transition-colors"
										>
											{showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
										</button>
									</div>
								</div>

								{/* Real-time Password Validation UI */}
								{(formData.password.length > 0 || formData.confirmPassword.length > 0) && (
									<div className="md:col-span-2 bg-zinc-900/80 p-4 rounded-lg border border-zinc-800 text-xs mt-1">
										<p className="font-medium text-zinc-300 mb-3 border-b border-zinc-800 pb-2">Password Requirements</p>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
											<div className={`flex items-center gap-2 transition-colors ${formData.password.length >= 6 ? 'text-emerald-500' : 'text-zinc-500'}`}>
												{formData.password.length >= 6 ? <Check size={14} /> : <X size={14} />}
												<span>At least 6 characters long</span>
											</div>
											<div className={`flex items-center gap-2 transition-colors ${/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/.test(formData.password) ? 'text-emerald-500' : 'text-zinc-500'}`}>
												{/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/.test(formData.password) ? <Check size={14} /> : <X size={14} />}
												<span>Alphanumeric (letters & numbers only)</span>
											</div>
											<div className={`flex items-center gap-2 transition-colors ${(formData.password.length > 0 && formData.password === formData.confirmPassword) ? 'text-emerald-500' : 'text-zinc-500'}`}>
												{(formData.password.length > 0 && formData.password === formData.confirmPassword) ? <Check size={14} /> : <X size={14} />}
												<span>Passwords match</span>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>

					<button 
						type="submit" 
						disabled={isLoading}
						className="w-full py-2 px-4 mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-md shadow-sm transition-colors disabled:opacity-50 cursor-pointer flex justify-center items-center"
					>
						{isLoading ? (
							<>
								<Loader2 className="animate-spin mr-2" size={20} />
								<span className='text-zinc-100'>Registering...</span>
							</>
						) : (
							<span className='text-zinc-100'>Register Company</span>
						)}
					</button>
				</form>
				<div className="mt-6 text-center text-sm text-zinc-400">
					Already have an account?{' '}
					<a href="/login" className="font-medium text-emerald-600 hover:text-emerald-500 transition-colors">
						Sign in
					</a>
				</div>
			</div>
		</div>
	)
}

export default Register