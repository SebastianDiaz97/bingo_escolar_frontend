import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  CATEGORY_EXPENSES,
  CATEGORY_INCOMES,
  type Expense,
  type Income,
  type Movements,
} from "../types";
import ErrorMessage from "./ErrorMessage";
import { useState } from "react";
import LoadingButton from "./LoadingButton";
import { useCursos } from "../hooks/useCursos";
import { updateIncome } from "../api/incomeApi";
import { updateExpense } from "../api/expenseApi";

type Props = {
  income?: Income;
  expense?: Expense;
  onClose: () => void;
};
export default function EditMovements({ income, expense, onClose }: Props) {
  const { bingoId } = useParams();
  const movement = income || expense;
  const type = income ? "income" : "expense";
  const queryClient = useQueryClient();
  const { data: courses } = useCursos();
  const [loading, setLoading] = useState(false);

  const formatedDate = (date?: Date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };
  const initialValues = {
    description: movement?.description || "",
    category: movement?.category || "",
    amount: movement?.amount || 0,
    date: formatedDate(movement?.date),

    // income
    paymentMethod: type === "income" && income ? income.paymentMethod : "",
    courseId: type === "income" && income ? income.courseId || "" : "",

    // expense
    state: type === "expense" && expense ? expense.state : "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate: incomeMutate } = useMutation({
    mutationFn: ({
      bingoId,
      incomeId,
      data,
    }: {
      bingoId: number;
      incomeId: number;
      data: Movements;
    }) => updateIncome(bingoId, incomeId, data),
    onMutate: () => {
      setLoading(true);
    },

    onSuccess: () => {
      toast.success("Ingreso modificado correctamente");

      queryClient.invalidateQueries({
        queryKey: ["incomes", Number(bingoId)],
      });
      setLoading(false);
      onClose();
    },

    onError: (error) => {
      setLoading(false);
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data.errors?.[0]?.msg || "Error desconocido",
        );
      }
    },
  });
  const { mutate: expenseMutate } = useMutation({
    mutationFn: ({
      bingoId,
      expenseId,
      data,
    }: {
      bingoId: number;
      expenseId: number;
      data: Movements;
    }) => updateExpense(bingoId, expenseId, data),
    onMutate: () => {
      setLoading(true);
    },

    onSuccess: () => {
      toast.success("Gasto modificado correctamente");

      queryClient.invalidateQueries({
        queryKey: ["expense", Number(bingoId)],
      });
      setLoading(false);
      onClose();
    },

    onError: (error) => {
      setLoading(false);
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data.errors?.[0]?.msg || "Error desconocido",
        );
      }
    },
  });

  const onSubmit = (data: Movements) => {
    if (type === "income") {
      if (data.courseId === "") data.courseId = 0;
      incomeMutate({
        bingoId: Number(bingoId),
        incomeId: Number(income?.id),
        data,
      });
    }
    if (type === "expense") {
      expenseMutate({
        bingoId: Number(bingoId),
        expenseId: Number(expense?.id),
        data,
      });
    }
  };

  return (
    <div className="w-full max-w-lg rounded-3xl bg-slate-900 p-6 text-white">
      <h2 className="text-2xl font-bold">
        {type === "income" ? "Editar Ingreso" : "Editar Gasto"}
      </h2>
      <form className="space-y-5 m-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-3">
          <label
            htmlFor="description"
            className="text-lg capitalize text-slate-500"
          >
            Descripción
          </label>
          <input
            id="description"
            type="text"
            className="w-full rounded-xl bg-slate-800 p-3 outline-none"
            {...register("description", {
              required: "La descripción es obligatoria",
            })}
          />
          {errors.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
        </div>
        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="amount" className="text-lg text-slate-500">
            Monto
          </label>
          <input
            id="amount"
            type="text"
            className="w-full rounded-xl bg-slate-800 p-3 outline-none"
            {...register("amount", {
              required: "El monto es obligatorio",
              valueAsNumber: true,
            })}
          />
          {errors.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="category" className="text-lg text-slate-500">
            Categoria
          </label>
          <select
            id="category"
            {...register("category", {
              required: "La categoría es obligatoria",
            })}
            className="rounded-xl bg-slate-800 px-3 py-2 outline-none capitalize"
          >
            {(type === "income" ? CATEGORY_INCOMES : CATEGORY_EXPENSES).map(
              (category) => (
                <option className="capitalize" key={category} value={category}>
                  {category}
                </option>
              ),
            )}
          </select>
          {errors.category && (
            <ErrorMessage>{errors.category.message}</ErrorMessage>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="date" className="text-lg text-slate-500">
            Fecha
          </label>
          <input
            id="date"
            type="date"
            className="w-full rounded-xl bg-slate-800 p-3 outline-none"
            {...register("date", {
              required: "La fecha es obligatoria",
            })}
          />
          {errors.date && <ErrorMessage>{errors.date.message}</ErrorMessage>}
        </div>

        {type === "income" && (
          <>
            <div>
              <label
                htmlFor="payment"
                className="mb-2 block text-sm text-slate-300"
              >
                Método de pago
              </label>

              <select
                id="payment"
                {...register("paymentMethod")}
                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none transition focus:border-cyan-400"
              >
                <option value="efectivo">Efectivo</option>
                <option value="transferencia">Transferencia</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="course"
                className="mb-2 block text-sm text-slate-300"
              >
                Curso
              </label>

              <select
                id="course"
                {...register("courseId")}
                className="w-full capitalize rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none transition focus:border-cyan-400"
              >
                <option value="">Sin curso</option>

                {courses?.map((course) => (
                  <option
                    className="capitalize"
                    key={course.id}
                    value={course.id}
                  >
                    {course.name}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {type === "expense" && (
          <div>
            <label
              htmlFor="state"
              className="mb-2 block text-sm text-slate-300"
            >
              Estado
            </label>

            <select
              id="state"
              {...register("state")}
              className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none transition focus:border-cyan-400"
            >
              <option value="">Seleccionar</option>
              <option value="pendiente">pendiente</option>
              <option value="pagado">pagado</option>
            </select>
          </div>
        )}

        {/* botones */}
        <div className="flex gap-3 pt-4">
          <LoadingButton
            onClick={onClose}
            type="button"
            className="bg-slate-700 px-4 py-3 w-full hover:bg-slate-600"
          >
            Cancelar
          </LoadingButton>
          <LoadingButton
            loading={loading}
            type="submit"
            className="bg-cyan-500/20 px-4 py-3 w-full text-cyan-300 hover:bg-cyan-500/30"
          >
            Guardar cambios
          </LoadingButton>
        </div>
      </form>
    </div>
  );
}
