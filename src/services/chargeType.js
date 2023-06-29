import api from "./api";

export async function getAllChargeTypesRequest() {
	const { data } = await api.get("/ChargeType");
	return data;
}