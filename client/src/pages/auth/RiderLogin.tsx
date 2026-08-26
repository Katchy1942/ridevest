import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRiderLoginHandler } from "@/handlers/authHandlers";

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
				<label className="block text-sm font-medium text-zinc-300 mb-2">
					Mobile Number
				</label>
				<input
					type="tel"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					required
					disabled={isLoading}
					className="w-full px-4 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors"
					placeholder="070 0000 0000"
				/>
			</div>
			<div>
				<label className="block text-sm font-medium text-zinc-300 mb-2">
					Password
				</label>
				<div className="relative">
					<input
						type={showPassword ? "text" : "password"}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						disabled={isLoading}
						className="w-full pl-4 pr-12 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors"
						placeholder="••••••••"
					/>
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-400 hover:text-zinc-200 transition-colors focus:outline-none"
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
						className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-zinc-900 cursor-pointer"
					/>
					<label
						htmlFor="rider-remember-me"
						className="ml-2 block text-sm text-zinc-300 cursor-pointer"
					>
						Remember me
					</label>
				</div>
				<div className="text-sm">
					<a
						href="#"
						onClick={(e) => e.preventDefault()}
						className="font-medium text-emerald-600 text-sm hover:text-emerald-500 transition-colors"
					>
						Forgot password?
					</a>
				</div>
			</div>

			<button
				type="submit"
				disabled={isLoading}
				className="mt-2 w-full flex justify-center items-center bg-emerald-700 hover:bg-emerald-600 disabled:bg-emerald-800 disabled:text-emerald-300 disabled:cursor-not-allowed cursor-pointer text-sm text-black font-medium py-2 shadow-sm rounded-full tracking-tight transition-colors"
			>
				{isLoading ? (
					<>
						<Loader2 className="animate-spin mr-2" size={20} />
						<span>Logging in...</span>
					</>
				) : (
					<span className="flex items-center gap-1.5">
						Login<ArrowRight size={15} strokeWidth={1.5} />
					</span>
				)}
			</button>

			<div className="mt-2 text-center text-xs text-zinc-400">
				Don't have an account?{" "}
				<Link
					to="/register"
					className="font-medium text-emerald-600 hover:text-emerald-500 transition-colors"
				>
					Sign up
				</Link>
			</div>
		</form>
	);
};

export default RiderLogin;
