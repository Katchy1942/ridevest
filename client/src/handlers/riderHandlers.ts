import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import { toast } from 'sonner';

export const useRiderHandlers = () => {
   const [riders, setRiders] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);
   const [showAddModal, setShowAddModal] = useState(false);
   const [newRider, setNewRider] = useState({
      firstName: '',
      lastName: '',
      phoneNumber: ''
   });
   const [isSubmitting, setIsSubmitting] = useState(false);

   const fetchRiders = async () => {
      try {
         const response = await api.get('/riders/all');
         setRiders(response.data);
      } catch (error) {
         console.error('Error fetching riders:', error);
         toast.error('Failed to load riders');
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchRiders();
   }, []);

   const handleUpdateStatus = async (id: number, status: string) => {
      try {
         await api.patch(`/riders/${id}/status`, { status });
         toast.success('Rider status updated');
         fetchRiders();
      } catch (error) {
         console.error('Error updating status:', error);
         toast.error('Failed to update status');
      }
   };

   const handleRemoveRider = async (id: number) => {
      if (!confirm('Are you sure you want to remove this rider?')) return;
      try {
         await api.delete(`/riders/${id}`);
         toast.success('Rider removed successfully');
         fetchRiders();
      } catch (error) {
         console.error('Error removing rider:', error);
         toast.error('Failed to remove rider');
      }
   };

   const handleAddRider = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
         await api.post('/riders/create', newRider);
         toast.success('Rider added successfully');
         setShowAddModal(false);
         setNewRider({ firstName: '', lastName: '', phoneNumber: '' });
         fetchRiders();
      } catch (error: any) {
         console.error('Error adding rider:', error);
         toast.error(error.response?.data?.error || 'Failed to add rider');
      } finally {
         setIsSubmitting(false);
      }
   };

   return {
      riders,
      loading,
      showAddModal,
      setShowAddModal,
      newRider,
      setNewRider,
      isSubmitting,
      fetchRiders,
      handleUpdateStatus,
      handleRemoveRider,
      handleAddRider
   };
};
