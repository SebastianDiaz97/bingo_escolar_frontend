import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import type { Bingo, BingoForm, BingoFormChange } from "../types";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import LoadingButton from "./LoadingButton";
import { changeDataBingo } from "../api/bingoApi";

type Props = {
  onClose: () => void;
  bingoData: Bingo;
};

export default function EditBingoForm({ onClose, bingoData }: Props) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    name: bingoData.name,
    date: new Date(bingoData.date).toISOString().split("T")[0],
    description: bingoData.description,
    coursesGoal: bingoData.coursesGoal,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleChangeBingo = async (bingoDataForm: BingoFormChange) => {
    setLoading(true);
    const bingo: BingoForm = {
      ...bingoDataForm,
      date: new Date(bingoDataForm.date),
    };
    try {
      await changeDataBingo(bingoData.id, bingo);
      toast.success("Bingo modificado correctamente");
      queryClient.invalidateQueries({
        queryKey: ["bingos"],
      });
      onClose();
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.error);
      }
    }
    setLoading(false);
  };
  return (
    <form className="space-y-5 m-5" onSubmit={handleSubmit(handleChangeBingo)}>
      <h2 className="mb-5 text-2xl font-bold">Modificar Bingo</h2>
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
      <div className="flex gap-3 pt-4">
        <LoadingButton
          type="button"
          onClick={onClose}
          className="bg-slate-700 px-4 py-3  hover:bg-slate-600 w-full"
        >
          cancelar
        </LoadingButton>
        <LoadingButton
          loading={loading}
          type="submit"
          className="bg-blue-600 p-3 w-full"
        >
          Modificar bingo
        </LoadingButton>
      </div>
    </form>
  );
}
