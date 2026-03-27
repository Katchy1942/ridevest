import { useState } from 'react';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { HugeiconsIcon } from '@hugeicons/react';
import { Call02Icon, Copy01Icon } from '@hugeicons/core-free-icons';
import { Bike } from 'lucide-react';

interface DeliveryInfoPanelProps {
   delivery: any;
   onViewTimeline?: () => void;
}

const DeliveryInfoPanel = ({ delivery, onViewTimeline }: DeliveryInfoPanelProps) => {
   const [copied, setCopied] = useState(false);

   if (!delivery) return null;

   const handleCopy = () => {
      navigator.clipboard.writeText(delivery.trackingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
   };

   const riderName = delivery.rider ? `${delivery.rider.firstName} ${delivery.rider.lastName}` : 'Unassigned';
   const riderInitials = delivery.rider ? `${delivery.rider.firstName[0]}${delivery.rider.lastName[0]}` : 'UN';

   return (
      <div className="flex flex-col h-full overflow-y-auto hide-scrollbar">
         {/* Order Status */}
         <div className="px-4 pt-4 pb-3">
            <div className="flex items-center gap-1.5 mb-1">
               <p className="text-[10px] font-mono underline uppercase tracking-widest text-zinc-500">{delivery.trackingId}</p>
               <button onClick={handleCopy} className="relative cursor-pointer" title="Copy order ID">
                  <HugeiconsIcon icon={Copy01Icon} size={12} className={copied ? 'text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'} />
                  {copied && (
                     <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] text-emerald-400 whitespace-nowrap">Copied!</span>
                  )}
               </button>
            </div>
            <h2 className="text-lg font-bold text-emerald-400 leading-tight uppercase">{delivery.status || 'PROCESSING'}</h2>
            <p className="text-xs text-zinc-400 mt-1">
               Your order from <span className="text-zinc-200 font-medium">{delivery.businessName || 'the sender'}</span> is {delivery.status?.toLowerCase()}.
            </p>
         </div>

         <hr className="border-zinc-700/60 mx-4" />

         {onViewTimeline && (
            <div className="px-4 py-3">
               <button
                  onClick={onViewTimeline}
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
               >
                  View full timeline →
               </button>
            </div>
         )}

         {/* Rider Profile */}
         <div className="px-4 py-3">
            <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-2">Rider Profile</p>
            <div className="flex items-center gap-3">
               <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-emerald-900/30 text-emerald-400 text-xs">{riderInitials}</AvatarFallback>
               </Avatar>
               <div className="flex-1 min-w-0">
                  <p className="text-sm text-zinc-200 font-medium truncate">{riderName}</p>
                  <p className="text-[11px] text-zinc-500">RideVest Partner</p>
               </div>
               <div className="flex gap-1.5">
                  <button className="p-1.5 rounded-lg bg-emerald-900/20 hover:bg-emerald-900/40 transition-colors cursor-pointer">
                     <HugeiconsIcon icon={Call02Icon} size={14} className="text-emerald-400" />
                  </button>
               </div>
            </div>
         </div>

         <hr className="border-zinc-700/60 mx-4" />

         {/* Route Details */}
         <div className="px-4 py-3">
            <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-2">Route</p>
            <div className="relative pl-5 space-y-0">
               <div className="absolute left-[3px] top-2 bottom-6 w-px bg-zinc-700" />

               <div className="relative pb-4">
                  <div className="absolute -left-5 top-1 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.4)]" />
                  <p className="text-[10px] uppercase tracking-wider text-zinc-500">Pickup</p>
                  <p className="text-xs text-zinc-200 leading-snug">{delivery.pickupLocation}</p>
               </div>

               <div className="relative">
                  <div className="absolute -left-5 top-1 w-2 h-2 rounded-full bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.4)]" />
                  <p className="text-[10px] uppercase tracking-wider text-zinc-500">Drop-off</p>
                  <p className="text-xs text-zinc-200 leading-snug">{delivery.dropoffLocation}</p>
               </div>
            </div>
         </div>

         <hr className="border-zinc-700/60 mx-4" />

         {/* Delivery Info */}
         <div className="px-4 py-3">
            <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-2">Delivery Info</p>
            <div className="space-y-2">
               {[
                  { label: 'Transport', value: delivery.vehicleType, icon: true },
                  { label: 'Weight', value: `${delivery.weightEstimate} kg` },
                  { label: 'Distance', value: `${delivery.distance} km` },
               ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center">
                     <span className="text-xs text-zinc-500">{row.label}</span>
                     <span className="text-xs text-zinc-200 flex items-center gap-1.5 uppercase">
                        {row.icon && <Bike size={12} className="text-emerald-400" />}
                        {row.value}
                     </span>
                  </div>
               ))}
            </div>
         </div>

         <hr className="border-zinc-700/60 mx-4" />

         {/* Sender & Recipient */}
         <div className="px-4 py-3">
            <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-2">People</p>
            <div className="space-y-3">
               {[
                  { role: 'Sender', name: delivery.senderName, phone: delivery.senderPhone },
                  { role: 'Recipient', name: delivery.receiverName, phone: delivery.receiverPhone },
               ].map((person) => (
                  <div key={person.role} className="flex justify-between items-center">
                     <div>
                        <p className="text-[10px] text-zinc-500 uppercase">{person.role}</p>
                        <p className="text-xs text-zinc-200">{person.name}</p>
                     </div>
                     <span className="text-[11px] text-zinc-400">{person.phone}</span>
                  </div>
               ))}
            </div>
         </div>

         {/* Notes */}
         {delivery.description && (
            <>
               <hr className="border-zinc-700/60 mx-4" />
               <div className="px-4 py-3">
                  <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-1">Notes</p>
                  <p className="text-xs text-zinc-300 italic leading-relaxed">{delivery.description}</p>
               </div>
            </>
         )}

         {/* Action Buttons */}
         <div className="px-4 py-3 mt-auto flex gap-2">
            <button className="flex-1 text-xs py-2 rounded-lg border border-zinc-600 text-zinc-300 hover:bg-zinc-700 transition-colors cursor-pointer">
               Report Issue
            </button>
            <button className="flex-1 text-xs py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-colors cursor-pointer">
               Rate Rider
            </button>
         </div>
      </div>
   );
};

export default DeliveryInfoPanel;
