import { useEffect, useRef } from "react";
import { Loader2, ArrowDownLeft, ArrowUpRight } from "lucide-react";

interface ConfirmLocationModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: (e: React.FormEvent) => void;
	formData: {
		courier: string;
		pickup: string;
		destination: string;
		receiverName: string;
		receiverPhone: string;
		senderName: string;
		senderPhone: string;
		weightEstimate: string;
		deliveryNotes: string;
	};
	transportMode: string;
	loading: boolean;
}

const transportLabel: Record<string, string> = {
	bike: "Bike",
	car: "Car",
	truck: "Truck",
};

const ConfirmLocationModal = ({
	isOpen,
	onClose,
	onConfirm,
	formData,
	transportMode,
	loading,
}: ConfirmLocationModalProps) => {
	const overlayRef = useRef<HTMLDivElement>(null);

	// Close on Escape key
	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		if (isOpen) document.addEventListener("keydown", handleKey);
		return () => document.removeEventListener("keydown", handleKey);
	}, [isOpen, onClose]);

	// Prevent body scroll while open
	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	if (!isOpen) return null;

	const handleOverlayClick = (e: React.MouseEvent) => {
		if (e.target === overlayRef.current) onClose();
	};

	return (
		<div
			ref={overlayRef}
			onClick={handleOverlayClick}
			className="fixed inset-0 z-50 flex items-center justify-center p-4"
			style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
		>
			<div
				className="relative bg-zinc-900 rounded-4xl px-6 border-5 border-zinc-800 w-full max-w-sm shadow-2xl"
				style={{
					animation: "modalIn 0.18s cubic-bezier(0.34,1.56,0.64,1) both",
				}}
			>
				{/* Header */}
				<div className="flex items-center pt-6">
					<div>
						<h2 className="text-xl font-semibold tracking-tighter text-center text-zinc-100">
							Confirm delivery locations
						</h2>
					</div>
				</div>

				{/* Route summary */}
				<div className="pt-6 space-y-5 mb-8">
					<div className="relative pl-8">
						{/* Connector line */}
						<div className="absolute left-4 top-5 bottom-5 w-px bg-zinc-700" />

						{/* Pickup */}
						<div className="relative mb-5">
							<div className="absolute -left-8 top-1 w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center border border-emerald-800/50 z-10">
								<div className="absolute inset-0 bg-emerald-900/30 rounded-full" />
								<div className="w-2.5 h-2.5 bg-emerald-500 animate-pulse rounded-full relative z-20" />
							</div>
							<div className="pl-2">
								<p className="text-[10px] font-medium text-zinc-500 uppercase tracking-tight italic mb-0.5">
									Pickup
								</p>
								<p className="text-sm text-zinc-300 tracking-tight">
									{formData.pickup ||
										"Lorem ipsum dolor sit lorem ipsum, dolor sit."}
								</p>
							</div>
						</div>

						{/* Destination */}
						<div className="relative">
							<div className="absolute -left-8 top-1 w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 z-10">
								<div className="absolute inset-0 bg-red-900/30 rounded-full" />
								<div className="w-2.5 h-2.5 bg-red-500 animate-pulse rounded-full relative z-20" />
							</div>
							<div className="pl-2">
								<p className="text-[10px] font-medium text-zinc-500 uppercase tracking-tight italic mb-0.5">
									Drop-off
								</p>
								<p className="text-sm text-zinc-300 tracking-tight">
									{formData.destination ||
										"Lorem ipsum dolor sit ipsum dolor, sit"}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Footer actions */}
				<div className="pb-6">
					<div className="flex justify-end gap-1.5">
						<button
							type="button"
							onClick={onClose}
							disabled={loading}
							className="py-2 px-4 text-xs tracking-tight font-medium rounded-full border border-emerald-600 text-emerald-500 hover:bg-emerald-600/10 transition-colors cursor-pointer flex items-center justify-center gap-1 disabled:opacity-50"
						>
							Edit
						</button>
						<button
							type="button"
							onClick={onConfirm}
							disabled={loading}
							className="py-2 px-4 text-xs tracking-tight font-medium rounded-full bg-emerald-600 hover:bg-emerald-500 text-black transition-colors cursor-pointer flex items-center justify-center gap-1 disabled:opacity-60"
						>
							{loading ? (
								<>
									<Loader2 size={15} className="animate-spin" />
								</>
							) : (
								<>
									<span>Proceed</span>
									<ArrowUpRight size={15} strokeWidth={1.5} />
								</>
							)}
						</button>
					</div>
					<p className="mt-3 text-[10px] text-zinc-500 text-center leading-tight">
						Changes made in location after payments will incur extra charges.
					</p>
				</div>
			</div>

			<style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.92) translateY(8px); }
          to   { opacity: 1; transform: scale(1)   translateY(0);    }
        }
      `}</style>
		</div>
	);
};

const DetailCard = ({ label, value }: { label: string; value: string }) => (
	<div className="bg-zinc-800/60 rounded-xl px-3 py-2.5">
		<p className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest mb-0.5">
			{label}
		</p>
		<p className="text-xs text-zinc-300 truncate">{value || "—"}</p>
	</div>
);

export default ConfirmLocationModal;
