const Problems = () => {
   return (
      <section className="min-h-screen flex flex-col px-6">
         <div className="flex justify-between w-full max-w-[1400px] mx-auto flex-col lg:flex-row gap-8">
            <h2 className="text-2xl md:text-4xl max-w-3xl text-zinc-400 tracking-tighter font-medium font-serif mb-6">Logistics shouldn't be this hard.</h2>
            <p className="font-medium text-md md:text-lg text-zinc-500 mb-8 max-w-xl">Most dispatch businesses in Nigeria run on WhatsApp groups, phone calls, and guesswork. You're losing money, time, and customers every single day.</p>
         </div>

         <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 border border-zinc-800/80 mb-32 mt-20">

            <div className="flex flex-col p-8 md:p-14 border-b md:border-r border-zinc-800/80 hover:bg-zinc-900/20 transition-colors">
               <span className="text-zinc-600 font-mono text-sm mb-6">01</span>
               <h3 className="text-2xl font-serif text-zinc-100 mb-4">WhatsApp isn't a CRM</h3>
               <p className="text-zinc-400 text-lg leading-relaxed">
                  Scrolling through hundreds of messages to find an address? Losing track of orders? The moment your volume grows, chat groups become unmanageable.
               </p>
            </div>

            <div className="flex flex-col p-8 md:p-14 border-b border-zinc-800/80 hover:bg-zinc-900/20 transition-colors">
               <span className="text-zinc-600 font-mono text-sm mb-6">02</span>
               <h3 className="text-2xl font-serif text-zinc-100 mb-4">Rider Blind Spots</h3>
               <p className="text-zinc-400 text-lg leading-relaxed">
                  "I'm almost there" could mean 5 minutes or 3 hours. Without real-time visibility, you can't optimize routes or provide accurate ETAs to customers.
               </p>
            </div>

            <div className="flex flex-col p-8 md:p-14 border-b md:border-b-0 md:border-r border-zinc-800/80 hover:bg-zinc-900/20 transition-colors">
               <span className="text-zinc-600 font-mono text-sm mb-6">03</span>
               <h3 className="text-2xl font-serif text-zinc-100 mb-4">Revenue Leakages</h3>
               <p className="text-zinc-400 text-lg leading-relaxed">
                  Cash payments easily go unaccounted for, debts are forgotten, and tracking daily remittances manually is a recipe for losing money.
               </p>
            </div>

            <div className="flex flex-col p-8 md:p-14 hover:bg-zinc-900/20 transition-colors">
               <span className="text-zinc-600 font-mono text-sm mb-6">04</span>
               <h3 className="text-2xl font-serif text-zinc-100 mb-4">The Scaling Ceiling</h3>
               <p className="text-zinc-400 text-lg leading-relaxed">
                  It's easy to manage 2 riders manually. Try doing that with 20. When your operations aren't centralized, growth immediately breaks your existing workflows.
               </p>
            </div>

         </div>
      </section>
   )
}

export default Problems