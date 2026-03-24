import { Bike, ArrowLeft } from 'lucide-react';
import {
   Combobox,
   ComboboxInput,
   ComboboxContent,
   ComboboxList,
   ComboboxItem,
} from '../../components/ui/combobox';
import { HugeiconsIcon } from '@hugeicons/react';
import { Car02Icon, TruckIcon } from '@hugeicons/core-free-icons';
import RegionSelection from '../../components/deliveries/RegionSelection';
import { useDeliveryHandlers } from '../../handlers/deliveryHandlers';


const AddDeliveryPage = () => {
   const {
      selectedState,
      companies,
      isLoadingCompanies,
      isBrandDelivery,
      setIsBrandDelivery,
      transportMode,
      setTransportMode,
      formData,
      setFormData,
      suggestions,
      showSuggestions,
      addressLoader,
      handleRegionContinue,
      resetStateSelection,
      handleInputChange,
      handleAddressChange,
      handleSelectSuggestion,
      handleSubmit,
      selectedCompany,
      searchParams
   } = useDeliveryHandlers();


   return (
      <div className='min-h-screen flex flex-col justify-center items-center md:p-10 p-4'>
         <h1 className='font-serif text-4xl tracking-tighter font-extralight text-emerald-600 mb-6 text-center'>
            ridevest<span className='font-black'>.</span>
         </h1>
         <div className="bg-zinc-900 border border-zinc-800 shadow-xl w-full max-w-[550px] rounded-xl flex flex-col">
            <div className="px-6 py-6 shrink-0 border-b border-zinc-800/60">
               <h2 className="text-xl font-semibold text-zinc-50 tracking-tight">Create Delivery</h2>
               <p className="text-sm text-zinc-400 mt-1">Enter the details for your new delivery.</p>
            </div>

            {!selectedState && !searchParams.get('company') ? (
               <RegionSelection 
                  onContinue={handleRegionContinue} 
                  isLoading={isLoadingCompanies} 
               />
            ) : (
            <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-8">
               <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                     <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-900/30 text-emerald-500 border border-emerald-800/30">
                        {selectedState || 'Specified Provider'}
                     </span>
                  </div>
                  <button 
                     type="button"
                     onClick={resetStateSelection}
                     className="text-xs flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                  >
                     <ArrowLeft size={14} />
                     Change Region
                  </button>
               </div>
               <div className="space-y-4">
                  <h3 className="text-lg font-medium text-zinc-200">Courier</h3>
                  <div className="space-y-1.5">
                     <label className="text-sm font-medium text-zinc-300">Available Logistics Providers</label>
                     <Combobox value={formData.courier} onValueChange={(val: string | null) => val && setFormData(prev => ({ ...prev, courier: val }))}>
                        <ComboboxInput placeholder="Select a company..." className="w-full bg-zinc-900 border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:border-emerald-500" />
                        <ComboboxContent className="bg-zinc-900 border-zinc-800 text-zinc-200">
                           <ComboboxList>
                              {isLoadingCompanies ? (
                                 <div className="p-4 text-center text-sm text-zinc-500">Loading providers...</div>
                              ) : companies.length > 0 ? (
                                 companies.map((company) => (
                                    <ComboboxItem key={company.id} value={company.companyName} className="flex justify-between w-full hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer">
                                       <span>{company.companyName}</span>
                                    </ComboboxItem>
                                 ))
                              ) : (
                                 <div className="p-4 text-center text-sm text-zinc-500">No providers found in this state</div>
                              )}
                           </ComboboxList>
                        </ComboboxContent>
                     </Combobox>
                  </div>
               </div>

               <div className="space-y-6">
                  <h3 className="text-lg font-medium text-zinc-200">Route</h3>
                  <div className="relative pl-10">
                     <div className="absolute left-4 top-10 bottom-6 w-px bg-zinc-800"></div>
                     
                     <div className="relative mb-8 group">
                        <div className="absolute -left-10 top-4 w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center border border-emerald-800/50 z-10">
                           <div className="absolute inset-0 bg-emerald-900/30 rounded-full"></div>
                           <div className="w-2.5 h-2.5 bg-emerald-500 animate-pulse rounded-full relative z-20"></div>
                        </div>
                        <div className="space-y-1.5 relative">
                           <label className="text-sm font-medium text-zinc-300">Pickup Location</label>
                           <div className="relative">
                              <input 
                                 type="text" 
                                 name="pickup"
                                 required
                                 autoComplete="off"
                                 value={formData.pickup}
                                 onChange={handleAddressChange}
                                 placeholder="e.g. 123 Storage Facility, Lagos"
                                 className="w-full px-4 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors"
                              />
                              {addressLoader.pickup && (
                                 <div className="absolute right-3 top-2.5">
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-zinc-500 border-t-zinc-200"></div>
                                 </div>
                              )}
                           </div>
                           {showSuggestions.pickup && (
                              <div className="absolute left-0 right-0 mt-1 bg-zinc-800 border border-zinc-700 rounded-md shadow-xl max-h-48 overflow-y-auto z-50">
                                 {suggestions.pickup.map((s: any, i: number) => (
                                    <div
                                       key={i}
                                       className="p-3 text-sm text-zinc-200 hover:bg-zinc-700 cursor-pointer border-b border-zinc-700 last:border-0"
                                       onClick={() => handleSelectSuggestion(s.placePrediction.text.text, 'pickup', s.placePrediction.placeId)}
                                    >
                                       {s.placePrediction.text.text}
                                    </div>
                                 ))}
                              </div>
                           )}
                        </div>
                     </div>

                     <div className="relative group">
                        <div className="absolute -left-10 top-8 w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 z-10">
                           <div className="absolute inset-0 bg-red-900/30 rounded-full"></div>
                           <div className="w-2.5 h-2.5 bg-red-500 animate-pulse rounded-full relative z-20"></div>
                        </div>
                        <div className="space-y-1.5 relative">
                           <label className="text-sm font-medium text-zinc-300">Drop-off Destination</label>
                           <div className="relative">
                              <input 
                                 type="text" 
                                 name="destination"
                                 required
                                 autoComplete="off"
                                 value={formData.destination}
                                 onChange={handleAddressChange}
                                 placeholder="e.g. 456 Customer Ave, Lagos"
                                 className="w-full px-4 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors"
                              />
                              {addressLoader.destination && (
                                 <div className="absolute right-3 top-2.5">
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-zinc-500 border-t-zinc-200"></div>
                                 </div>
                              )}
                           </div>
                           {showSuggestions.destination && (
                              <div className="absolute left-0 right-0 mt-1 bg-zinc-800 border border-zinc-700 rounded-md shadow-xl max-h-48 overflow-y-auto z-50">
                                 {suggestions.destination.map((s: any, i: number) => (
                                    <div
                                       key={i}
                                       className="p-3 text-sm text-zinc-200 hover:bg-zinc-700 cursor-pointer border-b border-zinc-700 last:border-0"
                                       onClick={() => handleSelectSuggestion(s.placePrediction.text.text, 'destination', s.placePrediction.placeId)}
                                    >
                                       {s.placePrediction.text.text}
                                    </div>
                                 ))}
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <h3 className="text-lg font-medium text-zinc-200">Recipient</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="space-y-1.5">
                        <label className="text-sm font-medium text-zinc-300">Full Name</label>
                        <input 
                           type="text" 
                           name="receiverName"
                           required
                           value={formData.receiverName}
                           onChange={handleInputChange}
                           placeholder="John Doe"
                           className="w-full px-4 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors"
                        />
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-sm font-medium text-zinc-300">Phone Number</label>
                        <input 
                           type="text" 
                           name="receiverPhone"
                           required
                           value={formData.receiverPhone}
                           onChange={handleInputChange}
                           placeholder="070 0000 000"
                           className="w-full px-4 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors"
                        />
                     </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <h3 className="text-lg font-medium text-zinc-200">Sender</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="space-y-1.5">
                        <label className="text-sm font-medium text-zinc-300">Full Name</label>
                        <input 
                           type="text" 
                           name="senderName"
                           required
                           value={formData.senderName}
                           onChange={handleInputChange}
                           placeholder="John Doe"
                           className="w-full px-4 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors"
                        />
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-sm font-medium text-zinc-300">Phone Number</label>
                        <input 
                           type="text" 
                           name="senderPhone"
                           required
                           value={formData.senderPhone}
                           onChange={handleInputChange}
                           placeholder="070 0000 000"
                           className="w-full px-4 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors"
                        />
                     </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <h3 className="text-lg font-medium text-zinc-200">
                     Package Details
                  </h3>
                  <div className="space-y-6">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                           <label className="text-sm font-medium text-zinc-300">Weight Estimate (kg)</label>
                           <input 
                              type="number" 
                              name="weightEstimate"
                              value={formData.weightEstimate}
                              onChange={handleInputChange}
                              min="0"
                              placeholder="0.0"
                              className="w-full px-4 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors"
                           />
                        </div>
                     </div>
                     <div className="space-y-3">
                        <label className="text-sm font-medium text-zinc-300">Mode of Transport (Dependent on weight and size)</label>
                        <div className="grid grid-cols-3 gap-3">
                           {[
                              { id: 'bike', label: 'Bike', Icon: Bike },
                              { id: 'car', label: 'Car', Icon: Car02Icon, isHuge: true },
                              { id: 'truck', label: 'Truck', Icon: TruckIcon, isHuge: true }
                           ].filter(mode => !selectedCompany || selectedCompany.supportedModes.includes(mode.id)).map(mode => {
                              const Icon = mode.Icon as any;
                              return (
                                 <label key={mode.id} className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-colors cursor-pointer ${transportMode === mode.id ? 'bg-emerald-900/20 border-emerald-500 text-emerald-500' : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:bg-zinc-800'}`}>
                                    <input 
                                       type="radio" 
                                       name="transport" 
                                       value={mode.id} 
                                       className="sr-only" 
                                       checked={transportMode === mode.id}
                                       onChange={(e) => setTransportMode(e.target.value)}
                                    />
                                    {mode.isHuge ? (
                                       <HugeiconsIcon icon={Icon} strokeWidth={1.5} size={20} className="mb-2" />
                                    ) : (
                                       <Icon strokeWidth={1.5} className="mb-2 w-6 h-6" />
                                    )}
                                    <span className="text-xs font-medium">{mode.label}</span>
                                 </label>
                              );
                           })}
                        </div>
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-sm font-medium text-zinc-300">Delivery Notes (Optional)</label>
                        <textarea 
                           name="deliveryNotes"
                           value={formData.deliveryNotes}
                           onChange={handleInputChange}
                           rows={3}
                           placeholder="Any special instructions for the driver..."
                           className="w-full px-4 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors resize-none"
                        ></textarea>
                     </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <div>
                        <h3 className="text-lg font-medium text-zinc-200">Brand Delivery</h3>
                        <p className="text-sm text-zinc-400">Are you a brand or business?</p>
                     </div>
                     <button 
                        type="button"
                        onClick={() => setIsBrandDelivery(!isBrandDelivery)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-900 ${isBrandDelivery ? 'bg-emerald-600' : 'bg-zinc-700'}`}
                     >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isBrandDelivery ? 'translate-x-6' : 'translate-x-1'}`} />
                     </button>
                  </div>

                  {isBrandDelivery && (
                     <div className="space-y-4 pt-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           <div className="space-y-1.5">
                              <label className="text-sm font-medium text-zinc-300">Brand/Business Name</label>
                              <input
                                 name="businessName"
                                 value={formData.businessName}
                                 onChange={handleInputChange}
                                 required={isBrandDelivery}
                                 placeholder="Alora hairs..."
                                 className="w-full px-4 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors"
                              />
                           </div>
                        </div>
                     </div>
                  )}
               </div>
               
               <div className="flex justify-end pt-4">
                  <button 
                     type="submit" 
                     className="w-full bg-emerald-700 text-base text-zinc-100 font-medium py-2 rounded-md hover:bg-emerald-600 transition-colors shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
                  >
                     Proceed to pay ₦{selectedCompany?.averageDeliveryPrice?.toLocaleString() || '---'}
                  </button>
               </div>
            </form>
            )}
         </div>
      </div>
   );
};

export default AddDeliveryPage;
