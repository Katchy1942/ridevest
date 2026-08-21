import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { HugeiconsIcon } from '@hugeicons/react';
import { Menu09Icon } from '@hugeicons/core-free-icons';

const DashboardLayout = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<div className="min-h-screen bg-zinc-950 font-sans text-zinc-100 flex flex-col md:flex-row">
			<header className="md:hidden flex items-center justify-between px-4 py-2 bg-zinc-900 sticky top-0 z-30">
				<h1 className='text-xl tracking-tighter 
					font-medium text-emerald-600 shrink-0'>ridevest</h1>
				<button
					onClick={() => setIsMobileMenuOpen(true)}
					className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-md transition-colors cursor-pointer"
				>
					<HugeiconsIcon icon={Menu09Icon} size={24} strokeWidth={1.5} />
				</button>
			</header>

			<Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

			<main className="flex-1 md:ml-44 min-h-[calc(100vh-73px)] md:min-h-screen w-full">
				<div className="p-4 sm:p-6 md:p-6 max-w-7xl mx-auto">
					<Outlet />
				</div>
			</main>
		</div>
	);
};

export default DashboardLayout;
