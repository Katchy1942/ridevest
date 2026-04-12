import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from '@vercel/analytics/react';

createRoot(document.getElementById('root')!).render(
	<>
	<App />
	<Analytics />
	<Toaster
		richColors
		position='top-center'
	/>
	</>
)
