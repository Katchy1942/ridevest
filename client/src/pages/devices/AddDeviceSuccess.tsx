import { HugeiconsIcon } from '@hugeicons/react'
import { CheckmarkCircle01Icon } from '@hugeicons/core-free-icons';
import { useNavigate } from 'react-router-dom';

interface AddDeviceSuccessProps {
   device: any;
   onClose: () => void;
   riderName: string;
}

const AddDeviceSuccess = ({ device, onClose, riderName }: AddDeviceSuccessProps) => {
   const navigate = useNavigate();

   return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
         <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
               <div className="w-20 h-20 flex items-center justify-center text-emerald-500 transition-transform duration-300">
                  <HugeiconsIcon icon={CheckmarkCircle01Icon} className="w-12 h-12 text-emerald-500 relative z-10" />
               </div>
            </div>
            
            <div className="space-y-1.5">
               <h2 className="text-2xl font-bold text-zinc-50 tracking-tight">Device Connected!</h2>
               <p className="text-sm text-zinc-400 max-w-[300px] leading-relaxed">
                  <span className="text-white bg-zinc-800 px-1.5 py-0.5 rounded font-medium">{device?.name || 'Device'}</span> is now fully registered and linked to <span className="text-zinc-200 font-medium">{riderName}</span>.
               </p>
            </div>
         </div>

         {/* Steps section */}
         <div>
            <h4 className="text-xl font-medium text-zinc-300 text-center">Configuration Steps</h4>
            <div className="grid gap-4">
               {[
                  { 
                     title: 'App Setup', 
                     text: <span>Download the <a href="https://play.google.com/store/apps/details?id=org.traccar.client&pcampaignid=web_share" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">Traccar Client app</a> on the rider's phone.</span> 
                  },
                  { 
                     title: 'Identifier',
                     text: <span>Set Device Identifier to: <span className="text-zinc-100 font-mono font-bold tracking-wider">{device?.uniqueId || 'Unique ID'}</span></span> 
                  },
                  { 
                     title: 'Service',
                     text: <span>Set URL to: <span className="text-emerald-500">{`http://34.59.38.66:5055`}</span></span> 
                  },
               ].map((step, i) => (
                  <div 
                     key={i} 
                     className={`flex gap-4 p-4 bg-zinc-900/50 transition-all`}
                  >
                     <div className="flex-none w-8 h-8 flex items-center justify-center text-xs font-bold text-zinc-400 group-hover/item:text-emerald-500 group-hover/item:border-emerald-500/30 transition-all">
                        {i + 1}
                     </div>
                     <div className="space-y-0.5">
                        <p className="text-xs font-bold text-zinc-200">{step.title}</p>
                        <div className="text-sm text-zinc-500 leading-relaxed">{step.text}</div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Accuracy Setup section */}
         <div className="space-y-4">
            <h4 className="text-xl font-medium text-zinc-300 text-center">Max Accuracy Setup</h4>
            <div className="space-y-6">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  {[
                     { label: 'Location Accuracy', value: 'Highest' },
                     { label: 'Distance', value: '10-50 meters' },
                     { label: 'Interval', value: '5-10 seconds' },
                     { label: 'Angle', value: '10-15°' },
                     { label: 'Stationary Heartbeat', value: '60-120 seconds' },
                     { label: 'Wake Lock', value: 'ON', critical: true },
                     { label: 'Offline Buffering', value: 'ON' }
                  ].map((item, i) => (
                     <div key={i} className="flex justify-between items-center pb-2">
                        <span className="text-xs text-zinc-500 font-medium">{item.label}</span>
                        <span className={`text-xs font-mono font-bold ${item.critical ? 'text-emerald-400' : 'text-zinc-200'}`}>
                           {item.value}
                        </span>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Actions section */}
         <div className="flex flex-col gap-3">
            <button 
               onClick={() => {
                  onClose();
                  navigate('/dashboard');
               }}
               className="w-full flex justify-center items-center bg-emerald-700 hover:bg-emerald-600 disabled:bg-emerald-800 disabled:text-emerald-300 disabled:cursor-not-allowed cursor-pointer text-base text-zinc-100 font-medium py-2 shadow-sm rounded-md transition-colors"
            >
               I've completed the setup
            </button>
            <span className='text-center text-xs text-zinc-500'>For real time location updates, please toggle on the 'Continous Tracking' option during deliveries.</span>
         </div>
      </div>
   );
};

export default AddDeviceSuccess;
