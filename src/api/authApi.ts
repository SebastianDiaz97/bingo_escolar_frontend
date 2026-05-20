import api from "../config/axios";
import type { LoginForm } from "../types";


export async function login(formData: LoginForm) {
    const { data } = await api.post("/api/auth/login", formData);
    return data;
}

// export async function register(formData: RegisterForm) {
//     const { data } = await api.post("/api/auth/create-account", formData);
//     return data;
// }