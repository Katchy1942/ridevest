import { Link } from 'react-router-dom';

const Header = () => {
   return (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-full border border-white/20 rounded-full px-6 py-2.5 shadow-lg z-50 flex items-center gap-6">
         <h1 className="font-serif text-3xl tracking-tighter font-extralight text-emerald-600">ridevest<span className="font-black">.</span></h1>
         <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-1.5 rounded-full transition-colors cursor-pointer">Request a demo</button>
         <Link to="/register" className="bg-zinc-700 hover:bg-zinc-600 text-white text-sm px-4 py-1.5 rounded-full transition-colors">Register</Link>
      </div>
   )
}

export default Header