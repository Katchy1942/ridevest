const HeroSection = () => {
	return (
		<section
			className="relative overflow-hidden
				w-full h-screen pb-12
				flex flex-col justify-end"
		>
			<video
				className="absolute inset-0 w-full h-full
					object-cover scale-[1.02]"
				src="/bg-video.mp4"
				autoPlay
				loop
				muted
				playsInline
			/>

			<div className="absolute inset-0 bg-black/55" />
			<div
				className="absolute inset-0
					bg-linear-to-t from-black/70 via-transparent to-black/20"
			/>

			<div
				className="relative z-10 w-full
					flex flex-col items-start
					text-left"
			>

				<h1
					className="mb-5 px-2 text-left
						sm:text-8xl text-4xl font-extralight text-white/60
						tracking-[-0.07em] leading-[0.9]"
				>
					Manage your <span className="text-white/45">entire</span>{" "}
					dispatch operations from one place.
				</h1>
			</div>
		</section>
	);
};

export default HeroSection;
