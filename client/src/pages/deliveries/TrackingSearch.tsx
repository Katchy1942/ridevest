interface TrackingSearchProps {
	loading: boolean;
	value: string;
	onChange: (value: string) => void;
	onTrack: () => void;
}

const TrackingSearch = ({
	loading,
	value,
	onChange,
	onTrack,
}: TrackingSearchProps) => {
	return (
		<div className="flex flex-col items-center gap-4 w-full max-w-md px-4">
			<p className="text-zinc-200 text-xl tracking-tighter font-semibold">
				Track your delivery
			</p>
			<div className="flex items-center w-full border-2 border-zinc-700 rounded-full px-2 py-1 gap-2 focus-within:border-emerald-500 transition-colors">
				<input
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && onTrack()}
					placeholder="Enter tracking code"
					className="flex-1 bg-transparent text-white tracking-tight text-xs placeholder-zinc-500 outline-none pl-3"
				/>
				<button
					onClick={onTrack}
					disabled={loading || !value.trim()}
					className="bg-emerald-600 text-zinc-900 text-xs font-medium tracking-tight px-5 py-2 rounded-full hover:bg-emerald-700 transition-colors disabled:cursor-not-allowed disabled:opacity-60 shrink-0"
				>
					Track
				</button>
			</div>
		</div>
	);
};

export default TrackingSearch;
