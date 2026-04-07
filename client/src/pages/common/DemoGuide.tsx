import { Link } from "react-router-dom"

const DemoGuide = () => {
   return (
      <div className="flex flex-col justify-center items-center min-h-screen">
         <div className="flex flex-col justify-center items-center border-b border-zinc-700 pb-4">
            <p className="text-xs text-zinc-200">
               A simple and easy way to manage your rides.
               <Link to="/register" className="text-emerald-500 hover:underline cursor-pointer">Get Started</Link>
            </p>
         </div>
      </div>
   )
}

export default DemoGuide