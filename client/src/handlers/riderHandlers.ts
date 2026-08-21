import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import { toast } from 'sonner';

export const getImageUrl = (path?: string) => {
   if (!path) return '';
   if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
      return path;
   }
   const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
   const backendOrigin = apiBaseUrl.replace(/\/api\/?$/, '');
   const cleanPath = path.startsWith('/') ? path : `/${path}`;
   return `${backendOrigin}${cleanPath}`;
};

export const useRiderHandlers = () => {
   const [riders, setRiders] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);

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

   return {
      riders,
      loading,
      fetchRiders,
      handleUpdateStatus,
      handleRemoveRider
   };
};
