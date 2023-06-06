import api from "./api";

export async function signInRequest({userName, password}) {
    const {data} = await api.post("/User/SignIn", {userName, password});
    return data;
}