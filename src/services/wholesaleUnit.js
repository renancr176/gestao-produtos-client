import api from "./api";

export async function getAllWholesaleUnitsRequest() {
	const { data } = await api.get("/WholesaleUnit");
	return data;
}