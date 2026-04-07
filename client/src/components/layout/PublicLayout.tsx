import { Outlet } from 'react-router-dom';
import Header from '../common/Header';

const PublicLayout = () => {
   return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100">
         <Header />
         <main className="pt-20">
            <Outlet />
         </main>
      </div>
   );
};

export default PublicLayout;