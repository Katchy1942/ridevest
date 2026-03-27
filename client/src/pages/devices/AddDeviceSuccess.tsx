import { CheckCircle2, Copy, ExternalLink, Smartphone } from 'lucide-react';
import { toast } from 'sonner';

interface AddDeviceSuccessProps {
   device: any;
   onClose: () => void;
}

const AddDeviceSuccess = ({ device, onClose }: AddDeviceSuccessProps) => {
   const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard');
   };

   return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
         <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500">
               <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-semibold text-zinc-100">Device Linked Successfully!</h2>
            <p className="text-sm text-zinc-500 max-w-[280px]">
               The device <span className="text-zinc-300 font-medium">{device.name}</span> has been registered and linked to its rider.
            </p>
         </div>

         <div className="bg-zinc-950/50 border border-zinc-800 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2.5">
                  <Smartphone className="w-4 h-4 text-zinc-500" />
                  <span className="text-xs text-zinc-400">Unique Identifier</span>
               </div>
               <button 
                  onClick={() => copyToClipboard(device.uniqueId)}
                  className="flex items-center gap-1.5 text-[11px] text-emerald-500 hover:text-emerald-400 font-medium transition-colors cursor-pointer"
               >
                  <Copy className="w-3 h-3" />
                  Copy ID
               </button>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-lg text-sm font-mono text-zinc-200">
               {device.uniqueId}
            </div>
         </div>

         <div className="space-y-3">
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Next steps for the rider:</h4>
            <ul className="space-y-3">
               {[
                  'Open the Traccar Client app on the rider\'s phone.',
                  'Enter the Unique ID above into the "Device Identifier" field.',
                  'Set the Server URL to: http://127.0.0.1:8082',
                  'Toggle the "Service Status" switch on.'
               ].map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-zinc-400">
                     <span className="flex-none w-5 h-5 bg-zinc-800 rounded-full flex items-center justify-center text-[10px] font-bold text-zinc-300 border border-zinc-700">
                        {i + 1}
                     </span>
                     {step}
                  </li>
               ))}
            </ul>
         </div>

         <div className="flex flex-col gap-3 pt-2">
            <a 
               href="http://127.0.0.1:8082" 
               target="_blank" 
               className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-md bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition-colors text-sm font-medium cursor-pointer"
            >
               Open Traccar Dashboard
               <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button 
               onClick={onClose}
               className="w-full px-4 py-2.5 rounded-md bg-emerald-600 text-zinc-100 hover:bg-emerald-500 transition-colors text-sm font-medium cursor-pointer"
            >
               Done
            </button>
         </div>
      </div>
   );
};

export default AddDeviceSuccess;
