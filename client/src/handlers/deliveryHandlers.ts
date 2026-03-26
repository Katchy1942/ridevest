import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '@/lib/axios';
import { toast } from 'sonner';
import { fetchSuggestions } from '@/lib/googlemaps';
import { initiateInterswitchPayment } from '@/lib/interswitch';

export const useDeliveryHandlers = () => {
   const navigate = useNavigate();

   const [loading, setLoading] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');
   const [searchParams, setSearchParams] = useSearchParams();
   const [selectedState, setSelectedState] = useState('');
   const [companies, setCompanies] = useState<any[]>([]);
   const [isLoadingCompanies, setIsLoadingCompanies] = useState(false);
   const [isBrandDelivery, setIsBrandDelivery] = useState(false);
   const [transportMode, setTransportMode] = useState('bike');

   const [formData, setFormData] = useState({
      courier: '',
      pickup: '',
      destination: '',
      receiverName: '',
      receiverPhone: '',
      senderName: '',
      senderPhone: '',
      weightEstimate: '',
      deliveryNotes: '',
      businessName: ''
   });

   const [suggestions, setSuggestions] = useState<any>({ pickup: [], destination: [] });
   const [showSuggestions, setShowSuggestions] = useState<any>({ pickup: false, destination: false });
   const [addressLoader, setAddressLoader] = useState<any>({ pickup: false, destination: false });
   const [selectedPlaceIds, setSelectedPlaceIds] = useState<any>({ pickup: null, destination: null });

   const selectedCompany = companies.find(c => c.companyName === formData.courier);

   useEffect(() => {
      if (selectedCompany && !selectedCompany.supportedModes.includes(transportMode)) {
         setTransportMode(selectedCompany.supportedModes[0] || '');
      }
   }, [formData.courier, selectedCompany, transportMode]);

   useEffect(() => {
      const companyParam = searchParams.get('company');
      if (companyParam) {
         setFormData(prev => ({ ...prev, courier: companyParam }));
      }
   }, [searchParams]);

   const handleRegionContinue = async (state: string) => {
      setIsLoadingCompanies(true);
      try {
         const response = await api.get(`/deliveries/serving-state/${state}`);
         const foundCompanies = response.data.companies;

         if (!foundCompanies || foundCompanies.length === 0) {
            return toast.info("No logistics providers found for this state yet.");
         }

         setCompanies(foundCompanies);
         setSelectedState(state);
      } catch (error) {
         console.error("Error fetching companies:", error);
         toast.error("Failed to load available logistics providers");
      } finally {
         setIsLoadingCompanies(false);
      }
   };

   const resetStateSelection = () => {
      setSelectedState('');
      setCompanies([]);
      setFormData(prev => ({ ...prev, courier: '' }));
      setSearchParams({}); // Clear URL params
   };

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
   };

   const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));

      if (!value.trim()) {
         setSuggestions((prev: any) => ({ ...prev, [name]: [] }));
         setShowSuggestions((prev: any) => ({ ...prev, [name]: false }));
         setAddressLoader((prev: any) => ({ ...prev, [name]: false }));
         setSelectedPlaceIds((prev: any) => ({ ...prev, [name]: null }));
         return;
      }

      setSelectedPlaceIds((prev: any) => ({ ...prev, [name]: null }));
      setAddressLoader((prev: any) => ({ ...prev, [name]: true }));

      fetchSuggestions(value).then(results => {
         setSuggestions((prev: any) => ({ ...prev, [name]: results }));
         setShowSuggestions((prev: any) => ({ ...prev, [name]: results.length > 0 }));
      }).finally(() => {
         setAddressLoader((prev: any) => ({ ...prev, [name]: false }));
      });
   };

   const handleSelectSuggestion = (text: string, field: 'pickup' | 'destination', placeId: string) => {
      setFormData(prev => ({ ...prev, [field]: text }));
      setSelectedPlaceIds((prev: any) => ({ ...prev, [field]: placeId }));
      setShowSuggestions((prev: any) => ({ ...prev, [field]: false }));
   };

   const handlePayment = (trackingId: string) => {
      const price = selectedCompany?.averageDeliveryPrice || 2000;
      const amountInKobo = (price * 100).toString();

      initiateInterswitchPayment({
         amount: amountInKobo,
         customerEmail: "[EMAIL_ADDRESS]",
         customerName: formData.senderName || "Test User",
         customerId: "user_001",
         trackingId,
         onComplete: (response: any) => {
            console.log("Payment Response:", response);
            if (response.resp === "00") {
               navigate(`/payment-response?txnref=${response.txnref}&amount=${amountInKobo}&trackingId=${trackingId}`);
            } else if (response.resp === "Z6")  {
               toast.error("Payment cancelled");
            }  else if (response.resp === "01") {
               toast.error("Payment failed");
            }
         }
      });
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      const trackingId = `RV${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      try {
         const response = await api.post('/deliveries/create', { 
            ...formData, 
            transportMode,
            trackingId,
            pickupPlaceId: selectedPlaceIds.pickup,
            destinationPlaceId: selectedPlaceIds.destination
         });

         if (response.status === 201) {
            toast.success("Delivery created successfully!");
            setTimeout(() => {
               toast.info("Proceeding to payment...");
               handlePayment(trackingId);
            }, 1000);
         }
      } catch (error: any) {
         console.error("Error creating delivery:", error);
         const errorMsg = error.response?.data?.message || "Failed to create delivery";
         setErrorMessage(errorMsg);
         toast.error("Failed to create delivery");
      } finally {
         setLoading(false);
      }
   };

   return {
      selectedState,
      setSelectedState,
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
      selectedPlaceIds,
      selectedCompany,
      handleRegionContinue,
      resetStateSelection,
      handleInputChange,
      handleAddressChange,
      handleSelectSuggestion,
      handlePayment,
      handleSubmit,
      searchParams,
      errorMessage,
      loading
   };
};
