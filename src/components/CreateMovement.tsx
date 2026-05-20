import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { CATEGORY_EXPENSES, CATEGORY_INCOMES, type Movements } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import LoadingButton from "./LoadingButton";
import { useState } from "react";
import { useCursos } from "../hooks/useCursos";
import { createMovement } from "../api/incomeApi";

type Props = {
  type: "income" | "expense";
  onClose: () => void;
};
export default function CreateMovement({ type, onClose }: Props) {
  const { bingoId } = useParams();
  const queryClient = useQueryClient();
  const { data: courses } = useCursos();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    description: "",
    category: "",
    amount: "",
    date: "",

    // income
    paymentMethod: "",
    courseId: "",

    // expense
    state: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate: createIncome } = useMutation({
    mutationFn: ({
      bingoId,
      formData,
    }: {
      bingoId: number;
      formData: Movements;
    }) => createMovement(bingoId, formData, "income"),
    onSuccess: () => {
      toast.success("Ingreso creado correctamente");
      queryClient.invalidateQueries({
        queryKey: ["incomes", Number(bingoId)],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard", Number(bingoId)],
      });
      onClose();
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data.errors?.[0]?.msg || "Error desconocido",
        );
      }
    },
  });
  const { mutate: createExpense } = useMutation({
    mutationFn: ({
      bingoId,
      formData,
    }: {
      bingoId: number;
      formData: Movements;
    }) => createMovement(bingoId, formData, "expense"),
    onSuccess: () => {
      toast.success("Gasto creado correctamente");
      queryClient.invalidateQueries({
        queryKey: ["expense", Number(bingoId)],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard", Number(bingoId)],
      });
      onClose();
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data.errors?.[0]?.msg || "Error desconocido",
        );
      }
    },
  });

  const onSubmit = (formData: Movements) => {
    setLoading(true);
    if (type === "income") {
      if (formData.courseId === "") delete formData.courseId;
      createIncome({
        bingoId: Number(bingoId),
        formData,
      });
    }
    if (type === "expense")
      createExpense({
        bingoId: Number(bingoId),
        formData,
      });
    setLoading(false);
  };
  return (
    <div className="w-full max-w-lg rounded-3xl bg-slate-900 p-6 text-white">
      <h2 className="text-2xl font-bold">
        {type === "income" ? "Crear Ingreso" : "Crear Gasto"}
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
            type="number"
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
            <div className="grid grid-cols-1 gap-3">
              <label
                htmlFor="payment"
                className="mb-2 block text-sm text-slate-300"
              >
                Método de pago
              </label>

              <select
                id="payment"
                {...register("paymentMethod", {
                  validate: (value) =>
                    value !== "" || "Debes seleccionar un método de pago",
                })}
                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none transition focus:border-cyan-400"
              >
                <option value="">Seleccione un método de pago</option>
                <option value="efectivo">Efectivo</option>
                <option value="transferencia">Transferencia</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
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
          <div className="grid grid-cols-1 gap-3">
            <label htmlFor="state" className="text-lg text-slate-500">
              Estado
            </label>

            <select
              id="state"
              {...register("state", {
                validate: (value) =>
                  value !== "" || "Debes seleccionar un estado",
              })}
              className="w-full rounded-2xl border border-slate-700 mb-3 bg-slate-800 px-4 py-3 outline-none transition focus:border-cyan-400"
            >
              <option value="">Seleccionar</option>
              <option value="pendiente">pendiente</option>
              <option value="pagado">pagado</option>
            </select>
            {errors.state && (
              <ErrorMessage>{errors.state.message}</ErrorMessage>
            )}
          </div>
        )}

        {/* botones */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-2xl bg-slate-700 px-4 py-3 font-medium transition hover:bg-slate-600"
          >
            Cancelar
          </button>

          <LoadingButton
            loading={loading}
            type="submit"
            className="text-cyan-300 hover:bg-cyan-500/30 bg-cyan-500/20 "
          >
            {type === "income" ? "Crear Ingreso" : "Crear Gasto"}
          </LoadingButton>
        </div>
      </form>
    </div>
  );
}
