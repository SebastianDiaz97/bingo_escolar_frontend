import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import LoadingButton from "./LoadingButton";
import { createCurso } from "../api/cursoApi";

type Props = {
  onClose: () => void;
};

export default function CreateCourseForm({ onClose }: Props) {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { mutate } = useMutation({
    mutationFn: createCurso,
    onMutate: () => setLoading(true),
    onError: (errors) => {
      toast.error(errors.message);
    },
    onSuccess: async () => {
      toast.success("Curso creado correctamente");
      await queryClient.refetchQueries({
        queryKey: ["cursos"],
      });
      onClose();
    },
  });

  return (
    <div>
      <h2 className="mb-5 text-2xl font-bold">Crear curso</h2>

      <input
        placeholder="Nombre del curso"
        className="w-full rounded-xl bg-slate-800 p-3 outline-none"
        onChange={(e) => setName(e.target.value)}
      />
      <LoadingButton
        loading={loading}
        disabled={false}
        type="button"
        onClick={() => mutate(name)}
        className="
              bg-blue-600 mt-5 py-3
                "
      >
        Crear
      </LoadingButton>
    </div>
  );
}
