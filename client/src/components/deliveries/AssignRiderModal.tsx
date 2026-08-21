import { useState, useEffect } from "react";
import { Loader2, AlertCircle, Star, X } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserAdd01Icon } from "@hugeicons/core-free-icons";
import api from "@/lib/axios";
import { toast } from "sonner";
import { getImageUrl } from "@/handlers/riderHandlers";

interface AssignRiderModalProps {
	isOpen: boolean;
	onClose: () => void;
	deliveryId: number | null;
	onRiderAssigned: () => void;
}

const AssignRiderModal = ({
	isOpen,
	onClose,
	deliveryId,
	onRiderAssigned,
}: AssignRiderModalProps) => {
	const [riders, setRiders] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [assigningId, setAssigningId] = useState<number | null>(null);

	useEffect(() => {
		if (isOpen) {
			fetchRiders();
		}
	}, [isOpen]);

	const fetchRiders = async () => {
		setLoading(true);
		try {
			const response = await api.get("/riders/all");
			// Filter riders: not on delivery
			const eligibleRiders = response.data.filter(
				(rider: any) => rider.status !== "on_delivery",
			);
			setRiders(eligibleRiders);
		} catch (error) {
			console.error("Error fetching riders:", error);
			toast.error("Failed to load eligible riders");
		} finally {
			setLoading(false);
		}
	};

	const handleAssign = async (riderId: number) => {
		setAssigningId(riderId);
		try {
			await api.patch(`/deliveries/${deliveryId}/assign`, { riderId });
			toast.success("Rider assigned successfully");
			onRiderAssigned();
			onClose();
		} catch (error: any) {
			console.error("Error assigning rider:", error);
			const errorMsg =
				error.response?.data?.error || "Failed to assign rider";
			toast.error(errorMsg);
		} finally {
			setAssigningId(null);
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
			<div className="bg-zinc-900 rounded-4xl border-5 border-zinc-800 w-full max-w-md shadow-sm animate-in zoom-in duration-200 overflow-hidden">
				<div className="p-6 pb-2 flex items-center justify-between mb-6">
					<h2 className="text-xl font-semibold tracking-tighter text-zinc-100">
						Assign a rider
					</h2>
					<button
						type="button"
						onClick={onClose}
						className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition-colors cursor-pointer"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				<div className="max-h-100 overflow-y-auto px-6 pb-6">
					{loading ? (
						<div className="flex flex-col items-center justify-center py-12 gap-3">
							<Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
							<p className="text-sm text-zinc-500">
								Loading available riders...
							</p>
						</div>
					) : riders.length > 0 ? (
						<div className="space-y-2">
							{riders.map((rider) => {
								const photo = rider.profilePhoto || rider.photo;
								const photoUrl = getImageUrl(photo);

								return (
									<div
										key={rider.id}
										className="flex items-center justify-between"
									>
										<div className="flex items-center gap-3">
											{/* Thumbnail */}
											<div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden shrink-0 border-2 border-zinc-700 flex items-center justify-center">
												{photoUrl ? (
													<img
														src={photoUrl}
														alt={
															rider.firstName ||
															rider.fullName ||
															"Rider"
														}
														className="w-full h-full object-cover"
													/>
												) : (
													<span className="text-xs font-semibold text-zinc-400">
														{(
															rider.firstName ||
															rider.fullName ||
															"?"
														).charAt(0)}
													</span>
												)}
											</div>

											<div>
												<h4 className="text-sm font-medium tracking-tight text-zinc-100">
													{rider.firstName
														? `${rider.firstName} ${rider.lastName || ""}`
														: rider.fullName}
												</h4>
												<div className="flex items-center gap-2 mt-0.5 text-xs">
													<span
														className={`inline-flex italic items-center text-[10px] ${rider.status === "online" ? " text-emerald-400" : "bg-zinc-800 text-zinc-400"}`}
													>
														is online
													</span>
													<span className="text-zinc-600">·</span>
													<span className="flex items-center gap-1 text-zinc-400 text-xs font-medium">
														<Star className="w-3 h-3 fill-emerald-400 text-emerald-400" />
														{rider.rating ?? 4.5}
													</span>
												</div>
											</div>
										</div>

										<button
											type="button"
											onClick={() => handleAssign(rider.id)}
											disabled={assigningId !== null}
											className="px-3 py-1.5 rounded-full bg-emerald-600 tracking-tight hover:bg-emerald-500 text-zinc-950 font-medium text-xs transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 shrink-0"
										>
											{assigningId === rider.id ? (
												<Loader2 className="w-3.5 h-3.5 animate-spin" />
											) : (
												<>
													{/* <HugeiconsIcon icon={UserAdd01Icon} size={14} strokeWidth={2} /> */}
													<span>Assign</span>
												</>
											)}
										</button>
									</div>
								);
							})}
						</div>
					) : (
						<div className="flex flex-col items-center justify-center py-12 px-6 text-center gap-3">
							{/* <AlertCircle className="w-10 h-10 text-zinc-700" /> */}
							<p className="text-xs text-zinc-400">
								No eligible riders found. Make sure riders are online
								and not on delivery.
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default AssignRiderModal;
