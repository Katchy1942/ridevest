/// <reference types="@types/google.maps" />
import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import api from '@/lib/axios';
import { toast } from 'sonner';
import { HugeiconsIcon } from '@hugeicons/react';
import {
   ArrowLeft01Icon,
   InformationSquareIcon,
   Clock01Icon,
   Route01Icon,
   Camera01Icon,
} from '@hugeicons/core-free-icons';
import type { IconSvgElement } from '@hugeicons/react';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import DeliveryInfoPanel from './DeliveryInfoPanel';
import DeliveryTimeline from './DeliveryTimeline';

const darkMapStyle = [
   { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
   { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
   { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
   {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
   },
   {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
   },
   {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
   },
   {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
   },
   {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
   },
   {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
   },
   {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
   },
   {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
   },
   {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
   },
   {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
   },
   {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
   },
   {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
   },
   {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
   },
   {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
   },
   {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
   },
];

const sidebarIcons: { icon: IconSvgElement; label: string }[] = [
   { icon: InformationSquareIcon, label: 'Details' },
   { icon: Clock01Icon, label: 'Timeline' },
   { icon: Route01Icon, label: 'Route' },
   { icon: Camera01Icon, label: 'Proof' },
];

const TrackDelivery = () => {
   const [searchParams] = useSearchParams();
   const trackingId = searchParams.get('trackingId');
   const navigate = useNavigate();

   const [expanded, setExpanded] = useState(false);
   const [activeView, setActiveView] = useState<'details' | 'timeline'>('details');
   const [delivery, setDelivery] = useState<any>(null);
   const [loading, setLoading] = useState(true);

   const mapRef = useRef<HTMLDivElement>(null);
   const googleMap = useRef<google.maps.Map | null>(null);
   const fileInputRef = useRef<HTMLInputElement>(null);

   const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371000; // Earth's radius in meters
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a =
         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
         Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
         Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
   };

   const handleProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.length || !delivery) return;

      toast.promise(
         new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
               (position) => {
                  const riderLat = position.coords.latitude;
                  const riderLon = position.coords.longitude;

                  const destLat = parseFloat(delivery.dropoffCoordinates.latitude);
                  const destLon = parseFloat(delivery.dropoffCoordinates.longitude);

                  const distance = calculateDistance(riderLat, riderLon, destLat, destLon);

                  if (distance > 12) {
                     reject('rider not in location, proof denied');
                  } else {
                     resolve('Proof of delivery verified! Location matches.');
                  }
               },
               (error) => {
                  console.error("GPS Error:", error);
                  reject('Failed to get location. Please enable GPS.');
               },
               { enableHighAccuracy: true }
            );
         }),
         {
            loading: 'Verifying location...',
            success: (msg: any) => msg,
            error: (err: any) => err,
         }
      );
   };

   useEffect(() => {
      if (trackingId) {
         fetchDelivery();
      }
   }, [trackingId]);

   const fetchDelivery = async () => {
      setLoading(true);
      try {
         const response = await api.get(`/deliveries/track/${trackingId}`);
         setDelivery(response.data);
      } catch (error) {
         console.error('Error fetching delivery:', error);
         toast.error('Failed to load delivery information');
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      if (delivery && mapRef.current) {
         const initMap = async () => {
            setOptions({
               key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
               version: 'weekly',
            } as any);

            try {
               const { Map } = await importLibrary('maps') as google.maps.MapsLibrary;
               const { AdvancedMarkerElement } = await importLibrary('marker') as google.maps.MarkerLibrary;

               const pickupCoords = { 
                  lat: parseFloat(delivery.pickupCoordinates.latitude), 
                  lng: parseFloat(delivery.pickupCoordinates.longitude) 
               };
               const dropoffCoords = { 
                  lat: parseFloat(delivery.dropoffCoordinates.latitude), 
                  lng: parseFloat(delivery.dropoffCoordinates.longitude) 
               };

               const map = new Map(mapRef.current!, {
                  center: pickupCoords,
                  zoom: 13,
                  disableDefaultUI: true,
                  styles: darkMapStyle,
                  mapId: '6cc5f5f5c3f3f3f3', // Mock ID
               });

               new AdvancedMarkerElement({
                  position: pickupCoords,
                  map,
                  title: "Pickup Location",
               });

               new AdvancedMarkerElement({
                  position: dropoffCoords,
                  map,
                  title: "Drop-off Location",
               });

               const bounds = new google.maps.LatLngBounds();
               bounds.extend(pickupCoords);
               bounds.extend(dropoffCoords);
               map.fitBounds(bounds, { top: 100, bottom: 100, left: 100, right: 100 });

               googleMap.current = map;
            } catch (error) {
               console.error("Map initialization failed", error);
            }
         };

         initMap();
      }
   }, [delivery]);

   return (
      <div className="relative h-screen overflow-hidden">
         {loading ? (
            <div className="h-full w-full bg-zinc-950 flex items-center justify-center">
               <div className="animate-spin h-8 w-8 border-2 border-emerald-500 border-t-transparent rounded-full" />
            </div>
         ) : !delivery ? (
            <div className="h-full w-full bg-zinc-950 flex flex-col items-center justify-center gap-4">
               <p className="text-zinc-400">Tracking information not found.</p>
               <button onClick={() => navigate(-1)} className="text-emerald-500 hover:underline">Go back</button>
            </div>
         ) : (
            <div ref={mapRef} className="bg-zinc-900 h-full w-full" />
         )}

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
            onClick={() => {
               if (window.innerWidth < 768) setExpanded(!expanded);
            }}
            onMouseEnter={() => {
               if (window.innerWidth >= 768) setExpanded(true);
            }}
            onMouseLeave={() => {
               if (window.innerWidth >= 768) setExpanded(false);
            }}
            className={`absolute z-40 bg-zinc-800 rounded-2xl flex flex-col md:flex-row transition-all duration-300 ease-in-out overflow-hidden
               ${expanded 
                  ? 'bottom-4 left-4 right-4 h-[65%] md:top-4 md:right-4 md:bottom-4 md:left-auto md:h-auto md:w-[25%] lg:w-[22%]' 
                  : 'bottom-4 left-4 right-4 h-14 md:top-4 md:right-4 md:bottom-4 md:left-auto md:h-auto md:w-14'
               }
            `}
         >
            <div
               className={`flex md:flex-col items-center py-4 px-2 md:px-0 gap-3 shrink-0 transition-all duration-300
                  ${expanded ? 'w-full md:w-14 h-14 md:h-full' : 'w-full md:w-14 h-full'}
               `}
            >
               <button 
                  onClick={(e) => {
                     e.stopPropagation();
                     setExpanded(!expanded);
                  }}
                  className="p-2 rounded-xl hover:bg-emerald-900/20 cursor-pointer transition-colors"
               >
                  <HugeiconsIcon 
                     icon={ArrowLeft01Icon} 
                     size={20} 
                     className={`text-zinc-300 transition-transform duration-300 ${expanded ? 'rotate-180 md:rotate-0' : 'rotate-90 md:rotate-180'}`} 
                  />
               </button>

               <div className="hidden md:block w-6 h-px bg-zinc-700" />
               <div className="md:hidden w-px h-6 bg-zinc-700" />

               {sidebarIcons.map(({ icon, label }) => {
                  const viewKey = label.toLowerCase();
                  const isPanel = viewKey === 'details' || viewKey === 'timeline';
                  const isActive = isPanel && activeView === viewKey;

                  const handleClick = (e: React.MouseEvent) => {
                     e.stopPropagation();
                     if (viewKey === 'proof') {
                        fileInputRef.current?.click();
                        return;
                     }
                     if (isPanel) {
                        setActiveView(viewKey as 'details' | 'timeline');
                        if (window.innerWidth < 768) setExpanded(true);
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

               <div className="md:mt-auto cursor-pointer ml-auto md:ml-0" title={delivery?.rider ? `${delivery.rider.firstName} ${delivery.rider.lastName}` : "No Rider"}>
                  <Avatar className="h-8 w-8">
                     <AvatarFallback className="bg-emerald-900/30 text-emerald-400 text-xs text-center flex items-center justify-center">
                        {delivery?.rider ? `${delivery.rider.firstName[0]}${delivery.rider.lastName[0]}` : "UN"}
                     </AvatarFallback>
                  </Avatar>
               </div>
            </div>

            {/* Expandable content area */}
            <div
               className={`flex-1 min-h-0 flex flex-col md:border-l border-zinc-700 transition-opacity duration-200 ${
                  expanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
               }`}
            >
               {activeView === 'timeline' ? (
                  <DeliveryTimeline onBack={() => setActiveView('details')} />
               ) : (
                  <DeliveryInfoPanel 
                     delivery={delivery} 
                     onViewTimeline={() => setActiveView('timeline')} 
                  />
               )}
            </div>
         </div>
         <input
            type="file"
            ref={fileInputRef}
            onChange={handleProofUpload}
            accept="image/*"
            capture="environment"
            className="hidden"
         />
      </div>
   );
};

export default TrackDelivery;