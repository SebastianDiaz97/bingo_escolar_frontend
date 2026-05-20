import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { useCursos } from "../hooks/useCursos";
import { deleteCurso, updateCurso } from "../api/cursoApi";

export default function Cursos() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useCursos();

  // estado local para los nombres
  const [names, setNames] = useState<Record<number, string>>({});

  const updateMutation = useMutation({
    mutationFn: updateCurso,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Nombre actualizado correctamente");
      queryClient.invalidateQueries({
        queryKey: ["cursos"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCurso,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async () => {
      toast.success("Curso eliminado correctamente");

      await queryClient.refetchQueries({
        queryKey: ["cursos"],
      });
    },
  });

  const handleUpdateCurso = (id: number) => {
    updateMutation.mutate({
      id,
      name: names[id],
    });
  };

  const handleDeleteCurso = (id: number) => {
    deleteMutation.mutate(id);
  };

  if (isLoading)
    return (
      <>
        <div className="min-h-screen">
          <h1 className="text-3xl text-white">Cargando...</h1>
        </div>
      </>
    );
  if (isError)
    return (
      <h3 className="mb-3 text-3xl font-bold text-zinc-200 capitalize">
        Error al cargar los cursos
      </h3>
    );
  if (!data) return null;
  if (data.length === 0) {
    return (
      <>
        <div className="min-h-screen">
          <h1 className="text-3xl text-white text-center">
            Aún no se han registrado cursos
          </h1>
        </div>
      </>
    );
  }

  return (
    <div className="mb-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {data.map((d) => {
        const currentName = names[d.id] ?? d.name;
        const isChanged = currentName.trim() !== d.name.trim();

        return (
          <div
            key={d.id}
            className="rounded-3xl border border-zinc-800 bg-slate-900 p-6"
          >
            <input
              className="mb-3 w-full bg-slate-700/90 text-3xl font-bold capitalize text-zinc-200 outline-none"
              value={currentName}
              onChange={(e) => {
                setNames((prev) => ({
                  ...prev,
                  [d.id]: e.target.value,
                }));
              }}
            />

            <div className="flex">
              <button
                className="w-full rounded-2xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
                onClick={() => handleDeleteCurso(d.id)}
              >
                Eliminar
              </button>

              <button
                className="w-full rounded-2xl bg-cyan-500/10 px-4 py-3 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => handleUpdateCurso(d.id)}
                disabled={!isChanged || updateMutation.isPending}
              >
                Modificar
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
