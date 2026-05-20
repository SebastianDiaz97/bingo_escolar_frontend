import api from "../config/axios";
import type { Expense, Movements } from "../types";

export async function getExpenses(bingoId: number) {
    const { data } = await api<Expense[]>(`/api/bingo/${bingoId}/expense`);
    return data;
}

export async function deleteExpense(bingoId: number, expenseId: number) {
    const { data } = await api.delete(`/api/bingo/${bingoId}/expense/${expenseId}`);
    return data;
}

export async function updateExpense(bingoId: number, expenseId: number, formData: Movements) {
    const { data } = await api.put<string>(`/api/bingo/${bingoId}/expense/${expenseId}`, formData);
    return data;
}
