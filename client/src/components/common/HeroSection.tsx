import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const HeroSection = () => {
	return (
		<section
			className="relative w-full h-screen 
				flex items-center justify-center 
				overflow-hidden"
		>
			<video
				className="absolute inset-0 w-full 
					h-full object-cover scale-[1.02]"
				src="/bg-video.mp4"
				autoPlay
				loop
				muted
				playsInline
			/>

			<div className="absolute inset-0 bg-black/55" />
			<div
				className="absolute inset-0 bg-linear-to-t 
					from-black/70 via-transparent to-black/20"
			/>

			<div
				className="relative z-10 flex flex-col 
					items-center text-center px-5 
					max-w-3xl mx-auto"
			>
				<h1
					className="text-5xl font- leading-[1.08] 
						tracking-tighter text-white mb-5"
				>
					<span className="text-white/45">Every delivery,</span> Always
					tracked
				</h1>

				<p
					className="text-md text-white/45 max-w-lg 
						leading-[1.4] mb-10"
				>
					Ridevest gives logistics teams full dispatch control and
					real-time visibility, from the first mile to the last.
				</p>

				<div className="flex items-center gap-3">
					<Link
						to="/register"
						className="group relative inline-flex items-center 
							gap-1.5 overflow-hidden rounded-full border
							bg-emerald-600 px-5 py-2.5 text-sm tracking-tight 
							text-black transition-all duration-300 
							hover:bg-transparent hover:border-emerald-600
							border-emerald-600 hover:text-emerald-600"
					>
						Get started
						<ArrowUpRight
							size={16}
							className="transition-transform duration-200 
								group-hover:translate-x-px 
								group-hover:-translate-y-px"
						/>
					</Link>
				</div>

				<div
					className="mt-10 border border-gray-500 
						p-4 flex flex-col items-center gap-3
						rounded-sm"
				>
					<div className="flex flex-wrap justify-center gap-4">
						{[
							"/Real-time GPS",
							"/Rider dispatch",
							"/Proof of delivery",
							"/SMS notifications",
							"/Live ETA",
						].map((pill) => (
							<span
								key={pill}
								className="inline-flex items-center
									text-xs text-white/50 tracking-tight
									font-light"
							>
								{pill}
							</span>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
