import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';

const PublicLayout = () => {
   return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100">
         <Header />
         <main className="pt-20">
            <Outlet />
         </main>
         <Footer />
      </div>
   );
};

export default PublicLayout;