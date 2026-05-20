import api from "../config/axios";
import type { Income, Movements } from "../types";

export async function getIncomes(bingoId: number) {
    const { data } = await api<Income[]>(`/api/bingo/${bingoId}/income`);
    return data;
}

export async function deleteIncome(bingoId: number, incomeId: number) {
    const { data } = await api.delete(`/api/bingo/${bingoId}/income/${incomeId}`);
    return data;
}

export async function updateIncome(bingoId: number, incomeId: number, formData: Movements) {
    const { data } = await api.put<string>(`/api/bingo/${bingoId}/income/${incomeId}`, formData);
    return data;
}

export async function createMovement(bingoId: number, formData: Movements, type: 'income' | 'expense') {
    const url = `/api/bingo/${bingoId}/${type}`
    const { data } = await api.post<string>(url, formData)
    return data
}