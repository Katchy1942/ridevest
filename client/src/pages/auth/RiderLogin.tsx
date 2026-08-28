import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRiderLoginHandler } from "@/handlers/authHandlers";

const labelClass = `block mb-2
	text-sm font-medium
	text-zinc-300`;

const RiderLogin = () => {
	const {
		phone,
		setPhone,
		password,
		setPassword,
		showPassword,
		setShowPassword,
		isLoading,
		handleLogin,
	} = useRiderLoginHandler();

	return (
		<form onSubmit={handleLogin} className="flex flex-col gap-5">
			<div>
				<label className={labelClass}>Mobile Number</label>
				<input
					type="tel"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					required
					disabled={isLoading}
					className="w-full px-4 py-2
						bg-zinc-900 border border-zinc-700
						rounded-sm shadow-sm text-sm
						text-zinc-100 placeholder-zinc-500
						focus:outline-none focus:border-emerald-500
						transition-colors"
					placeholder="070 0000 0000"
				/>
			</div>
			<div>
				<label className={labelClass}>Password</label>
				<div className="relative">
					<input
						type={showPassword ? "text" : "password"}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						disabled={isLoading}
						className="w-full pl-4 pr-12 py-2
							bg-zinc-900 border border-zinc-700
							rounded-sm shadow-sm text-sm
							text-zinc-100 placeholder-zinc-500
							focus:outline-none focus:border-emerald-500
							transition-colors"
						placeholder="••••••••"
					/>
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="absolute right-4 top-1/2
							-translate-y-1/2
							text-zinc-400 hover:text-zinc-200
							transition-colors cursor-pointer
							focus:outline-none"
					>
						{showPassword ? (
							<EyeOff size={18} strokeWidth={1.5} />
						) : (
							<Eye size={18} strokeWidth={1.5} />
						)}
					</button>
				</div>
			</div>

			<div className="flex items-center justify-between mt-1">
				<div className="flex items-center">
					<input
						id="rider-remember-me"
						name="rider-remember-me"
						type="checkbox"
						className="w-3 h-3 rounded
							bg-zinc-900 border-zinc-700
							text-emerald-500
							focus:ring-emerald-500 focus:ring-offset-zinc-900
							cursor-pointer"
					/>
					<label
						htmlFor="rider-remember-me"
						className="block ml-1
							text-xs text-zinc-500
							cursor-pointer"
					>
						Remember me
					</label>
				</div>
				<div className="text-sm">
					<a
						href="#"
						onClick={(e) => e.preventDefault()}
						className="text-xs font-medium text-emerald-600
							hover:text-emerald-500 transition-colors"
					>
						Forgot password?
					</a>
				</div>
			</div>

			<button
				type="submit"
				disabled={isLoading}
				className="flex items-center justify-center w-full mt-2
					py-2 bg-emerald-700 rounded-full
					text-sm font-medium text-black
					shadow-sm tracking-tight
					hover:bg-emerald-600
					disabled:bg-emerald-800 disabled:text-emerald-300
					transition-colors cursor-pointer disabled:cursor-not-allowed"
			>
				{isLoading ? (
					<>
						<Loader2 className="mr-2 animate-spin" size={20} />
						<span>Logging in...</span>
					</>
				) : (
					<span className="flex items-center gap-1.5">
						Login
						<ArrowRight size={15} strokeWidth={1.5} />
					</span>
				)}
			</button>

			<div
				className="mt-2 text-center
					text-xs text-zinc-400"
			>
				Don't have an account?{" "}
				<Link
					to="/register"
					className="font-medium text-emerald-600
						hover:text-emerald-500 transition-colors"
				>
					Sign up
				</Link>
			</div>
		</form>
	);
};

export default RiderLogin;
