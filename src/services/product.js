import api from "./api";

export async function searchProductsRequest(requestData) {
	const { data } = await api.get("/Product/Search", { params: requestData });
	return data;
}

export async function addProductRequest(requestData) {
	const { data } = await api.post("/Product", requestData);
	return data;
}