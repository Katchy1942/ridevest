const Header = () => {
   return (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] sm:w-auto bg-white/10 backdrop-blur-full border border-white/20 rounded-full px-4 sm:px-6 py-2 sm:py-2.5 shadow-lg z-50 flex items-center justify-between sm:justify-start gap-3 sm:gap-6">
         <h1 className="font-serif text-2xl sm:text-3xl tracking-tighter font-extralight text-emerald-600">ridevest<span className="font-black">.</span></h1>
         <a href="https://wa.me/2349122454898?text=Hello,%20I'm%20interested%20in%20a%20demo%20of%20Ridevest." target="_blank" rel="noopener noreferrer" className="block bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap">Book a demo</a>
      </div>
   )
}

export default Header