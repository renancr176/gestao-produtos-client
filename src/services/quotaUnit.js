import api from "./api";

export async function getAllQuotaUnitsRequest() {
	const { data } = await api.get("/QuotaUnit");
	return data;
}