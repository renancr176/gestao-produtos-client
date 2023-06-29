import api from "./api";

export async function getAllSaleTypesRequest() {
	const { data } = await api.get("/SaleType");
	return data;
}