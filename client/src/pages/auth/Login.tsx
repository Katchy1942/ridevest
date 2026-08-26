import { useState } from "react";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import RiderLogin from "./RiderLogin";
import { useCompanyLoginHandler } from "@/handlers/authHandlers";

const Login = () => {
	const [activeTab, setActiveTab] = useState<"company" | "rider">("company");
	const {
		email,
		setEmail,
		password,
		setPassword,
		showPassword,
		setShowPassword,
		isLoading,
		handleLogin,
	} = useCompanyLoginHandler();

	return (
		<div className="min-h-screen flex items-center justify-center p-4 md:p-10">
			<div className="bg-zinc-900 rounded-2xl border-5 border-zinc-800 w-full max-w-3xl flex p-3 gap-3">
				<div className="hidden md:flex w-[45%] shrink-0 relative bg-zinc-600 rounded-xl min-h-125 overflow-hidden">
					<div className="absolute inset-0 flex flex-col items-center justify-end p-4">
						<p className="text-white/80 text-xs text-left leading-tight tracking-tight">
							Manage your entire dispatch operations from one place.
						</p>
					</div>
				</div>

				<div className="flex-1 py-6 px-4 md:px-6">
					<div className="w-full">
						<h2 className="text-xl font-semibold tracking-tighter mb-6 flex justify-center text-zinc-100">
							Login to your account.
						</h2>

						{/* Type switcher */}
						<div className="flex items-center bg-zinc-800 rounded-full p-1 mb-6">
							<button
								type="button"
								onClick={() => setActiveTab("company")}
								className={`flex-1 py-1.5 text-sm font-medium rounded-full transition-all tracking-tight cursor-pointer ${
									activeTab === "company"
										? "bg-zinc-900 text-zinc-100 shadow-sm"
										: "text-zinc-400 hover:text-zinc-300"
								}`}
							>
								Company
							</button>
							<button
								type="button"
								onClick={() => setActiveTab("rider")}
								className={`flex-1 py-1.5 text-sm font-medium rounded-full transition-all tracking-tight cursor-pointer ${
									activeTab === "rider"
										? "bg-zinc-900 text-zinc-100 shadow-sm"
										: "text-zinc-400 hover:text-zinc-300"
								}`}
							>
								Rider
							</button>
						</div>

						{activeTab === "rider" ? (
							<RiderLogin />
						) : (
							<form
								onSubmit={handleLogin}
								className="flex flex-col gap-5"
							>
								<div>
									<label className="block text-sm font-medium text-zinc-300 mb-2">
										Email Address
									</label>
									<input
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
										disabled={isLoading}
										className="w-full px-4 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors"
										placeholder="kratosmbadiwe@gmail.com"
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
											id="remember-me"
											name="remember-me"
											type="checkbox"
											className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-zinc-900 cursor-pointer"
										/>
										<label
											htmlFor="remember-me"
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
											<Loader2
												className="animate-spin mr-2"
												size={20}
											/>
											<span className="">Logging in...</span>
										</>
									) : (
										<span className="flex items-center gap-1.5">
											Login
											<ArrowRight size={15} strokeWidth={1.5} />
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
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
