import { useState } from "react";
import { CreditCard, ArrowRight, Loader2 } from "lucide-react";
import greenPattern from "../../assets/images/green-partern.png";

const DeliveryPayment = () => {
	const [isLoading, setIsLoading] = useState(false);

	const [formData, setFormData] = useState({
		cardNumber: "4242 4242 4242 4242",
		cardHolder: "Donald Jonah",
		expiryDate: "08/28",
		cvv: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const formatCardNumber = (val: string) => {
		const digits = val.replace(/\D/g, "").slice(0, 16);
		return digits.replace(/(.{4})/g, "$1 ").trim();
	};

	const handleCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({
			...prev,
			cardNumber: formatCardNumber(e.target.value),
		}));
	};

	const handleExpiry = (e: React.ChangeEvent<HTMLInputElement>) => {
		let val = e.target.value.replace(/\D/g, "").slice(0, 4);
		if (val.length >= 3) val = val.slice(0, 2) + "/" + val.slice(2);
		setFormData((prev) => ({ ...prev, expiryDate: val }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		await new Promise((r) => setTimeout(r, 2000));
		setIsLoading(false);
	};

	const summary = {
		deliveryFee: 3500,
		serviceFee: 350,
		discount: 0,
		total: 3850,
	};

	const inputClass =
		"w-full px-4 py-1.5 text-xs bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors";

	return (
		<div className="min-h-screen flex flex-col justify-center items-center md:p-10 p-4">
			<div className="w-full max-w-sm">
				<form onSubmit={handleSubmit} className="flex flex-col gap-5">
					<div
						className="rounded-2xl p-1.5"
						style={{
							backgroundImage: `url(${greenPattern})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
						}}
					>
						<section className="bg-zinc-900 rounded-[14px] p-5">
							<div className="flex items-center justify-center mb-6">
								<h1 className="text-xl font-semibold tracking-tighter text-zinc-100 flex items-center gap-2">
									Payments.
								</h1>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="md:col-span-2">
									<label className="block text-xs font-medium text-zinc-300 mb-2">
										Card Number
									</label>
									<div className="relative">
										<input
											name="cardNumber"
											value={formData.cardNumber}
											onChange={handleCardNumber}
											maxLength={19}
											className={`${inputClass} pr-10 font-mono tracking-wider`}
											placeholder="0000 0000 0000 0000"
										/>
										<CreditCard
											size={16}
											className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
											strokeWidth={1.5}
										/>
									</div>
								</div>

								<div className="md:col-span-2">
									<label className="block text-xs font-medium text-zinc-300 mb-2">
										Cardholder Name
									</label>
									<input
										name="cardHolder"
										value={formData.cardHolder}
										onChange={handleChange}
										className={inputClass}
										placeholder="Name on card"
									/>
								</div>

								<div>
									<label className="block text-xs font-medium text-zinc-300 mb-2">
										Expiry Date
									</label>
									<input
										name="expiryDate"
										value={formData.expiryDate}
										onChange={handleExpiry}
										maxLength={5}
										className={`${inputClass} font-mono`}
										placeholder="MM/YY"
									/>
								</div>

								<div>
									<label className="block text-xs font-medium text-zinc-300 mb-2">
										CVV
									</label>
									<input
										name="cvv"
										value={formData.cvv}
										onChange={handleChange}
										maxLength={4}
										type="password"
										className={`${inputClass} font-mono`}
										placeholder="•••"
									/>
								</div>
							</div>

							<div className="my-6 border border-dashed rounded-lg p-4 border-zinc-700">
								<h2 className="text-[10px] uppercase tracking-tight text-zinc-300 mb-4">
									Order Total
								</h2>
								<div className="space-y-2.5 text-xs">
									<div className="flex justify-between text-zinc-400">
										<span>Delivery Fee</span>
										<span>
											₦{summary.deliveryFee.toLocaleString()}
										</span>
									</div>
									<div className="flex justify-between text-zinc-400">
										<span>Service Fee</span>
										<span>
											₦{summary.serviceFee.toLocaleString()}
										</span>
									</div>
									{summary.discount > 0 && (
										<div className="flex justify-between text-emerald-500">
											<span>Discount</span>
											<span>
												−₦{summary.discount.toLocaleString()}
											</span>
										</div>
									)}
									<div className="flex justify-between text-zinc-100 font-semibold text-base border-t border-zinc-800 pt-3 mt-1">
										<span>Total</span>
										<span>₦{summary.total.toLocaleString()}</span>
									</div>
								</div>
							</div>

							<button
								type="submit"
								disabled={isLoading}
								className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-black text-sm tracking-tight font-medium rounded-full shadow-sm transition-colors disabled:opacity-50 cursor-pointer flex justify-center items-center gap-2"
							>
								{isLoading ? (
									<>
										<Loader2 className="animate-spin" size={18} />
										<span>Processing Payment…</span>
									</>
								) : (
									<>
										<span>Pay ₦{summary.total.toLocaleString()}</span>
										<ArrowRight size={15} strokeWidth={1.5} />
									</>
								)}
							</button>

							{/* <p className="text-center text-xs text-zinc-600 mt-1 flex items-center justify-center gap-1.5">
							<Check size={12} className="text-emerald-600" />
							256-bit SSL encryption · PCI DSS compliant
						</p> */}
						</section>
					</div>
				</form>
			</div>
		</div>
	);
};

export default DeliveryPayment;
