import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import Modal from "../components/Modal";
import { useState } from "react";
import EditBingoForm from "../components/EditBingoForm";
import type { User, Bingo } from "../types";
import UsersTable from "../components/UsersTable";
import LoadingButton from "../components/LoadingButton";
import { useBingos } from "../hooks/useBingos";
import { changeStatusBingo } from "../api/bingoApi";

export default function Bingos() {
  const [modal, setModal] = useState<Bingo | null | number>(null);
  const [name, setName] = useState<string>("null");
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState<string>();

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(["user"]);
  const { data, isLoading } = useBingos();
  if (isLoading)
    return (
      <>
        <div className="min-h-screen">
          <h1 className="text-3xl text-white">Cargando...</h1>
        </div>
      </>
    );
  const dateToString = (date: Date) => {
    return new Date(date).toLocaleDateString("es-CL", {
      timeZone: "UTC",
    });
  };

  const handleChangeStatus = async (id: number) => {
    setLoading(true);
    try {
      await changeStatusBingo(id);
      toast.success("Bingo modificado correctamente");
      queryClient.invalidateQueries({
        queryKey: ["bingos"],
      });
      setLoading(false);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.error);
      }
      setLoading(false);
    }
  };

  if (data?.length === 0) {
    return (
      <>
        <div className="min-h-screen">
          <h1 className="text-3xl text-white text-center">
            Aún no se han registrado bingos
          </h1>
        </div>
      </>
    );
  }

  return (
    <div className="mb-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {data &&
        data
          .filter((b) => Number(b.createdBy) === user?.id)
          .map((bingo) => (
            <div
              className="rounded-3xl border border-zinc-800 bg-slate-900 p-6"
              key={bingo.id}
            >
              <p className="mb-5 min-h-[72px] line-clamp-2 w-full text-3xl font-bold capitalize text-zinc-200 outline-none">
                {bingo.name}
              </p>
              <p className="mb-1 min-h-[72px] line-clamp-2 w-full text-lg capitalize text-zinc-200 outline-none">
                {bingo.description}
              </p>
              <p className="mb-3 w-full text-lg font-bold capitalize text-zinc-500 outline-none">
                Fecha
              </p>
              <p className="mb-5 w-full text-3xl font-bold capitalize text-zinc-200 outline-none">
                {dateToString(bingo.date)}
              </p>
              <p className="mb-2 w-full text-lg font-bold capitalize text-zinc-500 outline-none">
                Meta por curso
              </p>
              <p className="mb-3 w-full text-3xl font-bold capitalize text-zinc-200 outline-none">
                {bingo.coursesGoal}
              </p>

              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <LoadingButton
                    loading={loading}
                    type="button"
                    onClick={() => handleChangeStatus(bingo.id)}
                    className={`w-full rounded-2xl ${bingo.state ? "bg-red-500/10 text-red-300 hover:bg-red-500/20" : "bg-blue-500/10 text-blue-300 hover:bg-blue-500/20"} px-4 py-3 text-sm font-medium transition capitalize `}
                  >
                    {bingo.state ? "Cerrar Bingo" : "Activar Bingo"}
                  </LoadingButton>
                  <button
                    className="w-full rounded-2xl bg-cyan-500/10 px-4 py-3 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20"
                    onClick={() => {
                      setModal(bingo);
                    }}
                  >
                    Modificar
                  </button>
                </div>
                <button
                  className="w-full rounded-2xl bg-cyan-500/10 px-4 py-3 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20 "
                  onClick={() => {
                    setModal(bingo.id);
                    setName(bingo.name);
                    setCreated(bingo.createdBy);
                  }}
                >
                  Usuarios asignados
                </button>
              </div>
            </div>
          ))}

      <Modal open={modal !== null} onClose={() => setModal(null)}>
        {modal !== null && typeof modal === "object" && (
          <EditBingoForm onClose={() => setModal(null)} bingoData={modal} />
        )}
        {modal !== null && typeof modal === "number" && (
          <UsersTable bingoId={modal} bingoName={name} createdBy={created} />
        )}
      </Modal>
    </div>
  );
}
