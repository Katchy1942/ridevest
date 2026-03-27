import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import { toast } from 'sonner';

export const useDeviceHandlers = () => {
   const [devices, setDevices] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);
   const [showAddModal, setShowAddModal] = useState(false);
   const [newDevice, setNewDevice] = useState({
      name: '',
      uniqueId: '',
      linkedRiderId: ''
   });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [riders, setRiders] = useState<any[]>([]);
   const [fetchingRiders, setFetchingRiders] = useState(false);
   const [isSuccess, setIsSuccess] = useState(false);
   const [registeredDevice, setRegisteredDevice] = useState<any>(null);

   const fetchDevices = async () => {
      setLoading(true);
      try {
         const response = await api.get('/devices/all');
         setDevices(response.data);
      } catch (error) {
         console.error('Error fetching devices:', error);
         toast.error('Failed to load devices');
      } finally {
         setLoading(false);
      }
   };

   const fetchUnassignedRiders = async () => {
      setFetchingRiders(true);
      try {
         const response = await api.get('/riders/all');
         // Filter riders who don't have a device yet
         const unassigned = response.data.filter((rider: any) => !rider.device);
         setRiders(unassigned);
      } catch (error) {
         console.error('Error fetching riders:', error);
         toast.error('Failed to load eligible riders');
      } finally {
         setFetchingRiders(false);
      }
   };

   useEffect(() => {
      fetchDevices();
   }, []);

   useEffect(() => {
      if (showAddModal) {
         fetchUnassignedRiders();
      } else {
         // Reset success state when modal closes
         setIsSuccess(false);
         setRegisteredDevice(null);
      }
   }, [showAddModal]);

   const handleAddDevice = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
         const response = await api.post('/devices/create', newDevice);
         setRegisteredDevice(response.data);
         setIsSuccess(true);
         setNewDevice({ name: '', uniqueId: '', linkedRiderId: '' });
         fetchDevices();
      } catch (error: any) {
         console.error('Error adding device:', error);
         toast.error(error.response?.data?.error || 'Failed to add device');
      } finally {
         setIsSubmitting(false);
      }
   };

   const handleDeleteDevice = async (id: number) => {
      if (!confirm('Are you sure you want to delete this device?')) return;
      try {
         await api.delete(`/devices/${id}`);
         toast.success('Device deleted successfully');
         fetchDevices();
      } catch (error) {
         console.error('Error deleting device:', error);
         toast.error('Failed to delete device');
      }
   };

   return {
      devices,
      loading,
      showAddModal,
      setShowAddModal,
      newDevice,
      setNewDevice,
      isSubmitting,
      riders,
      fetchingRiders,
      handleAddDevice,
      handleDeleteDevice,
      fetchDevices,
      isSuccess,
      registeredDevice
   };
};
