import api from "../config/axios";
import type { Bingo, BingoForm, UsersBingo } from "../types";

export async function getBingosByUser() {
    const { data } = await api<Bingo[]>("/api/bingo");
    return data;
}

export async function createBingo(formData: BingoForm) {
    const { data } = await api.post<string>(`/api/bingo`, formData);
    return data;
}

export async function changeStatusBingo(id: number) {
    const { data } = await api.put<string>(`/api/bingo/${id}/status`);
    return data;
}

export async function changeDataBingo(id: number, bingo: BingoForm) {
    const { data } = await api.put<string>(`/api/bingo/${id}`, bingo);
    return data;
}

export async function getUsersByBingo(id: number) {
    const { data } = await api<UsersBingo[]>(`/api/bingo/${id}`);
    return data;
}

export async function changeRoleUserBingo(bingoId: number, userId: number, role: string) {
    const { data } = await api.put<string>(`/api/bingo/${bingoId}/user/${userId}`, { role });
    return data;
}

export async function deleteRoleUserBingo(bingoId: number, userId: number) {
    const { data } = await api.delete(`/api/bingo/${bingoId}/user/${userId}`);
    return data;
}

export async function addUserToBingo(bingoId: number, userId: number, role: string) {
    const { data } = await api.post<string>(`/api/bingo/${bingoId}/user/${userId}`, { role });
    return data;
}