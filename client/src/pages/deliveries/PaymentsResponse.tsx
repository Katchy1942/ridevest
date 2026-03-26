import { HugeiconsIcon } from '@hugeicons/react'
import { CheckmarkCircle01Icon } from '@hugeicons/core-free-icons';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const PaymentsResponse = () => {
   const navigate = useNavigate();
   const [searchParams] = useSearchParams();
   const txnref = searchParams.get('txnref');
   const trackingId = txnref || '';

   return (
      <div className='min-h-screen bg-neutral-950 flex flex-col justify-center items-center md:p-10 p-4'>
         <h1 className='font-serif text-4xl tracking-tighter font-extralight text-emerald-600 mb-8 text-center'>
            ridevest<span className='font-black'>.</span>
         </h1>

         <div className="bg-zinc-900 border border-zinc-800 max-w-md shadow-sm w-full rounded-xl p-6 flex flex-col items-center text-center">
            <div className="space-y-6 flex flex-col items-center animate-in fade-in zoom-in duration-500">
               <div className="relative">
                  <HugeiconsIcon icon={CheckmarkCircle01Icon} className="w-8 h-8 text-emerald-500 relative z-10" />
               </div>
               <div className="space-y-2">
                  <h2 className="text-2xl font-semibold flex justify-center text-zinc-100">Payment Successful!</h2>
                  <p className="text-zinc-400 text-md">
                     Your delivery request has been confirmed.
                  </p>
               </div>
            </div>

            <button 
               className="mt-8 w-full max-w-[280px] sm:max-w-xs bg-emerald-700 hover:bg-emerald-600 cursor-pointer text-base text-zinc-100 font-medium shadow-sm px-4 py-2 rounded-lg transition-colors" 
               onClick={() => navigate(`/track-delivery?trackingId=${trackingId}`)}
            >
               Live Map Tracking
            </button>

            <div className="mt-1">
               <Link to={`/track-delivery?trackingId=${trackingId}`} className="text-xs hover:underline cursor-pointer text-zinc-400 break-all">
                  ridevest.vercel.app/track-delivery?trackingId={trackingId}
               </Link>
            </div>
         </div>

         <p className="mt-8 text-zinc-500 text-sm">
            Need help? <a href='mailto:stanleyonahu@gmail.com' className="text-zinc-300"> Contact support.</a>
         </p>
      </div>
   );
};

export default PaymentsResponse;

