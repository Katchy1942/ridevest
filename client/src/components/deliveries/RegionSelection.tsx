import { useState } from 'react';
import {
   Combobox,
   ComboboxInput,
   ComboboxContent,
   ComboboxList,
   ComboboxItem,
} from '../ui/combobox';

const nigerianStates = [
   'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Federal Capital Territory', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

import { Loader2 } from 'lucide-react';

interface RegionSelectionProps {
   onContinue: (state: string) => void;
   isLoading?: boolean;
}

const RegionSelection = ({ onContinue, isLoading = false }: RegionSelectionProps) => {
   const [tempState, setTempState] = useState('');

   return (
      <div className="flex-1 p-6 space-y-8 min-h-[300px] flex flex-col justify-center">
         <div className="text-center space-y-2">
            <h3 className="text-xl font-medium text-zinc-200">Select Region</h3>
            <p className="text-sm text-zinc-400">Ridevest currently handles same state delivery only.</p>
         </div>
         
         <div className="space-y-4 max-w-sm mx-auto w-full">
            <div className="space-y-1.5">
               <label className="text-sm font-medium text-zinc-300">State</label>
               <Combobox value={tempState} onValueChange={(val: string | null) => val && setTempState(val)} disabled={isLoading}>
                  <ComboboxInput placeholder="Select a Nigerian state" className="w-full bg-zinc-900 border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:border-emerald-500" />
                  <ComboboxContent className="bg-zinc-900 border-zinc-800 text-zinc-200">
                     <ComboboxList>
                        {nigerianStates.map(state => (
                           <ComboboxItem key={state} value={state} className="flex justify-between w-full hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer">
                              <span>{state}</span>
                           </ComboboxItem>
                        ))}
                     </ComboboxList>
                  </ComboboxContent>
               </Combobox>
            </div>
            
            <button 
               onClick={() => tempState && onContinue(tempState)}
               disabled={!tempState || isLoading}
               className="w-full bg-emerald-700 text-base text-zinc-100 font-medium py-2.5 rounded-md hover:bg-emerald-600 transition-colors shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
               {isLoading && <Loader2 className="animate-spin" size={18} />}
               {isLoading ? 'Finding companies...' : 'Continue'}
            </button>
         </div>
      </div>
   );
};

export default RegionSelection;
