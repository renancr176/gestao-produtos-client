import api from "./api";

export async function getSupplierProductRequest(id) {
	const { data } = await api.get(`/SupplierProduct/${id}`);
	return data;
}

export async function searchSupplierProductsRequest(requestData) {
	const { data } = await api.get("/SupplierProduct/Search", { params: requestData });
	return data;
}

export async function editSupplierProductRequest(requestData) {
	const { data } = await api.put("/SupplierProduct", requestData);
	return data;
}