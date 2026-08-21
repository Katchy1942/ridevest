import { useState, useEffect } from "react";
import {
	Search,
	MoreHorizontal,
	Eye,
	Edit2,
	XCircle,
	ChevronRight,
	UserPlus,
	Loader2,
} from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar02Icon } from "@hugeicons/core-free-icons";
import api from "@/lib/axios";
import AssignRiderModal from "@/components/deliveries/AssignRiderModal";
import { toast } from "sonner";
import { getImageUrl } from "@/handlers/riderHandlers";

const thClass = "px-6 py-4 font-medium uppercase text-[10px] tracking-widest";

const statusOptions = [
	{
		label: "In Transit",
		dot: "bg-blue-400",
		text: "text-blue-400 hover:text-blue-300",
	},
	{
		label: "Delivered",
		dot: "bg-emerald-400",
		text: "text-emerald-400 hover:text-emerald-300",
	},
	{
		label: "Pending",
		dot: "bg-amber-400",
		text: "text-amber-400 hover:text-amber-300",
	},
	{
		label: "Cancelled",
		dot: "bg-red-400",
		text: "text-red-400 hover:text-red-300",
	},
];

const statusStyles = {
	"In Transit": "bg-blue-900/30 text-blue-400",
	Delivered: "bg-emerald-900/30 text-emerald-400",
	Pending: "bg-amber-900/30 text-amber-400",
	Cancelled: "bg-red-900/30 text-red-400",
	unassigned: "bg-zinc-800 text-zinc-400",
};

const formatStatus = (status: string) => {
	if (status === "unassigned") return "Unassigned";
	return status;
};

