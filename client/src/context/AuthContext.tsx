import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
	token: string | null;
	userRole: string | null;
	isAuthenticated: boolean;
	login: (token: string, role: string, userData: any) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [token, setToken] = useState<string | null>(
		localStorage.getItem("ridevest_token"),
	);
	const [userRole, setUserRole] = useState<string | null>(
		localStorage.getItem("ridevest_userRole"),
	);

	const login = (newToken: string, role: string, userData: any) => {
		setToken(newToken);
		setUserRole(role);
		localStorage.setItem("ridevest_token", newToken);
		localStorage.setItem("ridevest_userRole", role);
		localStorage.setItem("ridevest_user", JSON.stringify(userData));
	};

	const logout = () => {
		setToken(null);
		setUserRole(null);
		localStorage.removeItem("ridevest_token");
		localStorage.removeItem("ridevest_userRole");
		localStorage.removeItem("ridevest_user");

		// clean up old generic keys
		localStorage.removeItem("token");
		localStorage.removeItem("userRole");
		localStorage.removeItem("company");
		localStorage.removeItem("rider");
	};

	// keep auth state in sync across tabs
	useEffect(() => {
		const handleStorageChange = (e: StorageEvent) => {
			if (e.key === "ridevest_token") {
				setToken(e.newValue);
			}
			if (e.key === "ridevest_userRole") {
				setUserRole(e.newValue);
			}
		};
		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, []);

	return (
		<AuthContext.Provider
			value={{ token, userRole, isAuthenticated: !!token, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
