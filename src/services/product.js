import api from "./api";

export async function getProductRequest(id) {
	const { data } = await api.get(`/Product/${id}`);
	return data;
}

export async function searchProductsRequest(requestData) {
	const { data } = await api.get("/Product/Search", { params: requestData });
	return data;
}

export async function addProductRequest(requestData) {
	const { data } = await api.post("/Product", requestData);
	return data;
}

export async function editProductRequest(requestData) {
	const { data } = await api.put("/Product", requestData);
	return data;
}