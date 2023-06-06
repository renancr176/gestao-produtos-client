import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { USER_ROLES, verifyRoles } from "../utils/userRoles";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const location = useLocation();

	useEffect(() => {
		const token = Cookies.get("token");
		const userJson = Cookies.get("user");
		if (token && userJson) setUser(JSON.parse(userJson));
		setIsLoading(false);
	}, []);

	useEffect(() => {
		const tokenCookie = Cookies.get("token");
		if (user && !tokenCookie) setUser(null);
	}, [location, user]);

	const signIn = (user, token, expiresIn) => {
		setIsLoading(true);
		let userObj;
		try {
			const expiresInDays = expiresIn / 24 / 60 / 60;
			Cookies.set("token", token, { expires: expiresInDays });

			const roles = getRoles(token);

			userObj = { ...user, roles };
			Cookies.set("user", JSON.stringify(userObj), { expires: expiresInDays });
			setUser(userObj);
		} catch (error) {
			console.error(error);
			userObj = null;
			throw new Error("Oooops!");
		} finally {
			setIsLoading(false);
			return userObj;
		}
	};

	const getRoles = (token) => {
		const tokenDecoded = jwt_decode(token);
		return typeof tokenDecoded.roles === "string"
			? [tokenDecoded.roles]
			: tokenDecoded.roles;
	};

	const signOut = () => {
		setUser(null);
		Cookies.remove("token");
		Cookies.remove("user");
	};

	const isAuthenticated = user && Cookies.get("token");

	const hasRoles = (roles) => {
		return verifyRoles(roles, user?.roles ?? "");
	};

	const getUserAreaPath = () => {
		if (!user) return "/";
		if (hasRoles([USER_ROLES.ADMIN])) return "/admin/";
		return "/";
	};
	
	return (
		<AuthContext.Provider
			value={{
				user,
				signIn,
				signOut,
				isAuthenticated,
				isLoading,
				hasRoles,
				getUserAreaPath
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
