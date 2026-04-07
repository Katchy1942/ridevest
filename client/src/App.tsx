import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import DashboardLayout from './components/layout/DashboardLayout';
import PublicLayout from './components/layout/PublicLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import DeliveriesPage from './pages/deliveries/DeliveriesPage';
import DevicesPage from './pages/devices/DevicesPage';
import RidersPage from './pages/riders/RidersPage';
import SettingsPage from './pages/settings/SettingsPage';
import AddDeliveryPage from './pages/deliveries/AddDeliveryPage';
import PaymentsResponse from './pages/deliveries/PaymentsResponse';
import ProtectedRoute from './components/auth/ProtectedRoute';
import TrackDelivery from './pages/deliveries/TrackDelivery';
import DemoGuide from './pages/common/DemoGuide';

const App = () => {
	return (
		<div className='bg-neutral-950 min-h-screen text-neutral-100'>
			<BrowserRouter>
				<Routes>
					<Route element={<PublicLayout />}>
						<Route path="/" element={<DemoGuide />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						{/* Protected non-dashboard routes */}
						<Route element={<ProtectedRoute />}>
							<Route path="/add-delivery" element={<AddDeliveryPage />} />
							<Route path="/payment-response" element={<PaymentsResponse />} />
							<Route path="/track-delivery" element={<TrackDelivery />} />
						</Route>
					</Route>
					{/* Protected Dashboard Routes */}
					<Route element={<ProtectedRoute />}>
						<Route path="/dashboard" element={<DashboardLayout />}>
							<Route index element={<DashboardPage />} />
							<Route path="deliveries" element={<DeliveriesPage />} />
							<Route path="devices" element={<DevicesPage />} />
							<Route path="riders" element={<RidersPage />} />
							<Route path="settings" element={<SettingsPage />} />
						</Route>
					</Route>

					{/* Catch-all redirect to login */}
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App;
