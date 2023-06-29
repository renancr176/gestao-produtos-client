import api from "./api";

export async function getAllSupplierProductTypesRequest() {
	const { data } = await api.get("/SupplierProductType");
	return data;
}