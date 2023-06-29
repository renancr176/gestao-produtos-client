import api from "./api";

export async function getAllPeriodsRequest() {
	const { data } = await api.get("/Period");
	return data;
}