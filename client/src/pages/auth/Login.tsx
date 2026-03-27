import { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/axios';

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const response = await api.post('/auth/login', { email, password });
			
			const { token, company } = response.data;
			
			// Store token and company data
			localStorage.setItem('token', token);
			localStorage.setItem('company', JSON.stringify(company));
			
			toast.success('Successfully logged in!');
			setTimeout(() => {
				toast.info('Proceed to add your riders.');
				navigate('/dashboard/riders');
			}, 1000);
		} catch (err: any) {
			const errorMessage = err.response?.data?.error || 'Login failed. Check your credentials.';
			toast.error(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

  	return (
		<div className='min-h-screen flex flex-col justify-center items-center md:p-10 p-4'>
			<h1 className='font-serif text-4xl tracking-tighter font-extralight text-emerald-600 mb-6'>ridevest<span className='font-black'>.</span></h1>
			<div className="bg-zinc-900 p-6 rounded-xl shadow-sm w-full border border-zinc-800 max-w-md">
				<h2 className="text-2xl font-semibold mb-8 flex justify-center text-zinc-100">
					Login
				</h2>

				<form onSubmit={handleLogin} className="flex flex-col gap-5">
					<div>
						<label className="block text-sm font-medium text-zinc-300 mb-2">Email Address</label>
						<input 
							type="email"
							value={email} 
							onChange={(e) => setEmail(e.target.value)} 
							required 
							disabled={isLoading}
							className="w-full px-4 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors"
							placeholder="kratosmbadiwe@gmail.com"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-zinc-300 mb-2">Password</label>
						<div className="relative">
							<input 
								type={showPassword ? "text" : "password"} 
								value={password} 
								onChange={(e) => setPassword(e.target.value)} 
								required 
								disabled={isLoading}
								className="w-full pl-4 pr-12 py-1.5 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:border focus:outline-none focus:border-emerald-500 text-zinc-100 placeholder-zinc-500 transition-colors"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-400 hover:text-zinc-200 transition-colors focus:outline-none"
							>
								{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
						</div>
					</div>

					<div className="flex items-center justify-between mt-1">
						<div className="flex items-center">
							<input
								id="remember-me"
								name="remember-me"
								type="checkbox"
								className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-zinc-900 cursor-pointer"
							/>
							<label htmlFor="remember-me" className="ml-2 block text-sm text-zinc-300 cursor-pointer">
								Remember me
							</label>
						</div>
						<div className="text-sm">
							<a href="#" onClick={(e) => e.preventDefault()} className="font-medium text-emerald-600 hover:text-emerald-500 transition-colors">
								Forgot password?
							</a>
						</div>
					</div>

					<button 
						type="submit" 
						disabled={isLoading}
						className="mt-2 w-full flex justify-center items-center bg-emerald-700 hover:bg-emerald-600 disabled:bg-emerald-800 disabled:text-emerald-300 disabled:cursor-not-allowed cursor-pointer text-base text-zinc-100 font-medium py-2 shadow-sm rounded-md transition-colors"
					>
						{isLoading ? (
							<>
								<Loader2 className="animate-spin mr-2" size={20} />
								<span className='text-zinc-100'>Logging in...</span>
							</>
						) : (
							<span className='text-zinc-100'>Log In</span>
						)}
					</button>

					<div className="mt-2 text-center text-sm text-zinc-400">
						Don't have an account?{' '}
						<a href="/register" className="font-medium text-emerald-600 hover:text-emerald-500 transition-colors">
							Sign up
						</a>
					</div>
				</form>
			</div>
		</div>
  	);
}

export default Login;