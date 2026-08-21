import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import LiveLocation from "./LiveLocation";

const timelineLogs = [
	{
		time: "10:42 AM",
		label: "Order placed",
		note: "Package registered in the system",
	},
	{ time: "12:15 PM", label: "Picked up", note: "Collected from sender" },
	{
		time: "2:30 PM",
		label: "In transit",
		note: "En route to sorting facility",
	},
];

const TrackDelivery = () => {
	const [showMap, setShowMap] = useState(false);
	return (
		<>
			<div
				className="relative min-h-screen py-20 px-6 
				overflow-hidden flex flex-col 
				items-center justify-center"
			>
				{/* <TrackingSearch
				loading={loading}
				value={trackingInput}
				onChange={setTrackingInput}
				onTrack={() =>
					trackingInput.trim() &&
					navigate(`?trackingId=${trackingInput.trim()}`)
				}
			/> */}

				<div
					className="bg-zinc-900 border-zinc-800 
					border-4 p-1.5 relative w-full 
					max-w-md mx-auto rounded-xl"
				>
					<div
						className="relative h-36 overflow-hidden bg-cover 
						bg-center flex flex-col items-center 
						justify-center rounded-lg"
						style={{
							backgroundImage:
								"url('/src/assets/images/tracking-img.png')",
						}}
					>
						<div className="absolute inset-0 bg-black/50" />
						<span
							className="relative z-10 text-[10px] 
							text-[#1d2414]/80 -mb-2 uppercase 
							tracking-tight font-light"
						>
							Your tracking id
						</span>
						<p
							className="relative z-10 tracking-tighter 
							text-3xl font-bold text-[#1d2414]"
						>
							RVMK0F89
						</p>
						<button
							className="relative z-10 mt-2 py-2 px-4 
							text-xs tracking-tight font-medium rounded-full 
							border border-[#1d2414] text-[#1d2414] 
							hover:bg-[#1d2414]/10 transition-colors 
							cursor-pointer flex items-center 
							justify-center gap-1 disabled:opacity-50"
						>
							Copy
						</button>
					</div>

					{/* rider card */}
					<div className="mt-3 mx-1 bg-[#1a2e1c] rounded-2xl -rotate-2 p-2">
						<div
							className="flex items-center gap-3 bg-[#1e3a22] 
							border border-[#0b170c] rounded-xl 
							pr-4 overflow-hidden"
						>
							<div className="shrink-0 self-end">
								<img
									src="/src/assets/images/rider-cutout.png"
									alt="Rider"
									className="h-28 w-auto object-contain block"
								/>
							</div>
							<p
								className="text-lg leading-5 max-w-50 
								text-[#0b170c] font-bold tracking-tighter py-3"
							>
								hi, I'm{" "}
								<span className="text-emerald-600 font-semibold">
									Samuel
								</span>
								, your rider for this dispatch. you can call me at{" "}
								<span className="text-emerald-600 font-semibold">
									0701 234 5678
								</span>
								.
							</p>
						</div>
					</div>

					<div className="mt-4 px-2 mb-4 flex items-center justify-between">
						<h2 className="text-xl font-semibold tracking-tighter text-zinc-100">
							Delivery timeline
						</h2>
						<button
							onClick={() => setShowMap(true)}
							className="py-1.5 px-3 text-[11px] tracking-tight 
							font-medium rounded-full bg-emerald-600 
							hover:bg-emerald-500 text-black transition-colors 
							cursor-pointer flex items-center 
							gap-1.5 disabled:opacity-60"
						>
							Live
							<ArrowUpRight size={11} strokeWidth={2.5} />
						</button>
					</div>
					<ol className="px-2 pb-2 flex flex-col">
						{timelineLogs.map((log, i) => (
							<li key={i} className="flex gap-3">
								{/* connector */}
								<div className="flex flex-col items-center">
									<span
										className={`mt-1 w-2.5 h-2.5 rounded-full shrink-0 
										${i === timelineLogs.length - 1 ? "bg-emerald-600" : "bg-zinc-500"}
									`}
									/>
									{i < timelineLogs.length - 1 && (
										<span className="w-px flex-1 bg-zinc-700 my-1" />
									)}
								</div>
								{/* content */}
								<div className="pb-4">
									<p
										className="text-sm font-medium 
										tracking-tight text-zinc-200 leading-tight"
									>
										{log.label}
									</p>
									<p className="text-[11px] text-zinc-500 mt-0.5">
										{log.note}
									</p>
									<p className="text-[10px] text-zinc-600 mt-0.5 tracking-tight">
										{log.time}
									</p>
								</div>
							</li>
						))}
					</ol>
				</div>
			</div>

			{showMap && <LiveLocation onClose={() => setShowMap(false)} />}
		</>
	);
};

export default TrackDelivery;
