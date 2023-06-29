import api from "./api";

export async function getAllCatalogStatusRequest() {
	const { data } = await api.get("/CatalogStatus");
	return data;
}