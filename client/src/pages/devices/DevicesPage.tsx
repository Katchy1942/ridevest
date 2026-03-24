import { useState } from 'react';
import { Search, MoreHorizontal, BatteryFull, BatteryMedium, BatteryLow, MapPin, RefreshCw, Unlink } from 'lucide-react';
import { Location05Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react'

const mockDevices = [
	{
		id: 'DEV-8932',
		identifier: '839201934',
		rider: 'Michael Scott',
		model: 'iPhone 14 Pro',
		status: 'Online',
		battery: 84,
		lastUpdate: '2 mins ago',
	},
	{
		id: 'DEV-8933',
		identifier: '839201935',
		rider: 'Dwight Schrute',
		model: 'Samsung Galaxy S23',
		status: 'Online',
		battery: 45,
		lastUpdate: 'Just now',
	},
	{
		id: 'DEV-8934',
		identifier: '839201936',
		rider: 'Unassigned',
		model: 'Google Pixel 7',
		status: 'Offline',
		battery: 12,
		lastUpdate: '2 days ago',
	},
	{
		id: 'DEV-8935',
		identifier: '839201937',
		rider: 'Jim Halpert',
		model: 'iPhone 13',
		status: 'Online',
		battery: 92,
		lastUpdate: '5 mins ago',
	},
    {
		id: 'DEV-8936',
		identifier: '839201938',
		rider: 'Stanley Hudson',
		model: 'Samsung Galaxy A54',
		status: 'Online',
		battery: 100,
		lastUpdate: '1 min ago',
	},
];

const statusStyles = {
	'Online': 'bg-emerald-900/30 text-emerald-400',
	'Offline': 'bg-zinc-800/50 text-zinc-400',
};

const getBatteryIcon = (level: number) => {
	if (level > 80) return <BatteryFull className="w-4 h-4 text-emerald-400" />;
	if (level > 30) return <BatteryMedium className="w-4 h-4 text-amber-400" />;
	return <BatteryLow className="w-4 h-4 text-red-500" />;
};

const DevicesPage = () => {
	const [search, setSearch] = useState('');

	const filteredDevices = mockDevices.filter(d => 
		d.rider.toLowerCase().includes(search.toLowerCase()) || 
		d.id.toLowerCase().includes(search.toLowerCase()) ||
		d.identifier.includes(search) ||
        d.model.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="space-y-6">
			{/* Header section */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-semibold text-zinc-50 tracking-tight">Devices</h1>
					<p className="text-sm text-zinc-500 mt-1">Monitor connected rider phones reporting Traccar location data.</p>
				</div>
				<div className="flex items-center gap-3 w-full sm:w-auto">
					<div className="relative flex-1 sm:flex-none">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
						<input 
							type="text" 
							placeholder="Search devices..." 
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="w-full sm:w-64 pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-shadow text-zinc-400 placeholder:text-zinc-400"
						/>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="space-y-4">
				{/* Desktop Table View */}
				<div className="hidden md:block overflow-visible bg-zinc-900 border border-zinc-800 rounded-md shadow-sm">
					<table className="w-full text-sm text-left">
						<thead className="bg-zinc-950/50 border-b border-zinc-800 text-zinc-400 font-medium">
							<tr>
								<th className="px-6 py-4 font-medium">Device & Identifier</th>
								<th className="px-6 py-4 font-medium">Linked Rider</th>
								<th className="px-6 py-4 font-medium">Status</th>
								<th className="px-6 py-4 font-medium">Battery</th>
								<th className="px-6 py-4 font-medium">Last Update</th>
								<th className="px-6 py-4 font-medium text-right">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-zinc-800 text-zinc-100">
							{filteredDevices.length > 0 ? filteredDevices.map((device) => (
								<tr key={device.id} className="hover:bg-zinc-800/90 transition-colors group">
									<td className="px-6 py-4">
										<div className="flex items-center gap-3">
											<div className="flex flex-col">
												<span className="font-medium text-zinc-100">{device.model}</span>
												<span className="text-zinc-400 text-xs mt-0.5 font-mono">{device.identifier}</span>
											</div>
										</div>
									</td>
									<td className="px-6 py-4">
										<div className="flex items-center gap-2 font-medium text-zinc-300">
											{device.rider !== 'Unassigned' ? (
												<>
														<div className='w-4 h-4 bg-zinc-400 rounded-full flex items-center justify-center border border-emerald-500/30'>
														</div>
														{device.rider}
												</>
											) : (
												<span className="text-zinc-500 italic text-sm">{device.rider}</span>
											)}
										</div>
									</td>
									<td className="px-6 py-4">
										<span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[device.status as keyof typeof statusStyles]}`}>
											{device.status}
										</span>
									</td>
									<td className="px-6 py-4">
										<div className="flex items-center gap-2 text-zinc-300 font-medium">
											{getBatteryIcon(device.battery)}
											<span>{device.battery}%</span>
										</div>
									</td>
									<td className="px-6 py-4">
										<div className="flex items-center text-zinc-500 text-sm">
											{device.lastUpdate}
										</div>
									</td>
									<td className="px-6 py-4 text-right">
										<div className="relative inline-block group/action">
											<button className="p-1.5 text-zinc-400 hover:text-zinc-100 rounded-md hover:bg-zinc-800 transition-colors cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100 group-focus-within/action:opacity-100">
												<MoreHorizontal className="h-4 w-4" />
											</button>
											<div className="absolute right-0 top-[calc(100%+0.25rem)] w-40 bg-zinc-800 border border-zinc-700/50 rounded-xl shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover/action:opacity-100 group-hover/action:visible group-focus-within/action:opacity-100 group-focus-within/action:visible transition-all duration-200 z-50 flex flex-col p-1 gap-0.5 scale-95 group-hover/action:scale-100 group-focus-within/action:scale-100 origin-top-right">
												<button className="flex items-center cursor-pointer gap-2.5 px-2 py-1.5 text-sm text-zinc-300 hover:text-zinc-100 hover:bg-zinc-700/50 rounded-md transition-colors w-full text-left">
													<HugeiconsIcon icon={Location05Icon} size={20} strokeWidth={1.5} />
													View on Map
												</button>
												<button className="flex items-center cursor-pointer gap-2.5 px-2 py-1.5 text-sm text-zinc-300 hover:text-zinc-100 hover:bg-zinc-700/50 rounded-md transition-colors w-full text-left">
													<RefreshCw className="w-4 h-4" />
													Ping Device
												</button>
												{device.rider !== 'Unassigned' && (
													<button className="flex items-center cursor-pointer gap-2.5 px-2 py-1.5 text-sm text-amber-400 hover:text-amber-300 hover:bg-zinc-700/50 rounded-md transition-colors w-full text-left">
														<Unlink className="w-4 h-4" />
														Unlink Rider
													</button>
												)}
											</div>
										</div>
									</td>
								</tr>
							)) : (
								<tr>
									<td colSpan={6} className="px-6 py-8 text-center text-zinc-500 dark:text-zinc-400">
										No devices found matching "{search}"
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

				{/* Mobile Card View */}
				<div className="flex flex-col gap-6 md:hidden pb-2">
					{filteredDevices.length > 0 ? filteredDevices.map((device) => (
						<div key={device.id} className="bg-zinc-900 rounded-xl p-4 space-y-5 border border-zinc-800 shadow-xs">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div>
										<h4 className="text-sm font-medium text-zinc-100">{device.model}</h4>
										<p className="text-zinc-500 text-xs font-mono mt-0.5">{device.identifier}</p>
									</div>
								</div>
								<span className={`inline-flex items-center px-2 py-1.5 rounded-full text-xs font-medium ${statusStyles[device.status as keyof typeof statusStyles]}`}>
									{device.status}
								</span>
							</div>

							<div className="grid grid-cols-2 gap-3 py-3 border-b border-zinc-800/60">
								<div className="space-y-1">
									<div className="flex items-center gap-2 text-sm text-zinc-300 truncate font-medium">
										<div className='w-4 h-4 bg-zinc-400 rounded-full flex items-center justify-center border border-emerald-500/30'>
										</div>
										{device.rider !== 'Unassigned' ? device.rider : <span className="text-zinc-600 italic font-normal">Unassigned</span>}
									</div>
								</div>
								<div className="space-y-1">
									<div className="text-sm text-zinc-300 flex items-center gap-1.5 font-medium">
										{getBatteryIcon(device.battery)}
										{device.battery}%
									</div>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<div className="text-xs text-zinc-500 flex items-center gap-1.5">
									<RefreshCw className="w-3.5 h-3.5" />
									{device.lastUpdate}
								</div>
								<div className="relative group/action">
									<button className="p-1.5 text-zinc-400 hover:text-zinc-100 rounded-md hover:bg-zinc-800 transition-colors cursor-pointer group-focus-within/action:bg-zinc-800 group-focus-within/action:text-zinc-100">
										<MoreHorizontal className="h-4 w-4" />
									</button>
									<div className="absolute right-0 bottom-[calc(100%+0.25rem)] w-40 bg-zinc-800 border border-zinc-700/50 rounded-xl shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover/action:opacity-100 group-hover/action:visible group-focus-within/action:opacity-100 group-focus-within/action:visible transition-all duration-200 z-50 flex flex-col p-1 gap-0.5 scale-95 group-hover/action:scale-100 group-focus-within/action:scale-100 origin-bottom-right">
											<button className="flex items-center cursor-pointer gap-2.5 px-2 py-1.5 text-sm text-zinc-300 hover:text-zinc-100 hover:bg-zinc-700/50 rounded-md transition-colors w-full text-left">
												<MapPin className="w-4 h-4" />
												View on Map
											</button>
											<button className="flex items-center cursor-pointer gap-2.5 px-2 py-1.5 text-sm text-zinc-300 hover:text-zinc-100 hover:bg-zinc-700/50 rounded-md transition-colors w-full text-left">
												<RefreshCw className="w-4 h-4" />
												Ping Device
											</button>
											{device.rider !== 'Unassigned' && (
												<button className="flex items-center cursor-pointer gap-2.5 px-2 py-1.5 text-sm text-amber-400 hover:text-amber-300 hover:bg-zinc-700/50 rounded-md transition-colors w-full text-left">
													<Unlink className="w-4 h-4" />
													Unlink Rider
												</button>
											)}
									</div>
								</div>
							</div>
						</div>
					)) : (
						<div className="p-6 text-center text-sm text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-md">
							No devices found matching "{search}"
						</div>
					)}
				</div>
			</div>

		</div>
	);
};

export default DevicesPage;