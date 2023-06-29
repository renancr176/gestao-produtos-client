import api from "./api";

export async function getAllComplexityTypesRequest() {
	const { data } = await api.get("/ComplexityType");
	return data;
}