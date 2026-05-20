import api from "../config/axios";
import type { Dashboard } from "../types";

export async function getDashboard(bingoId: number) {
    const { data } = await api<Dashboard>(`/api/dashboard/${bingoId}`);
    return data;
}