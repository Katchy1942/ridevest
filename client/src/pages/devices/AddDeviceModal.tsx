import { Loader2 } from 'lucide-react';
import AddDeviceSuccess from './AddDeviceSuccess';

interface AddDeviceModalProps {
   isOpen: boolean;
   onClose: () => void;
   onSubmit: (e: React.FormEvent) => void;
   deviceForm: any;
   setDeviceForm: (form: any) => void;
   isSubmitting: boolean;
   riders: any[];
   fetchingRiders: boolean;
   isSuccess: boolean;
   registeredDevice: any;
}

const AddDeviceModal = ({ 
   isOpen, 
   onClose, 
   onSubmit, 
   deviceForm, 
   setDeviceForm, 
   isSubmitting,
   riders,
   fetchingRiders,
   isSuccess,
   registeredDevice
}: AddDeviceModalProps) => {
   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-300">
         <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-lg shadow-sm overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[calc(100dvh-2rem)] sm:max-h-[90vh]">
            <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar">
               {isSuccess ? (
                  <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                     <h2 className="text-xl font-semibold text-zinc-100 mb-1">Add New Device</h2>
                     <p className="text-sm text-zinc-500 mb-6">Link a new device to your platform and assign it to a rider.</p>
                     
                     <form onSubmit={onSubmit} className="space-y-4">
                        <div className="space-y-1.5 text-left flex flex-col items-start w-full">
                           <label className="text-xs text-zinc-400">Unique ID (Random)</label>
                           <input 
                              type="text" 
                              required
                              placeholder="e.g. 839201934"
                              value={deviceForm.uniqueId}
                              onChange={e => setDeviceForm({...deviceForm, uniqueId: e.target.value})}
                              className="w-full px-4 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors"
                           />
                        </div>
                        
                        <div className="space-y-1.5 text-left flex flex-col items-start w-full">
                           <label className="text-xs text-zinc-400">Device Name (Model)</label>
                           <input 
                              type="text" 
                              required
                              placeholder="e.g. iPhone 14 Pro"
                              value={deviceForm.name}
                              onChange={e => setDeviceForm({...deviceForm, name: e.target.value})}
                              className="w-full px-4 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors"
                           />
                        </div>

                        <div className="space-y-1.5 text-left flex flex-col items-start w-full">
                           <label className="text-xs text-zinc-400">Assign Rider</label>
                           <select 
                              className="w-full px-4 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 transition-colors appearance-none cursor-pointer"
                              value={deviceForm.linkedRiderId}
                              onChange={e => setDeviceForm({...deviceForm, linkedRiderId: e.target.value})}
                           >
                              <option value="">Unassigned</option>
                              {fetchingRiders ? (
                                 <option disabled>Loading riders...</option>
                              ) : riders.length > 0 ? (
                                 riders.map(rider => (
                                    <option key={rider.id} value={rider.id}>
                                       {rider.firstName} {rider.lastName} ({rider.phoneNumber})
                                    </option>
                                 ))
                              ) : (
                                 <option disabled>No unassigned riders found</option>
                              )}
                           </select>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4 font-medium">
                           <button 
                              type="button"
                              onClick={onClose}
                              className="order-2 sm:order-1 flex-1 px-4 py-2 rounded-md border border-zinc-800 text-zinc-400 hover:bg-zinc-800 transition-colors cursor-pointer"
                           >
                              Cancel
                           </button>
                           <button 
                              type="submit"
                              disabled={isSubmitting}
                              className="order-1 sm:order-2 flex-1 px-4 py-2 rounded-md bg-emerald-600 text-zinc-100 hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                           >
                              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                              Add Device
                           </button>
                        </div>
                     </form>
                  </div>
               ) : (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                     <AddDeviceSuccess 
                        device={registeredDevice} 
                        onClose={onClose} 
                        riderName={riders.find(r => r.id === registeredDevice?.linkedRiderId) 
                          ? `${riders.find(r => r.id === registeredDevice?.linkedRiderId).firstName} ${riders.find(r => r.id === registeredDevice?.linkedRiderId).lastName}`
                          : 'the rider'
                        }
                      />
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default AddDeviceModal;