const DeliveriesPage = () => {
	const [search, setSearch] = useState("");
	const [deliveries, setDeliveries] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedDeliveryId, setSelectedDeliveryId] = useState<number | null>(
		null,
	);
	const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

	const fetchDeliveries = async () => {
		setLoading(true);
		try {
			const response = await api.get("/deliveries/all");
			setDeliveries(response.data);
		} catch (error) {
			console.error("Error fetching deliveries:", error);
			toast.error("Failed to load deliveries");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchDeliveries();
	}, []);

	const filteredDeliveries = deliveries.filter(
		(d: any) =>
			(d.receiverName?.toLowerCase() || "").includes(search.toLowerCase()) ||
			(d.trackingId?.toLowerCase() || "").includes(search.toLowerCase()) ||
			(d.status?.toLowerCase() || "").includes(search.toLowerCase()) ||
			(d.rider ? `${d.rider.firstName} ${d.rider.lastName}` : "")
				.toLowerCase()
				.includes(search.toLowerCase()),
	);

	return (
		<div className="space-y-6">
			<div
				className="flex flex-col sm:flex-row sm:items-center 
					justify-between gap-4"
			>
				<div>
					<h1
						className="text-2xl font-medium 
							text-zinc-50 tracking-tighter"
					>
						Deliveries
					</h1>
				</div>
				<div className="flex items-center gap-3 w-full sm:w-auto">
					<div className="relative flex-1 sm:flex-none">
						<Search
							className="absolute left-3 top-1/2 
								-translate-y-1/2 h-4 w-4 text-zinc-400"
						/>
						<input
							type="text"
							placeholder="Search deliveries..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="w-full sm:w-64 pl-9 pr-4 py-2 bg-zinc-900 
								border-2 border-zinc-800 rounded-full text-xs 
								focus:outline-none focus:ring-2 focus:ring-zinc-900 
								transition-shadow text-zinc-400 placeholder:text-zinc-400"
						/>
					</div>
				</div>
			</div>

			{/* main content */}
			<div className="space-y-4">
				{/* desktop table */}
				<div className="hidden md:block overflow-visible rounded-md shadow-sm">
					<table className="w-full text-sm text-left">
						<thead
							className="bg-[#09090b] border-b border-zinc-800 
								text-zinc-400 font-medium"
						>
							<tr>
								<th className={thClass}>Tracking ID</th>
								<th className={thClass}>Recipient & Destination</th>
								<th className={thClass}>Status</th>
								<th className={thClass}>Rider</th>
								<th className={thClass}>Date</th>
								<th className={`${thClass} text-right`}>Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-zinc-800 text-zinc-100">
							{loading ? (
								<tr className="flex items-center justify-center">
									<td
										colSpan={6}
										className="px-6 py-8 text-center text-zinc-500"
									>
										<Loader2 className="animate-spin" size={20} />
									</td>
								</tr>
							) : filteredDeliveries.length > 0 ? (
								filteredDeliveries.map((delivery: any) => (
									<tr
										key={delivery.id}
										className="hover:bg-[#0f0f11] transition-colors 
											group text-xs"
									>
										<td className="px-6 py-4">
											<div
												className="flex items-center gap-2 
													font-medium text-zinc-100"
											>
												{delivery.trackingId}
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="flex flex-col">
												<span className="font-medium text-zinc-100">
													{delivery.receiverName}
												</span>
												<span className="text-zinc-400 text-xs mt-0.5 line-clamp-1">
													{delivery.dropoffLocation}
												</span>
											</div>
										</td>
										<td className="px-6 py-4">
											<span
												className={`inline-flex items-center whitespace-nowrap 
													px-2.5 py-1 rounded-full text-xs font-medium 
													${
														statusStyles[
															delivery.status as keyof typeof statusStyles
														] || "bg-zinc-800 text-zinc-400"
													}
												`}
											>
												{formatStatus(delivery.status)}
											</span>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center gap-2 text-zinc-600">
												{delivery.rider?.profilePhoto ? (
													<img
														src={getImageUrl(
															delivery.rider.profilePhoto,
														)}
														alt="Rider"
														className="w-5 h-5 rounded-full object-cover 
															shrink-0 border border-zinc-700"
													/>
												) : delivery.rider ? (
													<div
														className="w-5 h-5 rounded-full bg-zinc-800 
															text-zinc-300 flex items-center justify-center 
															text-[10px] font-semibold shrink-0 
															border border-zinc-700"
													>
														{(
															delivery.rider.firstName ||
															delivery.rider.fullName ||
															"?"
														).charAt(0)}
													</div>
												) : (
													<div
														className="w-5 h-5 rounded-full bg-zinc-800/80 
															border border-zinc-700/50 flex 
															items-center justify-center shrink-0"
													>
														<span className="w-1.5 h-1.5 rounded-full bg-zinc-600"></span>
													</div>
												)}
												<span>
													{delivery.rider &&
													(delivery.rider.fullName ||
														delivery.rider.firstName)
														? delivery.rider.fullName ||
															`${delivery.rider.firstName || ""} ${delivery.rider.lastName || ""}`.trim()
														: "Unassigned"}
												</span>
											</div>
										</td>
										<td className="px-6 py-4">
											<div
												className="flex items-center gap-2 
													text-zinc-500 dark:text-zinc-400"
											>
												<HugeiconsIcon
													icon={Calendar02Icon}
													size={20}
													strokeWidth={1.5}
												/>
												{new Date(
													delivery.createdAt,
												).toLocaleDateString()}
											</div>
										</td>
										<td className="px-6 py-4 text-right">
											<div className="relative inline-block group/action">
												<button
													className="p-1.5 text-zinc-100 hover:text-zinc-100 
														rounded-full hover:bg-zinc-800 transition-colors 
														cursor-pointer focus:opacity-100 
														group-focus-within/action:opacity-100"
												>
													<MoreHorizontal className="h-4 w-4" />
												</button>
												<div
													className="absolute right-0 top-[calc(100%+0.25rem)] 
														w-44 bg-zinc-800 border border-zinc-700/50 
														rounded-xl shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] 
														opacity-0 invisible group-hover/action:opacity-100 
														group-hover/action:visible group-focus-within/action:opacity-100 
														group-focus-within/action:visible transition-all duration-200 
														z-50 flex flex-col p-1 gap-0.5 scale-95 group-hover/action:scale-100 
														group-focus-within/action:scale-100 origin-top-right"
												>
													<button
														className="flex items-center cursor-pointer gap-2.5 
															px-2 py-1.5 text-xs text-zinc-300 hover:text-zinc-100 
															hover:bg-zinc-700/50 rounded-md 
															transition-colors w-full text-left"
													>
														<Eye className="w-4 h-4" />
														View Details
													</button>
													<button
														onClick={() => {
															setSelectedDeliveryId(delivery.id);
															setIsAssignModalOpen(true);
														}}
														className="flex items-center cursor-pointer gap-2.5 
															px-2 py-1.5 text-xs text-zinc-300 hover:text-zinc-100 
															hover:bg-zinc-700/50 rounded-md 
															transition-colors w-full text-left"
													>
														<UserPlus className="w-4 h-4" />
														Assign Rider
													</button>
													<div className="relative group/status flex-col flex">
														<button
															className="flex items-center cursor-pointer 
																justify-between px-2 py-1.5 text-xs 
																text-zinc-300 hover:text-zinc-100 hover:bg-zinc-700/50 
																rounded-md transition-colors w-full text-left"
														>
															<div className="flex items-center gap-2.5">
																<Edit2 className="w-4 h-4" />
																Update Status
															</div>
															<ChevronRight className="w-4 h-4" />
														</button>
														<div
															className="absolute right-[calc(100%+0.5rem)] -top-1.5 
																	w-36 bg-zinc-800 border border-zinc-700/50 rounded-xl 
																	shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] opacity-0 
																	invisible group-hover/status:opacity-100 
																	group-hover/status:visible group-focus-within/status:opacity-100 
																	group-focus-within/status:visible transition-all duration-200 
																	z-50 flex flex-col p-1 gap-0.5 scale-95 
																	group-hover/status:scale-100 
																	group-focus-within/status:scale-100 origin-top-right"
														>
															{statusOptions.map(
																({ label, dot, text }) => (
																	<button
																		key={label}
																		className={`px-2 py-1.5 text-xs flex items-center 
																			gap-2 cursor-pointer hover:bg-zinc-700/50 
																			rounded-md transition-colors 
																			w-full text-left ${text}
																		`}
																	>
																		<div
																			className={`w-1 p-1 rounded-full ${dot}`}
																		/>
																		{label}
																	</button>
																),
															)}
														</div>
													</div>
													<button
														className="flex items-center cursor-pointer gap-2.5 
															px-2 py-1.5 text-xs text-red-400 hover:text-red-300 
															hover:bg-zinc-700/50 rounded-md transition-colors 
															w-full text-left"
													>
														<XCircle className="w-4 h-4" />
														Cancel Delivery
													</button>
												</div>
											</div>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td
										colSpan={6}
										className="px-6 py-8 text-center text-xs 
											text-zinc-500 dark:text-zinc-400"
									>
										No deliveries found
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

				{/* mobile card view */}
				<div className="flex flex-col gap-6 md:hidden pb-2">
					{loading ? (
						<div className="p-6 flex items-center justify-center text-sm">
							<Loader2 className="animate-spin" />
						</div>
					) : filteredDeliveries.length > 0 ? (
						filteredDeliveries.map((delivery: any) => (
							<div
								key={delivery.id}
								className="bg-zinc-900 border-4 border-zinc-800 
									rounded-3xl p-4 space-y-6 shadow-xs"
							>
								<div className="flex items-center justify-between">
									<div
										className="flex items-center gap-2 
											text-2xl tracking-tight text-zinc-100"
									>
										{delivery.trackingId}
									</div>
									<span
										className={`inline-flex items-center whitespace-nowrap 
											px-2.5 py-1 rounded-full text-xs font-medium 
											${
												statusStyles[
													delivery.status as keyof typeof statusStyles
												] || "bg-zinc-800 text-zinc-400"
											}
										`}
									>
										{formatStatus(delivery.status)}
									</span>
								</div>

								<div className="space-y-2">
									<div>
										<h4 className="text-xs font-medium text-zinc-100">
											{delivery.receiverName}
										</h4>
										<div className="text-zinc-400 text-xs mt-1">
											<span>{delivery.dropoffLocation}</span>
										</div>
									</div>
								</div>

								<div
									className="flex items-center justify-between pt-3 
										border-t border-dashed border-zinc-800/60"
								>
									<div
										className="flex flex-wrap items-center gap-x-4 
											gap-y-2 text-xs text-zinc-400"
									>
										<div className="flex items-center gap-1.5">
											{delivery.rider?.profilePhoto ? (
												<img
													src={getImageUrl(
														delivery.rider.profilePhoto,
													)}
													alt="Rider"
													className="w-5 h-5 rounded-full object-cover 
														shrink-0 border border-zinc-700"
												/>
											) : delivery.rider ? (
												<div
													className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 
														flex items-center justify-center text-[10px] 
														font-semibold shrink-0 border border-zinc-700"
												>
													{(
														delivery.rider.firstName ||
														delivery.rider.fullName ||
														"?"
													).charAt(0)}
												</div>
											) : (
												<div
													className="w-5 h-5 rounded-full bg-zinc-800/80 
														border border-zinc-700/50 flex items-center 
														justify-center shrink-0"
												>
													<span className="w-1.5 h-1.5 rounded-full bg-zinc-600"></span>
												</div>
											)}
											<span>
												{delivery.rider &&
												(delivery.rider.fullName ||
													delivery.rider.firstName)
													? delivery.rider.fullName ||
														`${delivery.rider.firstName || ""} ${delivery.rider.lastName || ""}`.trim()
													: "Unassigned"}
											</span>
										</div>
										<div className="flex items-center gap-1.5">
											<HugeiconsIcon
												icon={Calendar02Icon}
												size={16}
												strokeWidth={1.5}
												className="text-zinc-400"
											/>
											<span className="text-xs">
												{new Date(
													delivery.createdAt,
												).toLocaleDateString()}
											</span>
										</div>
									</div>
									<div className="relative group/action">
										<button
											className="p-1.5 text-zinc-400 hover:text-zinc-100 
												rounded-full hover:bg-zinc-800 transition-colors 
												cursor-pointer group-focus-within/action:bg-zinc-800 
												group-focus-within/action:text-zinc-100"
										>
											<MoreHorizontal className="h-4 w-4" />
										</button>
										<div
											className="absolute right-0 bottom-[calc(100%+0.25rem)] 
												w-44 bg-zinc-800 border border-zinc-700/50 
												rounded-xl shadow-xl opacity-0 invisible 
												group-hover/action:opacity-100 group-hover/action:visible 
												group-focus-within/action:opacity-100 
												group-focus-within/action:visible transition-all duration-200 
												z-50 flex flex-col p-1 gap-0.5 scale-95 
												group-hover/action:scale-100 group-focus-within/action:scale-100 
												origin-bottom-right"
										>
											<button
												className="flex items-center gap-2.5 px-2 py-1.5 
													text-xs text-zinc-300 hover:text-zinc-100 
													hover:bg-zinc-700/50 rounded-md transition-colors 
													w-full text-left"
											>
												<Eye className="w-4 h-4" />
												View Details
											</button>
											<button
												onClick={() => {
													setSelectedDeliveryId(delivery.id);
													setIsAssignModalOpen(true);
												}}
												className="flex items-center gap-2.5 px-2 py-1.5 
													text-xs text-zinc-300 hover:text-zinc-100 
													hover:bg-zinc-700/50 rounded-md transition-colors 
													w-full text-left"
											>
												<UserPlus className="w-4 h-4" />
												Assign Rider
											</button>
											<div className="relative group/status flex-col flex">
												<button
													className="flex items-center justify-between px-2 py-1.5 
														text-xs text-zinc-300 hover:text-zinc-100 
														hover:bg-zinc-700/50 rounded-md transition-colors 
														w-full text-left"
												>
													<div className="flex items-center gap-2.5">
														<Edit2 className="w-4 h-4" />
														Update Status
													</div>
													<ChevronRight className="w-4 h-4" />
												</button>
												<div
													className="absolute right-[calc(100%+0.5rem)] -bottom-1.5 
														w-36 bg-zinc-800 border border-zinc-700/50 rounded-xl 
														shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] opacity-0 invisible 
														group-hover/status:opacity-100 group-hover/status:visible 
														group-focus-within/status:opacity-100 
														group-focus-within/status:visible transition-all 
														duration-200 z-50 flex flex-col p-1 gap-0.5 scale-95 
														group-hover/status:scale-100 group-focus-within/status:scale-100 
														origin-bottom-right"
												>
													{statusOptions.map(
														({ label, dot, text }) => (
															<button
																key={label}
																className={`px-2 py-1.5 text-xs flex items-center 
																	gap-2 cursor-pointer hover:bg-zinc-700/50 rounded-md 
																	transition-colors w-full text-left ${text}
																`}
															>
																<div
																	className={`w-1 p-1 rounded-full ${dot}`}
																/>
																{label}
															</button>
														),
													)}
												</div>
											</div>
											<button
												className="flex items-center gap-2.5 px-2 
													py-1.5 text-xs text-red-400 
													hover:text-red-300 hover:bg-zinc-700/50 
													rounded-md transition-colors w-full text-left"
											>
												<XCircle className="w-4 h-4" />
												Cancel Delivery
											</button>
										</div>
									</div>
								</div>
							</div>
						))
					) : (
						<div
							className="p-6 text-center text-sm text-zinc-400 
								bg-zinc-900 border border-zinc-800 rounded-md"
						>
							No deliveries found matching "{search}"
						</div>
					)}
				</div>
			</div>

			<AssignRiderModal
				isOpen={isAssignModalOpen}
				onClose={() => setIsAssignModalOpen(false)}
				deliveryId={selectedDeliveryId}
				onRiderAssigned={fetchDeliveries}
			/>
		</div>
	);
};

export default DeliveriesPage;
