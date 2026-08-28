import { NavLink } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
	Home01Icon,
	UserGroupIcon,
	Motorbike01Icon,
	Door01Icon,
	Settings01Icon,
} from "@hugeicons/core-free-icons";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";

interface SidebarProps {
	isOpen?: boolean;
	onClose?: () => void;
}

const navHeaderClass = `px-4 mb-3 text-xs
	font-medium tracking-wider uppercase
	text-zinc-500`;

const navLinkBaseClass = `flex items-center gap-3
	px-4 py-3 md:py-2 rounded-md
	text-xs tracking-tight
	transition-all duration-200`;

const Sidebar = ({ isOpen = false, onClose = () => {} }: SidebarProps) => {
	const menuItems = [
		{ name: "Dashboard", path: "/dashboard", icon: Home01Icon },
		{
			name: "Deliveries",
			path: "/dashboard/deliveries",
			icon: Motorbike01Icon,
		},
		{ name: "Riders", path: "/dashboard/riders", icon: UserGroupIcon },
	];

	const configItems = [
		{ name: "Settings", path: "/dashboard/settings", icon: Settings01Icon },
	];

	const { logout } = useAuth();

	const handleLogout = () => {
		onClose();

		toast("Are you sure you want to logout?", {
			action: {
				label: "Logout",
				onClick: () => {
					logout();
					toast.success("Successfully logged out");
				},
			},
			cancel: {
				label: "Cancel",
				onClick: () => {},
			},
		});
	};

	return (
		<>
			<div
				className={`fixed inset-0 z-40 md:hidden
					bg-black/60 backdrop-blur-sm
					transition-opacity duration-300
					${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
				onClick={onClose}
			/>

			<aside
				className={`fixed bottom-0 left-0 md:top-0
					z-50 w-full h-[85vh] md:w-44 md:h-screen
					flex flex-col
					bg-zinc-900 border-t border-zinc-800
					rounded-t-4xl md:rounded-none
					shadow-[0_-10px_40px_rgba(0,0,0,0.5)] md:shadow-none
					transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
					md:translate-y-0
					${isOpen ? "translate-y-0" : "translate-y-full"}`}
			>
				<div
					className="flex justify-center w-full
						pt-4 pb-2 md:hidden"
				>
					<div
						className="w-12 h-1.5 rounded-full
							bg-zinc-700/50"
					/>
				</div>

				<div
					className="hidden md:block px-6
						pt-2 pb-2 md:pt-6"
				>
					<h1
						className="shrink-0 text-xl
							font-medium tracking-tighter
							text-emerald-600"
					>
						ridevest
					</h1>
				</div>

				<nav
					className="flex-1 w-full overflow-y-auto
						px-4 py-6 md:py-8
						space-y-6"
				>
					<div className="space-y-1">
						<div className={navHeaderClass}>Menu</div>
						{menuItems.map((item) => (
							<NavLink
								key={item.name}
								to={item.path}
								end={item.path === "/dashboard"}
								onClick={() => onClose()}
								className={({ isActive }) =>
									`${navLinkBaseClass}
										${isActive ? "bg-emerald-900/20 text-emerald-400 font-medium" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"}`
								}
							>
								<HugeiconsIcon
									icon={item.icon}
									size={20}
									strokeWidth={1.5}
								/>
								<span>{item.name}</span>
							</NavLink>
						))}
					</div>

					<div className="space-y-1">
						<div className={navHeaderClass}>Configurations</div>
						{configItems.map((item) => (
							<NavLink
								key={item.name}
								to={item.path}
								onClick={() => onClose()}
								className={({ isActive }) =>
									`${navLinkBaseClass}
										${isActive ? "bg-emerald-900/20 text-emerald-400 font-medium" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"}`
								}
							>
								<HugeiconsIcon
									icon={item.icon}
									size={20}
									strokeWidth={1.5}
								/>
								<span>{item.name}</span>
							</NavLink>
						))}
					</div>
				</nav>

				<div
					className="p-4 pb-8 md:pb-4
						border-t border-zinc-800"
				>
					<button
						onClick={handleLogout}
						className="flex items-center gap-3
							w-full px-4 py-3 md:py-2
							rounded-md text-xs
							text-zinc-400 hover:text-red-400
							hover:bg-zinc-800
							transition-all duration-200 cursor-pointer"
					>
						<HugeiconsIcon
							icon={Door01Icon}
							size={20}
							strokeWidth={1.5}
						/>
						<span>Logout</span>
					</button>
				</div>
			</aside>
		</>
	);
};

export default Sidebar;
