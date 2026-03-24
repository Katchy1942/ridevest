import { useState, useRef } from 'react';
import { X } from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react'
import { ImageUploadIcon } from '@hugeicons/core-free-icons';


interface ImageUploadProps {
	onImageSelect: (file: File | null) => void;
	disabled?: boolean;
}

export const ImageUpload = ({ onImageSelect, disabled }: ImageUploadProps) => {
	const [preview, setPreview] = useState<string | null>(null);
	const [isHovered, setIsHovered] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFile = (file: File) => {
		if (!file.type.startsWith('image/')) return;
		
		onImageSelect(file);
		const reader = new FileReader();
		reader.onload = (e) => setPreview(e.target?.result as string);
		reader.readAsDataURL(file);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			handleFile(e.target.files[0]);
		}
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		if (!disabled) setIsHovered(true);
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		setIsHovered(false);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsHovered(false);
		if (disabled) return;
		
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			handleFile(e.dataTransfer.files[0]);
		}
	};

	const clearImage = (e: React.MouseEvent) => {
		e.stopPropagation();
		setPreview(null);
		onImageSelect(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	return (
		<div 
			className={`relative w-full border border-dashed rounded-lg transition-all duration-200 overflow-hidden ${
			disabled ? 'opacity-50 cursor-not-allowed border-zinc-700 bg-zinc-900/50' : 'cursor-pointer'
			} ${
			!disabled && isHovered 
				? 'border-emerald-500 bg-emerald-500/5' 
				: !disabled ? 'border-zinc-700 hover:border-emerald-500/50 hover:bg-zinc-800/30' : ''
			}`}
			onClick={() => !disabled && fileInputRef.current?.click()}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
		>
			<input
			type="file"
			ref={fileInputRef}
			onChange={handleChange}
			accept="image/*"
			disabled={disabled}
			className="hidden"
			/>
			
			{preview ? (
			<div className="relative w-full h-40 flex items-center justify-center p-2 group">
				<img src={preview} alt="Upload preview" className="h-full w-full object-contain rounded-lg" />
				<div className="absolute inset-0 bg-zinc-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
					<button 
						type="button" 
						onClick={clearImage}
						className="p-3 bg-red-500/20 text-red-500 rounded-full hover:bg-red-500 hover:text-white cursor-pointer transition-all duration-200 shadow-xl"
					>
						<X size={24} />
					</button>
				</div>
			</div>
			) : (
			<div className="flex flex-col items-center justify-center py-8 px-4 text-center">
				<div className={`p-3 rounded-full mb-3 transition-colors ${
					isHovered ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800/80 text-zinc-400'
				}`}>
					<HugeiconsIcon icon={ImageUploadIcon} size={28} strokeWidth={1.5} />
				</div>
				<p className="text-sm font-medium text-zinc-300 mb-1 pointer-events-none">
					Click to upload <span className="text-zinc-500 font-normal">or drag and drop</span>
				</p>
				<p className="text-xs text-zinc-500 pointer-events-none">
					SVG, PNG, JPG or WEBP (max. 5MB)
				</p>
			</div>
			)}
		</div>
	);
}
