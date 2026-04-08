const HeroSection = () => {
   return (
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4">
         <h1 className="text-3xl md:text-5xl max-w-3xl text-zinc-100 tracking-tighter font-medium font-serif pt-12 mb-6">
            Run your entire dispatch operation from one dashboard.
         </h1>
         <p className="font-medium text-md md:text-lg text-zinc-400 mb-8 max-w-2xl">
            Track riders in real time, manage deliveries effortlessly, and get full visibility into your logistics — all in one place.
         </p>
         <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <button className="bg-zinc-700 hover:bg-zinc-600 text-white font-medium px-8 py-3 rounded-full transition-colors cursor-pointer">
               Book a demo
            </button>
         </div>

         {/* App Demo Placeholder */}
         <div className="w-full max-w-[1400px] aspect-16/10 sm:aspect-video bg-zinc-900/50 rounded-lg overflow-hidden flex flex-col backdrop-blur-md ring-1 ring-white/10 mt-8 mb-24 lg:mb-40">
            {/* Top Bar */}
            <div className="h-12 border-b border-zinc-800/80 bg-zinc-900/80 flex items-center px-4 shrink-0 relative">
               <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ED6A5E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#F4BF4F]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#61C554]"></div>
               </div>
               <div className="absolute left-1/2 -translate-x-1/2 w-48 h-6 bg-zinc-800/50 rounded border border-zinc-700/50 flex items-center justify-center">
                  <span className="text-[10px] text-zinc-500 font-medium">app.ridevest.name.ng</span>
               </div>
            </div>

            {/* Inner Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center bg-zinc-950/50 gap-4">
               <span className="text-zinc-500 font-medium text-sm">Dashboard...</span>
            </div>
         </div>
      </section>
   );
};

export default HeroSection;