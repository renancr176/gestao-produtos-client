import api from "./api";

export async function getAllCurrencyTypesRequest() {
	const { data } = await api.get("/CurrencyType");
	return data;
}