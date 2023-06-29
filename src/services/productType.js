import api from "./api";

export async function getAllProductTypesRequest() {
	const { data } = await api.get("/ProductType");
	return data;
}