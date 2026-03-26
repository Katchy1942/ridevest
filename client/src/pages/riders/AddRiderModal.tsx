import { Loader2 } from 'lucide-react';

interface AddRiderModalProps {
   isOpen: boolean;
   onClose: () => void;
   onSubmit: (e: React.FormEvent) => void;
   riderForm: any;
   setRiderForm: (form: any) => void;
   isSubmitting: boolean;
}

const AddRiderModal = ({ 
   isOpen, 
   onClose, 
   onSubmit, 
   riderForm, 
   setRiderForm, 
   isSubmitting 
}: AddRiderModalProps) => {
   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
         <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-lg shadow-sm animate-in zoom-in duration-200">
            <div className="p-6">
               <h2 className="text-xl font-semibold text-zinc-100 mb-1">Add New Rider</h2>
               <p className="text-sm text-zinc-500 mb-6">Create a new account for your delivery personnel.</p>
               
               <form onSubmit={onSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="space-y-1.5">
                        <label className="text-xs text-zinc-400">First Name</label>
                        <input 
                           type="text" 
                           required
                           placeholder="Michael"
                           value={riderForm.firstName}
                           onChange={e => setRiderForm({...riderForm, firstName: e.target.value})}
                           className="w-full pl-4 pr-12 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors"
                        />
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-xs text-zinc-400">Last Name</label>
                        <input 
                           type="text" 
                           required
                           placeholder="Scott"
                           value={riderForm.lastName}
                           onChange={e => setRiderForm({...riderForm, lastName: e.target.value})}
                           className="w-full pl-4 pr-12 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors"
                        />
                     </div>
                  </div>
                  <div className="space-y-1.5">
                     <label className="text-xs text-zinc-400">Phone Number</label>
                     <input 
                        type="tel" 
                        required
                        placeholder="080 1234 5678"
                        value={riderForm.phoneNumber}
                        onChange={e => setRiderForm({...riderForm, phoneNumber: e.target.value})}
                        className="w-full pl-4 pr-12 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors"
                     />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4 font-medium">
                     <button 
                        type="button"
                        onClick={onClose}
                        className="order-2 sm:order-1 flex-1 px-4 py-2.5 rounded-md border border-zinc-800 text-zinc-400 hover:bg-zinc-800 transition-colors cursor-pointer"
                     >
                        Cancel
                     </button>
                     <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="order-1 sm:order-2 flex-1 px-4 py-2.5 rounded-md bg-emerald-600 text-zinc-100 hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                     >
                        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                        Create Rider
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default AddRiderModal;
