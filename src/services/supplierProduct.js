import api from "./api";

export async function searchSupplierProductsRequest(requestData) {
	const { data } = await api.get("/SupplierProduct/Search", { params: requestData });
	return data;
}