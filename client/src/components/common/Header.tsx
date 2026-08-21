import { Link, NavLink } from "react-router-dom";
import { ArrowRight, SquareKanban } from "lucide-react";

const navLinks = [
	{ label: "About", to: "/about" },
	{ label: "Products", to: "/products" },
	{ label: "Solutions", to: "/solutions" },
	{ label: "Company", to: "/company" },
];

const Header = () => {
	const isSignedIn = !!localStorage.getItem("token");

	return (
		<div
			className="fixed top-4 left-1/2 
				transform -translate-x-1/2 w-[calc(100%-2rem)] 
				px-4 sm:px-12 z-50 
				flex items-center justify-between gap-4"
		>
			<Link
				to="/"
				className="text-xl tracking-tighter 
					font-medium text-emerald-600 shrink-0"
			>
				ridevest
			</Link>

			{/* <nav
				className="hidden sm:flex items-center gap-6 bg-white/10 
					backdrop-blur-md border border-white/20 rounded-full 
					px-6 py-2 shadow-lg absolute left-1/2 -translate-x-1/2"
			>
				{navLinks.map(({ label, to }) => (
					<NavLink
						key={to}
						to={to}
						className={({ isActive }) =>
							`text-sm transition-colors whitespace-nowrap ${
								isActive
									? "text-white font-semibold"
									: "text-white/60 hover:text-white"
							}`
						}
					>
						{label}
					</NavLink>
				))}
			</nav> */}

			<div className="flex items-center justify-center gap-2">
				{isSignedIn ? (
					<Link
						to="/dashboard"
						className="shrink-0 flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700
						text-black text-xs sm:text-sm px-3 py-1.5 
						sm:px-4 sm:py-1.5 rounded-full transition-colors 
						cursor-pointer whitespace-nowrap tracking-tight"
					>
						<SquareKanban size={14} strokeWidth={1.5} />
						Dashboard
					</Link>
				) : (
					<>
						<Link
							to="/login"
							className="shrink-0 flex flex-row-reverse items-center gap-1 bg-emerald-600 hover:bg-emerald-700
							text-black text-xs sm:text-sm px-3 py-1.5 
							sm:px-4 sm:py-1.5 rounded-full transition-colors 
							cursor-pointer whitespace-nowrap tracking-tight"
						>
							<ArrowRight size={14} strokeWidth={1.5} />
							Login
						</Link>
						<Link
							to="/register"
							className="shrink-0 flex items-center gap-1 text-emerald-600 hover:text-emerald-700 text-sm
							transition-colors 
							cursor-pointer whitespace-nowrap tracking-tight"
						>
							Register your company
						</Link>
					</>
				)}
			</div>
		</div>
	);
};

export default Header;
