import api from "./api";

export async function getAllExhaustedQuotaTypesRequest() {
	const { data } = await api.get("/ExhaustedQuotaType");
	return data;
}