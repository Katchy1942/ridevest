import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar';
import { HugeiconsIcon } from '@hugeicons/react';
import { Call02Icon, Chatting01Icon, Copy01Icon } from '@hugeicons/core-free-icons';
import { Bike } from 'lucide-react';

const ORDER_ID = 'RV_091231';

const orderLog = [
   { time: '08:45 AM', event: 'Order Placed', active: false },
   { time: '09:00 AM', event: 'Rider Assigned', active: false },
   { time: '09:15 AM', event: 'Items Picked Up', active: false },
   { time: '09:32 AM', event: 'Rider is in transit', active: true },
];

const deliveryDetails = {
   courier: 'GIG Logistics',
   pickup: '12 Allen Avenue, Ikeja, Lagos',
   destination: '45 Admiralty Way, Lekki, Lagos',
   transport: 'Bike',
   weight: '2.5 kg',
   sender: { name: 'Tunde Bakare', phone: '080 1234 5678' },
   recipient: { name: 'Adaeze Obi', phone: '070 9876 5432' },
   notes: 'Handle with care — fragile electronics inside.',
};

interface DeliveryInfoPanelProps {
   onViewTimeline?: () => void;
}

const DeliveryInfoPanel = ({ onViewTimeline }: DeliveryInfoPanelProps) => {
   const [copied, setCopied] = useState(false);

   const handleCopy = () => {
      navigator.clipboard.writeText(ORDER_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
   };

   return (
      <div className="flex flex-col h-full overflow-y-auto hide-scrollbar">
         {/* Order Status */}
         <div className="px-4 pt-4 pb-3">
            <div className="flex items-center gap-1.5 mb-1">
               <p className="text-[10px] font-mono underline uppercase tracking-widest text-zinc-500">{ORDER_ID}</p>
               <button onClick={handleCopy} className="relative cursor-pointer" title="Copy order ID">
                  <HugeiconsIcon icon={Copy01Icon} size={12} className={copied ? 'text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'} />
                  {copied && (
                     <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] text-emerald-400 whitespace-nowrap">Copied!</span>
                  )}
               </button>
            </div>
            <h2 className="text-lg font-bold text-emerald-400 leading-tight">ON THE WAY</h2>
            <p className="text-xs text-zinc-400 mt-1">
               Your order from <span className="text-zinc-200 font-medium">Gadgets Hub</span> is arriving.
            </p>
         </div>

         <hr className="border-zinc-700/60 mx-4" />

         {/* Order Timeline */}
         <div className="px-4 py-3">
            <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-3">Order Log</p>
            <div className="space-y-0">
               {orderLog.map((entry, i) => (
                  <div key={i} className="flex gap-3 items-start relative">
                     <div className="flex flex-col items-center">
                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                           entry.active ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]' : 'bg-zinc-600'
                        }`} />
                        {i < orderLog.length - 1 && (
                           <div className="w-px h-5 bg-zinc-700" />
                        )}
                     </div>
                     <div className="pb-3">
                        <p className="text-[11px] text-zinc-500 leading-none">{entry.time}</p>
                        <p className={`text-xs leading-none mt-1 ${
                           entry.active ? 'text-emerald-400 font-semibold' : 'text-zinc-300'
                        }`}>
                           {entry.event}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
            {onViewTimeline && (
               <button
                  onClick={onViewTimeline}
                  className="mt-2 text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
               >
                  View all →
               </button>
            )}
         </div>

         <hr className="border-zinc-700/60 mx-4" />

         {/* Rider Profile */}
         <div className="px-4 py-3">
            <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-2">Rider Profile</p>
            <div className="flex items-center gap-3">
               <Avatar className="h-9 w-9">
                  <AvatarImage src="https://i.pravatar.cc/150?u=man3" alt="Rahim Ladón" />
                  <AvatarFallback className="bg-emerald-900/30 text-emerald-400 text-xs">RL</AvatarFallback>
               </Avatar>
               <div className="flex-1 min-w-0">
                  <p className="text-sm text-zinc-200 font-medium truncate">Rahim Ladón</p>
                  <p className="text-[11px] text-zinc-500">Since Jan 14, 2025</p>
               </div>
               <div className="flex gap-1.5">
                  <button className="p-1.5 rounded-lg bg-emerald-900/20 hover:bg-emerald-900/40 transition-colors cursor-pointer">
                     <HugeiconsIcon icon={Call02Icon} size={14} className="text-emerald-400" />
                  </button>
                  <button className="p-1.5 rounded-lg bg-emerald-900/20 hover:bg-emerald-900/40 transition-colors cursor-pointer">
                     <HugeiconsIcon icon={Chatting01Icon} size={14} className="text-emerald-400" />
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
                  <p className="text-xs text-zinc-200 leading-snug">{deliveryDetails.pickup}</p>
               </div>

               <div className="relative">
                  <div className="absolute -left-5 top-1 w-2 h-2 rounded-full bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.4)]" />
                  <p className="text-[10px] uppercase tracking-wider text-zinc-500">Drop-off</p>
                  <p className="text-xs text-zinc-200 leading-snug">{deliveryDetails.destination}</p>
               </div>
            </div>
         </div>

         <hr className="border-zinc-700/60 mx-4" />

         {/* Delivery Info */}
         <div className="px-4 py-3">
            <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-2">Delivery Info</p>
            <div className="space-y-2">
               {[
                  { label: 'Courier', value: deliveryDetails.courier },
                  { label: 'Transport', value: deliveryDetails.transport, icon: true },
                  { label: 'Weight', value: deliveryDetails.weight },
               ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center">
                     <span className="text-xs text-zinc-500">{row.label}</span>
                     <span className="text-xs text-zinc-200 flex items-center gap-1.5">
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
                  { role: 'Sender', ...deliveryDetails.sender },
                  { role: 'Recipient', ...deliveryDetails.recipient },
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
         {deliveryDetails.notes && (
            <>
               <hr className="border-zinc-700/60 mx-4" />
               <div className="px-4 py-3">
                  <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-1">Notes</p>
                  <p className="text-xs text-zinc-300 italic leading-relaxed">{deliveryDetails.notes}</p>
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
