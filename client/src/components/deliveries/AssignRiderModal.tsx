import { useState, useEffect } from 'react';
import { Loader2, User, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '@/lib/axios';
import { toast } from 'sonner';

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
   onRiderAssigned
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
         const response = await api.get('/riders/all');
         // Filter riders: not on delivery and has a linked device
         const eligibleRiders = response.data.filter((rider: any) => 
            rider.status !== 'on_delivery' && rider.device
         );
         setRiders(eligibleRiders);
      } catch (error) {
         console.error('Error fetching riders:', error);
         toast.error('Failed to load eligible riders');
      } finally {
         setLoading(false);
      }
   };

   const handleAssign = async (riderId: number) => {
      setAssigningId(riderId);
      try {
         await api.patch(`/deliveries/${deliveryId}/assign`, { riderId });
         toast.success('Rider assigned successfully');
         onRiderAssigned();
         onClose();
      } catch (error: any) {
         console.error('Error assigning rider:', error);
         const errorMsg = error.response?.data?.error || 'Failed to assign rider';
         toast.error(errorMsg);
      } finally {
         setAssigningId(null);
      }
   };

   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
         <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-lg shadow-sm animate-in zoom-in duration-200 overflow-hidden">
            <div className="p-6 border-b border-zinc-800">
               <h2 className="text-xl font-semibold text-zinc-100 mb-1">Assign Rider</h2>
               <p className="text-sm text-zinc-500">Select an available rider with a linked device.</p>
            </div>
            
            <div className="max-h-[400px] overflow-y-auto p-2">
               {loading ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-3">
                     <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                     <p className="text-sm text-zinc-500">Loading available riders...</p>
                  </div>
               ) : riders.length > 0 ? (
                  <div className="space-y-1">
                     {riders.map((rider) => (
                        <button
                           key={rider.id}
                           onClick={() => handleAssign(rider.id)}
                           disabled={assigningId !== null}
                           className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-zinc-800 transition-colors text-left group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700 group-hover:border-emerald-500/50 transition-colors">
                                 <User className="w-5 h-5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                              </div>
                              <div>
                                 <h4 className="text-sm font-medium text-zinc-100">
                                    {rider.firstName} {rider.lastName}
                                 </h4>
                                 <div className="flex items-center gap-2 mt-0.5">
                                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${rider.status === 'online' ? 'bg-emerald-900/30 text-emerald-400' : 'bg-zinc-800 text-zinc-400'}`}>
                                       {rider.status}
                                    </span>
                                 </div>
                              </div>
                           </div>
                           
                           {assigningId === rider.id ? (
                              <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
                           ) : (
                              <CheckCircle2 className="w-5 h-5 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                           )}
                        </button>
                     ))}
                  </div>
               ) : (
                  <div className="flex flex-col items-center justify-center py-12 px-6 text-center gap-3">
                     <AlertCircle className="w-10 h-10 text-zinc-700" />
                     <p className="text-sm text-zinc-400">No eligible riders found. Make sure riders are online, not on delivery, and have a device linked.</p>
                  </div>
               )}
            </div>

            <div className="p-4 flex justify-end">
               <button 
                  type="button"
                  onClick={onClose}
                  className="w-fit px-4 py-2.5 rounded-md border border-zinc-800 text-zinc-400 hover:bg-zinc-800 transition-colors cursor-pointer"
               >
                  Cancel
               </button>
            </div>
         </div>
      </div>
   );
};

export default AssignRiderModal;
