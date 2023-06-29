import api from "./api";

export async function getAllInvoiceTypesRequest() {
	const { data } = await api.get("/InvoiceType");
	return data;
}