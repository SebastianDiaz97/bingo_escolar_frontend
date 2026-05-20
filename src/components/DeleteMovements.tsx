import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import type { Expense, Income } from "../types";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { useState } from "react";
import LoadingButton from "./LoadingButton";
import { deleteIncome } from "../api/incomeApi";
import { deleteExpense } from "../api/expenseApi";
import { formatCLP } from "../utils";

type Props = {
  income?: Income;
  expense?: Expense;
  onClose: () => void;
};
export default function DeleteMovements({ income, expense, onClose }: Props) {
  const { bingoId } = useParams();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    try {
      if (income) {
        await deleteIncome(Number(bingoId), income.id);
        toast.success("Ingreso eliminado correctamente");
        queryClient.invalidateQueries({
          queryKey: ["incomes", Number(bingoId)],
        });
      }
      if (expense) {
        await deleteExpense(Number(bingoId), expense.id);
        toast.success("Gasto eliminado correctamente");
        queryClient.invalidateQueries({
          queryKey: ["expense", Number(bingoId)],
        });
      }
      queryClient.invalidateQueries({
        queryKey: ["dashboard", Number(bingoId)],
      });
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.error);
      }
    }
    setLoading(false);
    onClose();
  };
  return (
    <div className="w-full max-w-md rounded-3xl bg-slate-900 p-6 text-white text-center ">
      <h2 className="text-xl font-bold text-red-400">Eliminar movimiento</h2>

      <p className="mt-3 text-sm text-slate-300">
        ¿Estás seguro que deseas eliminar este movimiento?
      </p>

      <div className="mt-5 rounded-2xl bg-slate-800 p-4">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-slate-400">Descripción</span>
            <span className="font-medium capitalize">
              {expense?.description}
              {income?.description}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-slate-400">Categoría</span>
            <span className="font-medium capitalize">
              {expense?.category}
              {income?.category}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-slate-400">Monto</span>
            <span className="font-medium text-red-400 capitalize">
              {income ? formatCLP(Number(income?.amount)) : formatCLP(Number(expense?.amount))}
            </span>
          </div>

          {expense && (
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Estado</span>
              <span className="font-medium capitalize">{expense?.state}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={onClose}
          className="w-full rounded-2xl bg-slate-700 px-4 py-3 text-sm font-medium transition hover:bg-slate-600"
        >
          Cancelar
        </button>
        <LoadingButton
          loading={loading}
          type="button"
          onClick={handleDelete}
          className="bg-red-500/20 px-4 py-3 text-red-300 hover:bg-red-500/30"
        >
          Confirmar
        </LoadingButton>
      </div>
    </div>
  );
}
