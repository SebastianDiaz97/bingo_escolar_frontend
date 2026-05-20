import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import LoadingButton from "./LoadingButton";
import { useUsersActive } from "../hooks/useUsers";
import { addUserToBingo } from "../api/bingoApi";

type Props = {
  bingoId: number;
  bingoName: string;
  onClose: () => void;
};
export default function AddUserForm({ bingoId, bingoName, onClose }: Props) {
  const queryClient = useQueryClient();
  const [role, setRole] = useState<string>("");
  const [search, setSearch] = useState("");
  const [enableBtn, setEnableBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data, isLoading } = useUsersActive(bingoId);

  const filteredUsers = useMemo(() => {
    if (!data) return [];
    return data.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, data]);

  const handleAddUser = async () => {
    try {
      if (!data) return [];
      const userId = data.find((u) => u.email === search)?.id ?? 0;
      await addUserToBingo(bingoId, userId, role);
      queryClient.invalidateQueries({
        queryKey: ["usersActive", bingoId],
      });
      queryClient.invalidateQueries({
        queryKey: ["usersBingo", bingoId],
      });
      toast.success("Usuario agregado correctamente");
      setSearch("");
      setLoading(false);
      onClose();
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.error);
      }
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <div className="">
          <h1 className="text-3xl text-white">Cargando...</h1>
        </div>
      </>
    );
  }
  if (!data) {
    return (
      <>
        <div className="bg-slate-900">
          <h1 className="text-3xl text-white">Error al cargar los datos</h1>
        </div>
      </>
    );
  }
  return (
    <div>
      <p className="text-3xl text-center mb-4 font-bold">
        Agregar usuario a <span className="capitalize">{bingoName}</span>
      </p>
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Buscar usuario por nombre o correo ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 w-full rounded bg-slate-800"
        />
        {search && (
          <div className="border border-slate-800 rounded mt-1 bg-slate-800 max-h-60 overflow-y-auto">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <button
                  key={user.id}
                  className="p-2 hover:bg-slate-500 cursor-pointer"
                  onClick={() => {
                    setSearch(user.email);
                    setEnableBtn(true);
                  }}
                >
                  <p>{user.name}</p>
                  <p className="text-sm text-white-500">{user.email}</p>
                </button>
              ))
            ) : (
              <p className="p-2 text-gray-500">No encontrado</p>
            )}
          </div>
        )}
        <div className="flex gap-10 mt-4 ">
          <label htmlFor="rol" className="text-2xl text-slate-500">
            Rol en el bingo
          </label>
          <select
            onChange={(e) => setRole(e.target.value)}
            id="rol"
            className="rounded-xl flex-1 bg-slate-800 px-3 py-2 outline-none"
          >
            <option value="admin">admin</option>
            <option value="organizador">organizador</option>
            <option value="viewer">viewer</option>
          </select>
        </div>
      </div>
      <LoadingButton
        loading={loading}
        disabled={!enableBtn}
        onClick={() => {
          handleAddUser();
          setLoading(true);
        }}
        className="bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 mt-5 w-full"
      >
        Agregar
      </LoadingButton>
    </div>
  );
}
