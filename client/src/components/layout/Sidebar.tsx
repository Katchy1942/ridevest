import { useNavigate, NavLink } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react'
import { Home01Icon, UserGroupIcon, Motorbike01Icon, Door01Icon, SmartPhone02Icon } from '@hugeicons/core-free-icons';
import { toast } from 'sonner';
import api from '@/lib/axios';

interface SidebarProps {
   isOpen?: boolean;
   onClose?: () => void;
}

const Sidebar = ({ isOpen = false, onClose = () => {} }: SidebarProps) => {
   const navigate = useNavigate();
   const navItems = [
      { name: 'Dashboard', path: '/dashboard', icon: Home01Icon },
      { name: 'Deliveries', path: '/dashboard/deliveries', icon: Motorbike01Icon },
      { name: 'Devices', path: '/dashboard/devices', icon: SmartPhone02Icon },
      { name: 'Riders', path: '/dashboard/riders', icon: UserGroupIcon },
   ];

   const handleLogout = () => {
      onClose();
      
      toast('Are you sure you want to logout?', {
         action: {
            label: 'Logout',
            onClick: async () => {
               try {
                  // Optional backend call
                  await api.post('/auth/logout');
               } catch (error) {
                  console.error('Logout error:', error);
               } finally {
                  localStorage.removeItem('token');
                  localStorage.removeItem('company');
                  navigate('/login');
                  toast.success('Successfully logged out');
               }
            },
         },
         cancel: {
            label: 'Cancel',
            onClick: () => {}
         }
      });
   };

   return (
      <>
         <div 
            className={`fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity duration-300 backdrop-blur-sm ${
               isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={onClose}
         />

         <aside className={`
            fixed z-50 bg-zinc-900 flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
            md:w-64 md:h-screen md:top-0 md:left-0 md:border-r md:border-t-0 md:border-zinc-800 md:translate-y-0 md:rounded-none
            w-full h-[85vh] bottom-0 left-0 border-t border-zinc-800 rounded-t-4xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] md:shadow-none
            ${isOpen ? 'translate-y-0' : 'translate-y-full'}
         `}>
            <div className="w-full flex justify-center pt-4 pb-2 md:hidden">
               <div className="w-12 h-1.5 bg-zinc-700/50 rounded-full" />
            </div>

            <div className="px-6 pb-2 pt-2 md:pt-6 hidden md:block">
               <h1 className='font-serif text-3xl tracking-tighter font-extralight text-emerald-600'>ridevest<span className='font-black'>.</span></h1>
            </div>

            <nav className="flex-1 px-4 py-6 md:py-8 space-y-2 overflow-y-auto w-full">
               {navItems.map((item) => (
                  <NavLink
                     key={item.name}
                     to={item.path}
                     end={item.path === '/dashboard'}
                     onClick={() => onClose()}
                     className={({ isActive }) => 
                           `flex items-center text-sm gap-3 px-4 py-3 md:py-2 rounded-md transition-all duration-200 ${
                              isActive 
                                 ? 'bg-emerald-900/20 text-emerald-400 font-medium' 
                                 : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                           }`
                     }
                  >
                     <HugeiconsIcon icon={item.icon} size={20} strokeWidth={1.5} />
                     <span>{item.name}</span>
                  </NavLink>
               ))}
            </nav>

            <div className="p-4 border-t border-zinc-800 pb-8 md:pb-4">
               <button 
                  onClick={handleLogout}
                  className="flex w-full items-center text-sm gap-3 px-4 py-3 md:py-2 text-zinc-400 hover:bg-zinc-800 hover:text-red-400 rounded-md transition-all duration-200 cursor-pointer"
               >
                  <HugeiconsIcon icon={Door01Icon} size={20} strokeWidth={1.5} />
                  <span>Logout</span>
               </button>
            </div>
         </aside>
      </>
   );
};


export default Sidebar;
