import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { HugeiconsIcon } from '@hugeicons/react';
import {
   ArrowLeft01Icon,
   InformationSquareIcon,
   Clock01Icon,
   Route01Icon,
} from '@hugeicons/core-free-icons';
import type { IconSvgElement } from '@hugeicons/react';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar';
import DeliveryInfoPanel from './DeliveryInfoPanel';
import DeliveryTimeline from './DeliveryTimeline';

const sidebarIcons: { icon: IconSvgElement; label: string }[] = [
   { icon: InformationSquareIcon, label: 'Details' },
   { icon: Clock01Icon, label: 'Timeline' },
   { icon: Route01Icon, label: 'Route' },
];

const ICON_STRIP_WIDTH = 56; // fixed width for the icon column

const TrackDelivery = () => {
   const [expanded, setExpanded] = useState(false);
   const [activeView, setActiveView] = useState<'details' | 'timeline'>('details');
   const navigate = useNavigate();

   return (
      <div className="relative h-screen overflow-hidden">
         <div className="bg-zinc-900 h-full w-full" />

         {/* Back to app button */}
         <button
            onClick={() => navigate('/dashboard/deliveries')}
            className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-md cursor-pointer transition-colors"
         >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={18} className="text-zinc-300" />
            <span className="text-sm text-zinc-300">Back to App</span>
         </button>

         {/* Expandable sidebar panel */}
         <div
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
            className={`absolute top-4 right-4 bottom-4 bg-zinc-800 rounded-2xl flex overflow-hidden transition-all duration-300 ease-in-out ${
               expanded ? 'w-[22%]' : 'w-14'
            }`}
         >
            <div
               className="flex flex-col items-center py-4 gap-3 shrink-0"
               style={{ width: ICON_STRIP_WIDTH }}
            >
               <button className="p-2 rounded-xl hover:bg-emerald-900/20 cursor-pointer transition-colors">
                  <HugeiconsIcon icon={ArrowLeft01Icon} size={20} className="text-zinc-300" />
               </button>

               <div className="w-6 h-px bg-zinc-700" />

               {sidebarIcons.map(({ icon, label }) => {
                  const viewKey = label.toLowerCase();
                  const isPanel = viewKey === 'details' || viewKey === 'timeline';
                  const isActive = isPanel && activeView === viewKey;

                  const handleClick = () => {
                     if (isPanel) {
                        setActiveView(viewKey as 'details' | 'timeline');
                     } else {
                        toast.info('Route view coming soon — will center the map on the delivery route.');
                     }
                  };

                  return (
                     <button
                        key={label}
                        title={label}
                        onClick={handleClick}
                        className={`p-2 rounded-xl cursor-pointer transition-colors ${
                           isActive ? 'bg-emerald-900/30 text-emerald-400' : 'hover:bg-emerald-900/20 text-zinc-300'
                        }`}
                     >
                        <HugeiconsIcon icon={icon} size={20} />
                     </button>
                  );
               })}

               <div className="mt-auto cursor-pointer" title="Test Rider">
                  <Avatar className="h-8 w-8">
                     <AvatarImage src="https://i.pravatar.cc/150?u=man3" alt="Test Rider" />
                     <AvatarFallback className="bg-emerald-900/30 text-emerald-400 text-xs">TR</AvatarFallback>
                  </Avatar>
               </div>
            </div>

            {/* Expandable content area */}
            <div
               className={`flex-1 min-w-0 border-l border-zinc-700 transition-opacity duration-200 ${
                  expanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
               }`}
            >
               {activeView === 'timeline' ? (
                  <DeliveryTimeline onBack={() => setActiveView('details')} />
               ) : (
                  <DeliveryInfoPanel onViewTimeline={() => setActiveView('timeline')} />
               )}
            </div>
         </div>
      </div>
   );
};

export default TrackDelivery;