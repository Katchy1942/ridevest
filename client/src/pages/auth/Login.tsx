import { useState } from "react";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import RiderLogin from "./RiderLogin";
import { useCompanyLoginHandler } from "@/handlers/authHandlers";
import riderImg from "@/assets/images/rider.png";

const tabButtonBaseClass = `flex-1 py-1.5 rounded-full
	text-sm font-medium tracking-tight
	transition-all cursor-pointer`;

const labelClass = `block mb-2
	text-sm font-medium
	text-zinc-300`;

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
		<div className="flex min-h-screen">
			<div
				className="relative hidden md:flex
					w-1/2 bg-zinc-600"
			>
				<img
					src={riderImg}
					alt="Delivery Rider"
					className="absolute inset-0 w-full h-full
						object-cover"
				/>
				<div
					className="absolute inset-0 flex flex-col
						items-start justify-end p-8 md:p-16"
				>
					<div className="w-full max-w-lg">
						<p
							className="text-left text-8xl font-extralight
								tracking-[-0.07em] leading-tight
								text-white/60"
						>
							Fast, Secure, Reliable.
						</p>
					</div>
				</div>
			</div>

			<div
				className="flex items-center justify-center
					w-full md:w-1/2 px-0 py-8 pt-24 md:p-10 md:pt-28"
			>
				<div
					className="w-full max-w-md p-6 md:p-8
						rounded-none md:rounded-3xl
						border-0 md:border-4 border-zinc-800"
				>
					<div className="w-full">
						<h2
							className="flex justify-center mb-6
								text-xl font-semibold tracking-tighter
								text-zinc-100"
						>
							Login to your account
						</h2>

						<div
							className="flex items-center mb-6
								p-1 bg-zinc-800
								rounded-full"
						>
							<button
								type="button"
								onClick={() => setActiveTab("company")}
								className={`${tabButtonBaseClass}
									${activeTab === "company" ? "bg-zinc-900 text-zinc-100 shadow-sm" : "text-zinc-400 hover:text-zinc-300"}`}
							>
								Company
							</button>
							<button
								type="button"
								onClick={() => setActiveTab("rider")}
								className={`${tabButtonBaseClass}
									${activeTab === "rider" ? "bg-zinc-900 text-zinc-100 shadow-sm" : "text-zinc-400 hover:text-zinc-300"}`}
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
									<label className={labelClass}>Email Address</label>
									<input
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
										disabled={isLoading}
										className="w-full px-4 py-3 sm:py-2
											bg-zinc-900 border border-zinc-700
											rounded-sm shadow-sm text-sm
											text-zinc-100 placeholder-zinc-500
											focus:outline-none focus:border-emerald-500
											transition-colors"
										placeholder="kratosmbadiwe@gmail.com"
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
											placeholder="••••••••"
											disabled={isLoading}
											className="w-full pl-4 pr-12 py-3 sm:py-2
												bg-zinc-900 border border-zinc-700
												rounded-sm shadow-sm text-sm
												text-zinc-100 placeholder-zinc-500
												focus:outline-none focus:border-emerald-500
												transition-colors"
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
											id="remember-me"
											name="remember-me"
											type="checkbox"
											className="w-3 h-3 rounded
												bg-zinc-900 border-zinc-700
												text-emerald-500
												focus:ring-emerald-500 focus:ring-offset-zinc-900
												cursor-pointer"
										/>
										<label
											htmlFor="remember-me"
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
										py-3 bg-emerald-700 rounded-full
										text-sm font-medium text-black
										shadow-sm tracking-tight
										hover:bg-emerald-600
										disabled:bg-emerald-800 disabled:text-emerald-300
										transition-colors cursor-pointer disabled:cursor-not-allowed"
								>
									{isLoading ? (
										<>
											<Loader2
												className="mr-2 animate-spin"
												size={20}
											/>
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
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
