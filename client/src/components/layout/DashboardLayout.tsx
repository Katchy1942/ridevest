import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { HugeiconsIcon } from '@hugeicons/react';
import { MoreVertical } from '@hugeicons/core-free-icons';

const DashboardLayout = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<div className="min-h-screen bg-zinc-950 font-sans text-zinc-100 flex flex-col md:flex-row">
			<header className="md:hidden flex items-center justify-between p-4 bg-zinc-900 sticky top-0 z-30">
				<h1 className='font-serif text-2xl tracking-tighter font-extralight text-emerald-600'>ridevest<span className='font-black'>.</span></h1>
				<button 
					onClick={() => setIsMobileMenuOpen(true)}
					className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-md transition-colors cursor-pointer"
				>
					<HugeiconsIcon icon={MoreVertical} size={24} strokeWidth={1.5} />
				</button>
			</header>

			<Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
			
			<main className="flex-1 md:ml-64 min-h-[calc(100vh-73px)] md:min-h-screen w-full">
				<div className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto">
					<Outlet />
				</div>
			</main>
		</div>
	);
};

export default DashboardLayout;
