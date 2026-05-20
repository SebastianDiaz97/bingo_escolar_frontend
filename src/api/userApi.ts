import api from "../config/axios";
import type { User, UserData } from "../types";

export async function getUsersActive(bingoId: number) {
    const { data } = await api<User[]>(`/api/user/active/${bingoId}`);
    return data;
}

export async function getUser() {
    const { data } = await api<UserData>("/api/user");
    return data;
}