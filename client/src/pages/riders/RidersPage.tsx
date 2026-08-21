import {
	MoreHorizontal,
	Edit2,
	Trash,
	ChevronRight,
	Loader2,
} from "lucide-react";
import { useRiderHandlers, getImageUrl } from "@/handlers/riderHandlers";

const RidersPage = () => {
	const { riders, loading, handleUpdateStatus, handleRemoveRider } =
		useRiderHandlers();

	const displayRiders = riders;

	return (
		<div className="space-y-6">
			{/* Header section */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-medium text-zinc-50 tracking-tighter">
						Riders
					</h1>
				</div>
			</div>

			{/* Main Content - Grid of Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-12">
				{loading ? (
					<div className="col-span-full flex justify-center py-12">
						<Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
					</div>
				) : displayRiders.length > 0 ? (
					displayRiders.map((rider) => {
						const photo =
							(rider as any).profilePhoto || (rider as any).photo;
						const photoUrl = getImageUrl(photo);

						return (
							<div
								key={rider.id}
								className="relative rounded-4xl bg-zinc-900 border-6 border-zinc-800 hover:border-zinc-600 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-0.5 group"
							>
								<div className="relative h-64 w-full overflow-hidden rounded-[calc(var(--radius-4xl)-4px)]">
									{photoUrl ? (
										<img
											src={photoUrl}
											alt={
												rider.firstName ||
												(rider as any).fullName ||
												"Rider"
											}
											className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
										/>
									) : (
										<div className="w-full h-full bg-zinc-800 flex items-center justify-center text-5xl font-bold text-zinc-600">
											{(
												rider.firstName ||
												(rider as any).fullName ||
												"?"
											).charAt(0)}
										</div>
									)}
									{/* Bottom gradient */}
									<div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
									{/* Name + subtitle + stats */}
									<div className="absolute inset-x-0 bottom-0 px-4 pb-4">
										<h3 className="text-white font-normal text-xl tracking-tighter leading-tight">
											{rider.firstName} {rider.lastName}
										</h3>
										{/* <p className="text-zinc-400 text-xs mt-0.5 mb-3">
										{rider.deliveryCount || 0} deliveries completed
									</p> */}
										<div className="flex items-center gap-3">
											<span className="text-zinc-300 text-xs font-medium">
												{rider.deliveryCount || 0}{" "}
												<span className="text-zinc-500 font-normal">
													trips
												</span>
											</span>
											<span className="text-zinc-600">·</span>
											<span className="text-zinc-300 text-xs font-medium">
												<span className="text-emerald-600">★</span>{" "}
												{(rider as any).rating ?? 4.5}
											</span>
										</div>
									</div>
								</div>

								{/* Action menu — outside overflow-hidden so dropdown renders freely */}
								<div className="absolute bottom-4 right-4 z-20 inline-block group/action">
									<button className="p-3 rounded-full bg-emerald-600 backdrop-blur-sm hover:bg-emerald-800 text-zinc-900 hover:text-white transition-colors cursor-pointer focus:outline-none">
										<MoreHorizontal
											className="w-4 h-4"
											strokeWidth={2}
										/>
									</button>
									<div className="absolute right-0 bottom-[calc(100%+0.4rem)] w-44 bg-zinc-800 border border-zinc-700/50 rounded-xl shadow-[0_0_40px_-10px_rgba(0,0,0,0.6)] opacity-0 invisible group-hover/action:opacity-100 group-hover/action:visible group-focus-within/action:opacity-100 group-focus-within/action:visible transition-all duration-200 z-50 flex flex-col p-1 gap-0.5 scale-95 group-hover/action:scale-100 group-focus-within/action:scale-100 origin-bottom-right">
										<div className="relative flex flex-col group/status">
											<button className="flex items-center cursor-pointer justify-between px-2 py-1.5 text-xs text-zinc-300 hover:text-zinc-100 hover:bg-zinc-700/50 rounded-md transition-colors w-full text-left">
												<div className="flex items-center gap-2.5">
													<Edit2 className="w-4 h-4" />
													Update status
												</div>
												<ChevronRight className="w-4 h-4" />
											</button>
											<div className="absolute right-[calc(100%+0.5rem)] top-0 w-36 bg-zinc-800 border border-zinc-700/50 rounded-xl shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover/status:opacity-100 group-hover/status:visible group-focus-within/status:opacity-100 group-focus-within/status:visible transition-all duration-200 z-50 flex flex-col p-1 gap-0.5 scale-95 group-hover/status:scale-100 group-focus-within/status:scale-100 origin-top-right">
												<button
													onClick={() =>
														handleUpdateStatus(rider.id, "online")
													}
													className="px-2 py-1.5 flex items-center gap-2 text-xs cursor-pointer text-emerald-400 hover:text-emerald-300 hover:bg-zinc-700/50 rounded-md transition-colors w-full text-left"
												>
													<div className="w-1 p-1 bg-emerald-400 rounded-full"></div>
													Online
												</button>
												<button
													onClick={() =>
														handleUpdateStatus(
															rider.id,
															"on_delivery",
														)
													}
													className="px-2 py-1.5 text-xs flex items-center gap-2 cursor-pointer text-blue-400 hover:text-blue-300 hover:bg-zinc-700/50 rounded-md transition-colors w-full text-left"
												>
													<div className="w-1 p-1 bg-blue-400 rounded-full"></div>
													On delivery
												</button>
												<button
													onClick={() =>
														handleUpdateStatus(
															rider.id,
															"offline",
														)
													}
													className="px-2 py-1.5 text-xs flex items-center gap-2 cursor-pointer text-zinc-400 hover:text-zinc-300 hover:bg-zinc-700/50 rounded-md transition-colors w-full text-left"
												>
													<div className="w-1 p-1 bg-zinc-400 rounded-full"></div>
													Offline
												</button>
											</div>
										</div>
										<button
											onClick={() => handleRemoveRider(rider.id)}
											className="flex items-center cursor-pointer gap-2.5 px-2 py-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-zinc-700/50 rounded-md transition-colors w-full text-left"
										>
											<Trash className="w-4 h-4" />
											Delete rider
										</button>
									</div>
								</div>
							</div>
						);
					})
				) : (
					<div className="col-span-full text-xs text-center py-12 text-zinc-300">
						You don't have any riders, yet.
					</div>
				)}
			</div>
		</div>
	);
};

export default RidersPage;
