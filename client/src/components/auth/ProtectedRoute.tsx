import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import api from '../../lib/axios';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = () => {
	const [isValid, setIsValid] = useState<boolean | null>(null);
	const token = localStorage.getItem('token');

	useEffect(() => {
		const verifyToken = async () => {
			if (!token) {
				setIsValid(false);
				return;
			}

			try {
				await api.get('/auth/verify');
				setIsValid(true);
			} catch (error) {
				setIsValid(false);
			}
		};

		verifyToken();
	}, [token]);

	if (isValid === null) {
		return (
			<div className="min-h-screen bg-black flex items-center justify-center">
				<Loader2 className="animate-spin rounded-full h-8 w-8 text-emerald-500" />
			</div>
		);
	}

	if (!isValid) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
