import api from "./api";

export async function getAllCategoriesRequest() {
	const { data } = await api.get("/Category");
	return data;
}