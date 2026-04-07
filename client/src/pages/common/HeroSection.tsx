import { Link } from 'react-router-dom';

const HeroSection = () => {
   return (
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4">
         <h1 className="text-3xl md:text-5xl max-w-3xl text-zinc-100 tracking-tighter font-medium font-serif mb-6">
            Run your entire dispatch operation from one dashboard.
         </h1>
         <p className="font-medium text-lg md:text-xl text-zinc-400 mb-8 max-w-2xl">
            Track riders in real time, manage deliveries effortlessly, and get full visibility into your logistics — all in one place.
         </p>
         <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/register" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full transition-colors font-medium">
               Get Started
            </Link>
            <button className="bg-zinc-700 hover:bg-zinc-600 text-white font-medium px-8 py-3 rounded-full transition-colors cursor-pointer">
               Request a demo
            </button>
         </div>
      </section>
   );
};

export default HeroSection;