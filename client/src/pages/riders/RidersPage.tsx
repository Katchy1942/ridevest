import { MoreHorizontal, Plus, Edit2, XCircle, ChevronRight, Loader2 } from 'lucide-react';
import { useRiderHandlers } from '@/handlers/riderHandlers';
import AddRiderModal from './AddRiderModal';

const statusStyles = {
	'online': 'text-emerald-400',
	'offline': 'text-zinc-400',
	'on_delivery': 'text-blue-400',
};

const formatStatus = (status: string) => {
   if (status === 'on_delivery') return 'On Delivery';
   return status.charAt(0).toUpperCase() + status.slice(1);
}

const RidersPage = () => {
   const {
      riders,
      loading,
      showAddModal,
      setShowAddModal,
      newRider,
      setNewRider,
      isSubmitting,
      handleUpdateStatus,
      handleRemoveRider,
      handleAddRider
   } = useRiderHandlers();

	return (
		<div className="space-y-6">
			{/* Header section */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-semibold text-zinc-50 tracking-tight">Riders</h1>
					<p className="text-sm text-zinc-500 mt-1">Manage your delivery personnel and view their statuses.</p>
				</div>
				<div className="flex items-center gap-3 w-full sm:w-auto">
					<button 
                  onClick={() => setShowAddModal(true)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-zinc-50 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm cursor-pointer"
               >
						<Plus className="h-4 w-4" />
						Add New Rider
					</button>
				</div>
			</div>

			{/* Main Content - Grid of Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
				{loading ? (
               <div className="col-span-full flex justify-center py-12">
                  <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
               </div>
            ) : riders.length > 0 ? riders.map((rider) => (
					<div key={rider.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xs hover:border-zinc-700 transition-colors group">
						<div className="flex items-start justify-between mb-5">
							<div className="flex items-center gap-3">
								<div className="h-10 w-10 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-300 font-medium border border-zinc-700">
									{rider.firstName.charAt(0)}
								</div>
								<div>
									<h3 className="text-zinc-100 font-medium text-sm">{rider.firstName} {rider.lastName}</h3>
									<p className={`text-[12px] font-medium opacity-70 ${statusStyles[rider.status as keyof typeof statusStyles]}`}>{formatStatus(rider.status)}</p>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<div className="relative inline-block group/action">
									<button className="p-1.5 text-zinc-400 hover:text-zinc-100 rounded-md hover:bg-zinc-800 transition-colors cursor-pointer group-focus-within/action:bg-zinc-800 group-focus-within/action:text-zinc-100 focus:outline-none">
										<MoreHorizontal className="h-4 w-4" />
									</button>
									<div className="absolute right-0 top-[calc(100%+0.25rem)] w-44 bg-zinc-800 border border-zinc-700/50 rounded-xl shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover/action:opacity-100 group-hover/action:visible group-focus-within/action:opacity-100 group-focus-within/action:visible transition-all duration-200 z-50 flex flex-col p-1 gap-0.5 scale-95 group-hover/action:scale-100 group-focus-within/action:scale-100 origin-top-right">
										<div className="relative flex flex-col group/status">
											<button className="flex items-center cursor-pointer justify-between px-2 py-1.5 text-sm text-zinc-300 hover:text-zinc-100 hover:bg-zinc-700/50 rounded-md transition-colors w-full text-left">
												<div className="flex items-center gap-2.5">
													<Edit2 className="w-4 h-4" />
													Update Status
												</div>
												<ChevronRight className="w-4 h-4" />
											</button>
											<div className="absolute right-[calc(100%+0.5rem)] -top-1.5 w-36 bg-zinc-800 border border-zinc-700/50 rounded-xl shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover/status:opacity-100 group-hover/status:visible group-focus-within/status:opacity-100 group-focus-within/status:visible transition-all duration-200 z-50 flex flex-col p-1 gap-0.5 scale-95 group-hover/status:scale-100 group-focus-within/status:scale-100 origin-top-right">
												<button onClick={() => handleUpdateStatus(rider.id, 'online')} className="px-2 py-1.5 text-sm cursor-pointer text-emerald-400 hover:text-emerald-300 hover:bg-zinc-700/50 rounded-md transition-colors w-full text-left">Online</button>
												<button onClick={() => handleUpdateStatus(rider.id, 'on_delivery')} className="px-2 py-1.5 text-sm cursor-pointer text-blue-400 hover:text-blue-300 hover:bg-zinc-700/50 rounded-md transition-colors w-full text-left">On Delivery</button>
												<button onClick={() => handleUpdateStatus(rider.id, 'offline')} className="px-2 py-1.5 text-sm cursor-pointer text-zinc-400 hover:text-zinc-300 hover:bg-zinc-700/50 rounded-md transition-colors w-full text-left">Offline</button>
											</div>
										</div>
										<button onClick={() => handleRemoveRider(rider.id)} className="flex items-center cursor-pointer gap-2.5 px-2 py-1.5 text-sm text-red-400 hover:text-red-300 hover:bg-zinc-700/50 rounded-md transition-colors w-full text-left">
											<XCircle className="w-4 h-4" />
											Remove Rider
										</button>
									</div>
								</div>
							</div>
						</div>
						
						<div className="space-y-3">
							<div className="flex items-center justify-between text-sm">
								<span className="text-zinc-500 text-xs text font-medium">Total Deliveries</span>
								<span className="text-zinc-300 font-medium">{rider.deliveryCount || 0}</span>
							</div>
							<div className="flex items-center justify-between text-sm">
								<span className="text-zinc-500 text-xs font-medium">Rating</span>
								<div className="flex items-center gap-1">
									<span className="text-amber-400 text-xs">★</span>
									<span className="text-zinc-300 font-medium">4.5</span>
								</div>
							</div>
						</div>
					</div>
				)) : (
               <div className="col-span-full text-center py-12 text-zinc-500">
                  No riders found. Add your first rider to get started.
               </div>
            )}
			</div>

         <AddRiderModal 
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            onSubmit={handleAddRider}
            riderForm={newRider}
            setRiderForm={setNewRider}
            isSubmitting={isSubmitting}
         />
		</div>
	);
};

export default RidersPage;