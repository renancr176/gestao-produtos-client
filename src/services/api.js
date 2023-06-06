import axios from "axios";
import Cookies from "js-cookie";
import i18next from "i18next";

const url = process.env.REACT_APP_API_URL;

const api = axios.create({
	baseURL: url,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

api.interceptors.request.use((request) => {
	const token = Cookies.get("token");
	if (token) {
		request.headers.Authorization = `Bearer ${token}`;
	}
	const language = i18next.language.startsWith("pt") ? "pt-BR" : "en-US";
	request.headers["Accept-Language"] = language;
	return request;
	},
	(error) => {
		return Promise.reject(error);
	});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			Cookies.remove("token");
		}
		return Promise.reject(error);
	}
);

export default api;
