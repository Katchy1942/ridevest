const Header = () => {
   return (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] sm:w-auto bg-white/10 backdrop-blur-full border border-white/20 rounded-full px-4 sm:px-6 py-2 sm:py-2.5 shadow-lg z-50 flex items-center justify-between sm:justify-start gap-3 sm:gap-6">
         <h1 className="font-serif text-2xl sm:text-3xl tracking-tighter font-extralight text-emerald-600">ridevest<span className="font-black">.</span></h1>
         <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap">Book a demo</button>
      </div>
   )
}

export default Header