import type { ReactNode } from 'react';

const SlideCard = ({ subtitle, description, bgClass, glowClass, children }: { subtitle: string, description: string, bgClass: string, glowClass: string, children?: ReactNode }) => (
   <div className="sticky top-0 h-screen w-full flex items-center justify-center bg-black">
      <div className={`w-full max-w-7xl h-full max-h-[850px] overflow-hidden flex flex-col relative ${bgClass}`}>
         {/* Background Glow */}
         <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl max-h-[800px] blur-[120px] rounded-full opacity-40 mix-blend-screen pointer-events-none ${glowClass}`}></div>
         
         {/* Grid pattern overlay */}
         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPPHBhdGggZD0iTTAgMTBoNDBNMTAgMHY0ME0wIDIwaDQwTTIwIDB2NDBNMCAzMGg0ME0zMCAwdjQwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMikiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-50 z-0"></div>

         <div className="relative z-10 w-full flex flex-col items-center text-center px-6 pt-16 md:pt-24 shrink-0">
            <span className="text-xs md:text-xs font-extralight tracking-[0.2em] uppercase font-mono text-white/50">{subtitle}</span>
            <p className="text-md md:text-lg font-medium text-white/50 max-w-2xl mt-2">{description}</p>
         </div>
         
         <div className="relative z-10 flex-1 w-full flex items-center justify-center min-h-0 pb-12 mt-8 md:mt-0">
            {children}
         </div>
      </div>
   </div>
);

const Solutions = () => {
   return (
      <div className="bg-black w-full text-white relative">
         {/* Main Intro Text */}
         <section className="sticky top-0 min-h-screen flex flex-col justify-center items-center text-center px-6 z-0 bg-black">
            <div className="w-full absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
               <div className="w-full max-w-[1000px] h-[500px] bg-zinc-800/20 blur-[150px] rounded-full"></div>
            </div>
            <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10">
               <h2 className="text-2xl md:text-3xl lg:text-4xl max-w-3xl tracking-tighter font-medium font-serif mb-8 text-zinc-400">
                  Finally, a dispatch system built for Nigeria's unpredictable logistics.
               </h2>
            </div>
         </section>

         {/* Gliding Stacking Components */}
         <div className="relative z-10 w-full bg-black">
            
            <SlideCard 
               subtitle="Live GPS Tracking" 
               description="Stop calling riders. Watch them move on an interactive map in real time. Give your customers perfectly accurate ETAs."
               bgClass="bg-zinc-950"
               glowClass="bg-amber-500/20"
            >
            </SlideCard>

            <SlideCard 
               subtitle="Smart Dispatching"
               description="Our algorithm instantly pairs the nearest available rider with the pickup location, optimizing routes and slashing delivery times."
               bgClass="bg-[#020617]" /* slate-950 */
               glowClass="bg-blue-500/20"
            >
            </SlideCard>

            <SlideCard 
               subtitle="Financial Control"
               description="Auto-reconcile cash payments. Track outstanding debts. Get a birds-eye view of your daily, weekly, and monthly remittances."
               bgClass="bg-[#022c22]" /* emerald-950 */
               glowClass="bg-emerald-500/20"
            >
            </SlideCard>

            <SlideCard 
               subtitle="Customer CRM"
               description="Store customer addresses, order history, and preferences instantly. Turn one-time deliveries into loyal VIPs."
               bgClass="bg-[#2e1065]" /* purple-950 */
               glowClass="bg-purple-500/20"
            >
            </SlideCard>

         </div>

         {/* Add the custom animation keyframe to the doc */}
         <style dangerouslySetInnerHTML={{__html: `
            @keyframes slideRight {
               0% { left: -20%; }
               100% { left: 120%; }
            }
         `}} />
      </div>
   )
}

export default Solutions