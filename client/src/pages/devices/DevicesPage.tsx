import { MoreHorizontal, BatteryFull, BatteryMedium, BatteryLow, MapPin, RefreshCw, Unlink, Plus } from 'lucide-react';
import { Location05Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react'
import { useDeviceHandlers } from '@/handlers/deviceHandlers';
import AddDeviceModal from './AddDeviceModal';

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
	const {
		devices,
		loading,
		showAddModal,
		setShowAddModal,
		newDevice,
		setNewDevice,
		isSubmitting,
		riders,
		fetchingRiders,
		handleAddDevice,
		handleDeleteDevice,
		isSuccess,
		registeredDevice
	} = useDeviceHandlers();

	return (
		<div className="space-y-6">
			{/* Header section */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-semibold text-zinc-50 tracking-tight">Devices</h1>
					<p className="text-sm text-zinc-500 mt-1">Monitor connected rider phones reporting Traccar location data.</p>
				</div>
				<div className="flex items-center gap-3 w-full sm:w-auto">
					<button 
						onClick={() => setShowAddModal(true)}
						className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-zinc-50 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm cursor-pointer"
					>
						<Plus className="h-4 w-4" />
						Add Device
					</button>
				</div>
			</div>

			{/* Main Content */}
			<div className="space-y-4">
				{/* Desktop Table View */}
				<div className="hidden md:block overflow-visible bg-zinc-900 rounded-md shadow-sm">
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
							{devices.length > 0 ? devices.map((device) => {
						const riderName = device.rider ? `${device.rider.firstName} ${device.rider.lastName}` : 'Unassigned';
						return (
							<tr key={device.id} className="hover:bg-zinc-800/90 transition-colors group">
								<td className="px-6 py-4">
									<div className="flex items-center gap-3">
										<div className="flex flex-col">
											<span className="font-medium text-zinc-100">{device.name}</span>
											<span className="text-zinc-400 text-xs mt-0.5 font-mono">{device.uniqueId}</span>
										</div>
									</div>
								</td>
								<td className="px-6 py-4">
									<div className="flex items-center gap-2 font-medium text-zinc-300">
										{riderName !== 'Unassigned' ? (
											<>
												<div className='w-4 h-4 bg-zinc-400 rounded-full flex items-center justify-center border border-emerald-500/30'>
												</div>
												{riderName}
											</>
										) : (
											<span className="text-zinc-500 italic text-sm">{riderName}</span>
										)}
									</div>
								</td>
								<td className="px-6 py-4">
									<span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[(device.status || 'Offline') as keyof typeof statusStyles]}`}>
										{device.status || 'Offline'}
									</span>
								</td>
								<td className="px-6 py-4">
									<div className="flex items-center gap-2 text-zinc-300 font-medium">
										{getBatteryIcon(device.battery || 0)}
										<span>{device.battery || 0}%</span>
									</div>
								</td>
								<td className="px-6 py-4">
									<div className="flex items-center text-zinc-500 text-sm">
										{device.lastUpdate || 'Never'}
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
											{device.rider && (
												<button className="flex items-center cursor-pointer gap-2.5 px-2 py-1.5 text-sm text-amber-400 hover:text-amber-300 hover:bg-zinc-700/50 rounded-md transition-colors w-full text-left">
													<Unlink className="w-4 h-4" />
													Unlink Rider
												</button>
											)}
											<button 
												onClick={() => handleDeleteDevice(device.id)}
												className="flex items-center cursor-pointer gap-2.5 px-2 py-1.5 text-sm text-red-400 hover:text-red-300 hover:bg-zinc-700/50 rounded-md transition-colors w-full text-left"
											>
												<MoreHorizontal className="w-4 h-4" />
												Delete Device
											</button>
										</div>
									</div>
								</td>
							</tr>);
							}) : (
								<tr>
									<td colSpan={6} className="px-6 py-8 text-center text-zinc-500 dark:text-zinc-400">
										{loading ? 'Loading devices...' : 'No devices found'}
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

				{/* Mobile Card View */}
				<div className="flex flex-col gap-6 md:hidden pb-2">
					{devices.length > 0 ? devices.map((device) => {
                  const riderName = device.rider ? `${device.rider.firstName} ${device.rider.lastName}` : 'Unassigned';
						return (
							<div key={device.id} className="bg-zinc-900 rounded-xl p-4 space-y-5 border border-zinc-800 shadow-xs">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div>
											<h4 className="text-sm font-medium text-zinc-100">{device.name}</h4>
											<p className="text-zinc-500 text-xs font-mono mt-0.5">{device.uniqueId}</p>
										</div>
									</div>
									<span className={`inline-flex items-center px-2 py-1.5 rounded-full text-xs font-medium ${statusStyles[(device.status || 'Offline') as keyof typeof statusStyles]}`}>
										{device.status || 'Offline'}
									</span>
								</div>

								<div className="grid grid-cols-2 gap-3 py-3 border-b border-zinc-800/60">
									<div className="space-y-1">
										<div className="flex items-center gap-2 text-sm text-zinc-300 truncate font-medium">
											<div className='w-4 h-4 bg-zinc-400 rounded-full flex items-center justify-center border border-emerald-500/30'>
											</div>
											{riderName !== 'Unassigned' ? riderName : <span className="text-zinc-600 italic font-normal">Unassigned</span>}
										</div>
									</div>
									<div className="space-y-1">
										<div className="text-sm text-zinc-300 flex items-center gap-1.5 font-medium">
											{getBatteryIcon(device.battery || 0)}
											{device.battery || 0}%
										</div>
									</div>
								</div>

								<div className="flex items-center justify-between">
									<div className="text-xs text-zinc-500 flex items-center gap-1.5">
										<RefreshCw className="w-3.5 h-3.5" />
										{device.lastUpdate || 'Never'}
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
											{device.rider && (
												<button className="flex items-center cursor-pointer gap-2.5 px-2 py-1.5 text-sm text-amber-400 hover:text-amber-300 hover:bg-zinc-700/50 rounded-md transition-colors w-full text-left">
													<Unlink className="w-4 h-4" />
													Unlink Rider
												</button>
											)}
												<button 
													onClick={() => handleDeleteDevice(device.id)}
													className="flex items-center cursor-pointer gap-2.5 px-2 py-1.5 text-sm text-red-400 hover:text-red-300 hover:bg-zinc-700/50 rounded-md transition-colors w-full text-left"
												>
													<MoreHorizontal className="w-4 h-4" />
													Delete Device
												</button>
										</div>
									</div>
								</div>
							</div>
						);
               }) : (
						<div className="p-6 text-center text-sm text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-md">
							{loading ? 'Loading devices...' : 'No devices found'}
						</div>
					)}
				</div>
			</div>

			<AddDeviceModal 
				isOpen={showAddModal}
				onClose={() => setShowAddModal(false)}
				onSubmit={handleAddDevice}
				deviceForm={newDevice}
				setDeviceForm={setNewDevice}
				isSubmitting={isSubmitting}
				riders={riders}
				fetchingRiders={fetchingRiders}
				isSuccess={isSuccess}
				registeredDevice={registeredDevice}
			/>
		</div>
	);
};

export default DevicesPage;