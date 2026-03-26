const fullTimeline = [
   {
      date: 'Today — Mar 25, 2026',
      entries: [
         { time: '09:32 AM', event: 'Rider is in transit', detail: 'ETA ~18 min to drop-off', active: true },
         { time: '09:15 AM', event: 'Items Picked Up', detail: 'Confirmed at 12 Allen Avenue, Ikeja' },
         { time: '09:02 AM', event: 'Rider arrived at pickup', detail: 'Rahim Ladón checked in' },
         { time: '09:00 AM', event: 'Rider Assigned', detail: 'Rahim Ladón accepted the delivery' },
         { time: '08:50 AM', event: 'Finding a rider', detail: 'Searching nearby riders...' },
         { time: '08:47 AM', event: 'Payment Confirmed', detail: '₦4,200 via Paystack' },
         { time: '08:45 AM', event: 'Order Placed', detail: 'Delivery request submitted' },
      ],
   },
];

interface DeliveryTimelineProps {
   onBack: () => void;
}

const DeliveryTimeline = ({ onBack }: DeliveryTimelineProps) => {
   return (
      <div className="flex flex-col h-full overflow-y-auto hide-scrollbar">
         <div className="px-4 pt-4 pb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-zinc-200">Full Timeline</h3>
            <button
               onClick={onBack}
               className="text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
            >
               ← Back
            </button>
         </div>

         <hr className="border-zinc-700/60 mx-4" />

         {fullTimeline.map((day, di) => (
            <div key={di} className="px-4 py-3">
               <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-3">{day.date}</p>
               <div className="space-y-0">
                  {day.entries.map((entry, i) => (
                     <div key={i} className="flex gap-3 items-start relative">
                        <div className="flex flex-col items-center">
                           <div className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 border-2 ${
                              entry.active
                                 ? 'bg-emerald-400 border-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]'
                                 : 'bg-transparent border-zinc-600'
                           }`} />
                           {i < day.entries.length - 1 && (
                              <div className="w-px h-8 bg-zinc-700/50" />
                           )}
                        </div>
                        <div className="pb-4 min-w-0">
                           <div className="flex items-baseline gap-2">
                              <p className={`text-xs font-medium ${
                                 entry.active ? 'text-emerald-400' : 'text-zinc-200'
                              }`}>
                                 {entry.event}
                              </p>
                              <span className="text-[10px] text-zinc-500 shrink-0">{entry.time}</span>
                           </div>
                           {entry.detail && (
                              <p className="text-[11px] text-zinc-500 mt-0.5 leading-snug">{entry.detail}</p>
                           )}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         ))}
      </div>
   );
};

export default DeliveryTimeline;
