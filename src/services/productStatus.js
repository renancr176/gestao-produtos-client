import api from "./api";

export async function getAllProductStatusRequest() {
	const { data } = await api.get("/ProductStatus");
	return data;
}