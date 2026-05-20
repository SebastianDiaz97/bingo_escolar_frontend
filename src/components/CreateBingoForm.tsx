import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import type { BingoForm } from "../types";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import LoadingButton from "./LoadingButton";
import { useState } from "react";
import { createBingo } from "../api/bingoApi";

type Props = {
  onClose: () => void;
};

export default function CreateBingoForm({ onClose }: Props) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    name: "",
    date: new Date(),
    description: "",
    coursesGoal: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleCreateBingo = async (formData: BingoForm) => {
    setLoading(true);
    try {
      await createBingo(formData);
      toast.success("Bingo creado correctamente");
      queryClient.invalidateQueries({
        queryKey: ["bingos"],
      });
      onClose();
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.error);
      }
    }
  };

  return (
    <form className="space-y-5 m-5" onSubmit={handleSubmit(handleCreateBingo)}>
      <h2 className="mb-5 text-2xl font-bold">Crear Bingo</h2>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="text-lg text-slate-500">
          Nombre del bingo
        </label>
        <input
          id="name"
          type="text"
          className="w-full rounded-xl bg-slate-800 p-3 outline-none"
          {...register("name", {
            required: "El nombre es obligatorio",
          })}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="date" className="text-lg text-slate-500">
          Fecha
        </label>
        <input
          id="date"
          type="date"
          min={new Date().toISOString().split("T")[0]}
          className="w-full rounded-xl bg-slate-800 p-3 outline-none"
          {...register("date", {
            required: "La fecha es obligatoria",
          })}
        />
        {errors.date && <ErrorMessage>{errors.date.message}</ErrorMessage>}
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="description" className="text-lg text-slate-500">
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
        <label htmlFor="coursesGoal" className="text-lg text-slate-500">
          Meta por curso
        </label>
        <input
          id="coursesGoal"
          type="number"
          className="w-full rounded-xl bg-slate-800 p-3 outline-none"
          {...register("coursesGoal", {
            required: "La meta es obligatoria",
          })}
        />
        {errors.coursesGoal && (
          <ErrorMessage>{errors.coursesGoal.message}</ErrorMessage>
        )}
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
          disabled={false}
          type="submit"
          className="bg-blue-600 p-3"
        >
          Crear bingo
        </LoadingButton>
      </div>
    </form>
  );
}
