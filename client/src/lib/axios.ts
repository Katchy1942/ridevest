import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
	(config: any) => {
		const token = localStorage.getItem("token");

		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error: any) => {
		return Promise.reject(error);
	},
);

api.interceptors.response.use(
	(response) => response,
	(error) => {
		const isAuthRoute =
			error.config?.url?.includes("/login") ||
			error.config?.url?.includes("/register");

		if (error.response?.status === 401 && !isAuthRoute) {
			localStorage.removeItem("token");
			localStorage.removeItem("company");
			localStorage.removeItem("rider");
			localStorage.removeItem("userRole");
			if (window.location.pathname !== "/login") {
				window.location.href = "/login";
			}
		}

		return Promise.reject(error);
	},
);

export default api;
