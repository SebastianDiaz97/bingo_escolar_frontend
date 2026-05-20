import { useState } from "react";

import { isAxiosError } from "axios";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import type { User } from "../types";
import Modal from "./Modal";
import AddUserForm from "./AddUserForm";
import LoadingButton from "./LoadingButton";
import { useUsersBingo } from "../hooks/useBingos";
import { changeRoleUserBingo, deleteRoleUserBingo } from "../api/bingoApi";

type Props = {
  bingoId: number;
  createdBy: string | undefined;
  bingoName: string;
};
export default function UsersTable({ bingoId, bingoName, createdBy }: Props) {
  const [modal, setModal] = useState(false);

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(["user"]);
  const { data, isLoading } = useUsersBingo(bingoId);
  const [roleOverrides, setRoleOverrides] = useState<Record<number, string>>(
    {},
  );
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (id: number, role: string) => {
    setRoleOverrides((prev) => ({ ...prev, [id]: role }));
  };

  const handleSave = async (id: number) => {
    setLoading(true);
    try {
      const role = roleOverrides[id] ?? data?.find((u) => u.id === id)?.role;
      await changeRoleUserBingo(bingoId, id, role);
      queryClient.invalidateQueries({
        queryKey: ["usersBingo", bingoId],
      });
      queryClient.invalidateQueries({
        queryKey: ["bingos"],
      });
      toast.success("Cambio realizado correctamente");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (isAxiosError(error)) {
        toast.error(error.response?.data.error);
      }
    }
  };
  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await deleteRoleUserBingo(bingoId, id + 100);
      queryClient.invalidateQueries({
        queryKey: ["usersBingo", bingoId],
      });
      queryClient.invalidateQueries({
        queryKey: ["bingos"],
      });
      toast.success("Cambio realizado correctamente");
      setLoading(false);
    } catch (error) {
      // setLoading(false)
      if (isAxiosError(error)) {
        toast.error(error.response?.data.error);
      }
    }
  };

  if (isLoading)
    return (
      <>
        <div>
          <h1 className="text-3xl text-white">Cargando...</h1>
        </div>
      </>
    );
  if (!data) return null;
  return (
    <div className="">
      <div className=" w-full overflow-x-auto rounded-3xl">
        <table className="min-w-[900px] w-full text-left text-white">
          <thead className="bg-slate-900">
            <tr>
              <th className="px-6 py-4">Nombre</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Rol</th>
              <th className="px-6 py-4">Acción</th>
            </tr>
          </thead>
          <tbody>
            {data.filter((u) => u.id !== user?.id && u.id !== Number(createdBy))
              .length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-8 lg:text-center text-slate-400"
                >
                  No hay usuarios asignados aún
                </td>
              </tr>
            )}
            {data
              .filter((u) => u.id !== user?.id && u.id !== Number(createdBy))
              .map((user) => {
                const currentRole = roleOverrides[user.id] ?? user.role;
                return (
                  <tr
                    key={user.id}
                    className="border-t border-slate-800 bg-slate-950"
                  >
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <select
                        value={currentRole}
                        onChange={(e) =>
                          handleRoleChange(user.id, e.target.value)
                        }
                        className="rounded-xl bg-slate-800 px-3 py-2 outline-none"
                      >
                        <option value="admin">admin</option>
                        <option value="organizador">organizador</option>
                        <option value="viewer">viewer</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 flex gap-3">
                      <LoadingButton
                        loading={loading}
                        disabled={false}
                        type="button"
                        onClick={() => handleSave(user.id)}
                        className="bg-cyan-500/10 px-4 py-2 text-cyan-300 hover:bg-cyan-500/20"
                      >
                        Guardar
                      </LoadingButton>
                      <LoadingButton
                        loading={loading}
                        disabled={false}
                        type="button"
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500/10 px-4 py-2 text-red-300 hover:bg-red-500/20"
                      >
                        Eliminar
                      </LoadingButton>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <button
        // onClick={() => handleSave(user.id)}
        className="rounded-xl w-full bg-cyan-500/10 px-4 py-2 text-cyan-300 transition hover:bg-cyan-500/20 mt-4"
        onClick={() => setModal(true)}
      >
        Agregar usuario
      </button>
      <Modal open={modal} onClose={() => setModal(false)}>
        <AddUserForm
          bingoId={bingoId}
          bingoName={bingoName}
          onClose={() => setModal(false)}
        />
      </Modal>
    </div>
  );
}
