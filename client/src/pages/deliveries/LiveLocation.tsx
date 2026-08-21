import { useEffect } from "react";
import { X, RefreshCw } from "lucide-react";

const TEST_LAT = 6.4541;
const TEST_LNG = 3.3947;

interface LiveLocationProps {
	onClose: () => void;
}

const LiveLocation = ({ onClose }: LiveLocationProps) => {
	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, [onClose]);

	const mapSrc = `https://maps.google.com/maps?q=${TEST_LAT},${TEST_LNG}&z=15&output=embed`;

	return (
		<div
			className="fixed inset-0 z-50 flex 
				items-center justify-center p-4"
			onClick={onClose}
		>
			<div
				className="absolute inset-0 
					bg-black/70 backdrop-blur-sm"
			/>

			<div
				className="relative z-10 w-full max-w-4xl 
					rounded-4xl overflow-hidden 
					border-4 border-zinc-600"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="relative w-full h-132">
					<button
						onClick={onClose}
						className="absolute top-3 right-3 z-20 p-1.5 rounded-full
							bg-zinc-900/70 backdrop-blur-md border border-zinc-700/60
							text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80
							transition-colors cursor-pointer shadow-md"
					>
						<X size={14} />
					</button>
					<iframe
						title="Rider Live Location"
						src={mapSrc}
						width="100%"
						height="100%"
						style={{ border: 0 }}
						allowFullScreen
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
					/>

					<div 
						className="absolute bottom-3 left-1/2 
							-translate-x-1/2 z-10 
							flex items-center gap-2"
					>
						<button
							className="p-2 rounded-full
								bg-zinc-900/80 backdrop-blur-md border border-zinc-700/60
								text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80
								transition-colors cursor-pointer shadow-md
								[&:hover_svg]:rotate-180 [&_svg]:transition-transform [&_svg]:duration-500"
						>
							<RefreshCw size={13} />
						</button>

						<div
							className="flex items-center gap-3 px-4 py-2 rounded-full
								bg-zinc-900/80 backdrop-blur-md border border-zinc-700/60
								shadow-lg whitespace-nowrap"
						>
							<p className="text-[11px] text-zinc-400 tracking-tight italic">
								Rider is approximately{" "}
								<span className="text-zinc-100 font-semibold not-italic">
									1.2 km
								</span>{" "}
								away from you.
							</p>
							<span className="w-px h-3 bg-zinc-600" />
							<span className="text-[11px] text-zinc-500 font-mono tracking-tight">
								{TEST_LAT.toFixed(4)}, {TEST_LNG.toFixed(4)}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LiveLocation;
