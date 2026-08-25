import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";

const PublicLayout = () => {
	return (
		<div className="min-h-screen bg-[#111] text-neutral-200">
			<Header />
			<main className="">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default PublicLayout;
