import { MoreHorizontal, Plus, Eye, Edit2, XCircle, ChevronRight } from 'lucide-react';


const mockRiders = [
	{
		id: 'RDR-001',
		name: 'Michael Scott',
		status: 'Online',
		vehicle: 'Bike - ABJ 123 XY',
		deliveries: 145,
		rating: '4.8',
	},
	{
		id: 'RDR-002',
		name: 'Dwight Schrute',
		status: 'On Delivery',
		vehicle: 'Van - LAG 456 ZY',
		deliveries: 312,
		rating: '4.9',
	},
	{
		id: 'RDR-003',
		name: 'Jim Halpert',
		status: 'Offline',
		vehicle: 'Bike - PHC 789 OP',
		deliveries: 89,
		rating: '4.5',
	},
	{
		id: 'RDR-004',
		name: 'Stanley Hudson',
		status: 'Online',
		vehicle: 'Car - KAN 321 QW',
		deliveries: 210,
		rating: '4.7',
	},
	{
		id: 'RDR-005',
		name: 'Ryan Howard',
		status: 'Offline',
		vehicle: 'Bike - ENU 654 RT',
		deliveries: 45,
		rating: '4.2',
	},
	{
		id: 'RDR-006',
		name: 'Kelly Kapoor',
		status: 'On Delivery',
		vehicle: 'Car - IBA 987 LK',
		deliveries: 178,
		rating: '4.6',
	},
];

const statusStyles = {
	'Online': 'text-emerald-400',
	'Offline': 'text-zinc-400',
	'On Delivery': 'text-blue-400',
};

const RidersPage = () => {
	return (
		<div className="space-y-6">
			{/* Header section */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-semibold text-zinc-50 tracking-tight">Riders</h1>
					<p className="text-sm text-zinc-500 mt-1">Manage your delivery personnel and view their statuses.</p>
				</div>
				<div className="flex items-center gap-3 w-full sm:w-auto">
					<button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-zinc-50 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-950 cursor-pointer">
						<Plus className="h-4 w-4" />
						Add New Rider
					</button>
				</div>
			</div>

			{/* Main Content - Grid of Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
				{mockRiders.map((rider) => (
					<div key={rider.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xs hover:border-zinc-700 transition-colors group">
						<div className="flex items-start justify-between mb-5">
							<div className="flex items-center gap-3">
								<div className="h-10 w-10 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-300 font-medium border border-zinc-700">
									{rider.name.charAt(0)}
								</div>
								<div>
									<h3 className="text-zinc-100 font-medium text-sm">{rider.name}</h3>
									<p className={`text-[12px] font-medium opacity-70 ${statusStyles[rider.status as keyof typeof statusStyles]}`}>{rider.status}</p>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<div className="relative inline-block group/action">
									<button className="p-1.5 text-zinc-400 hover:text-zinc-100 rounded-md hover:bg-zinc-800 transition-colors cursor-pointer group-focus-within/action:bg-zinc-800 group-focus-within/action:text-zinc-100 focus:outline-none">
										<MoreHorizontal className="h-4 w-4" />
									</button>
									<div className="absolute right-0 top-[calc(100%+0.25rem)] w-44 bg-zinc-800 border border-zinc-700/50 rounded-xl shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover/action:opacity-100 group-hover/action:visible group-focus-within/action:opacity-100 group-focus-within/action:visible transition-all duration-200 z-50 flex flex-col p-1 gap-0.5 scale-95 group-hover/action:scale-100 group-focus-within/action:scale-100 origin-top-right">
										<button className="flex items-center cursor-pointer gap-2.5 px-2 py-1.5 text-sm text-zinc-300 hover:text-zinc-100 hover:bg-zinc-700/50 rounded-md transition-colors w-full text-left">
											<Eye className="w-4 h-4" />
											View Profile
										</button>
										<div className="relative flex flex-col group/status">
											<button className="flex items-center cursor-pointer justify-between px-2 py-1.5 text-sm text-zinc-300 hover:text-zinc-100 hover:bg-zinc-700/50 rounded-md transition-colors w-full text-left">
												<div className="flex items-center gap-2.5">
													<Edit2 className="w-4 h-4" />
													Update Status
												</div>
												<ChevronRight className="w-4 h-4" />
											</button>
											<div className="absolute right-[calc(100%+0.5rem)] -top-1.5 w-36 bg-zinc-800 border border-zinc-700/50 rounded-xl shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover/status:opacity-100 group-hover/status:visible group-focus-within/status:opacity-100 group-focus-within/status:visible transition-all duration-200 z-50 flex flex-col p-1 gap-0.5 scale-95 group-hover/status:scale-100 group-focus-within/status:scale-100 origin-top-right">
												<button className="px-2 py-1.5 text-sm cursor-pointer text-emerald-400 hover:text-emerald-300 hover:bg-zinc-700/50 rounded-md transition-colors w-full text-left">Online</button>
												<button className="px-2 py-1.5 text-sm cursor-pointer text-blue-400 hover:text-blue-300 hover:bg-zinc-700/50 rounded-md transition-colors w-full text-left">On Delivery</button>
												<button className="px-2 py-1.5 text-sm cursor-pointer text-zinc-400 hover:text-zinc-300 hover:bg-zinc-700/50 rounded-md transition-colors w-full text-left">Offline</button>
											</div>
										</div>
										<button className="flex items-center cursor-pointer gap-2.5 px-2 py-1.5 text-sm text-red-400 hover:text-red-300 hover:bg-zinc-700/50 rounded-md transition-colors w-full text-left">
											<XCircle className="w-4 h-4" />
											Remove Rider
										</button>
									</div>
								</div>
							</div>
						</div>
						
						<div className="space-y-3">
							<div className="flex items-center justify-between text-sm">
								<span className="text-zinc-500 text-xs">Total Deliveries</span>
								<span className="text-zinc-300 font-medium">{rider.deliveries}</span>
							</div>
							<div className="flex items-center justify-between text-sm">
								<span className="text-zinc-500 text-xs">Rating</span>
								<div className="flex items-center gap-1">
									<span className="text-amber-400 text-xs">★</span>
									<span className="text-zinc-300 font-medium">{rider.rating}</span>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default RidersPage;