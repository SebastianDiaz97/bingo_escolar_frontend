import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminMenu, getMenu } from "../config/menus";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "../hooks/useUsers";
import { useBingos } from "../hooks/useBingos";

type Props = {
  validateBingo: number | undefined;
};

export default function SideBar({ validateBingo }: Props) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: user } = useUser();
  const { data: bingos } = useBingos();
  const { bingoId } = useParams();
  const [selectedBingo, setSelectedBingo] = useState<number>(Number(bingoId));
  const [open, setOpen] = useState(false);

  if (!user) return null;
  if (!bingos) return null;

  const activeBingo = bingoId ? Number(bingoId) : selectedBingo;
  const role = bingos.find((b) => b.id === activeBingo)?.role || "viewer";
  const menu = getMenu(role);

  const logout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    localStorage.removeItem("Authorization");
    queryClient.clear();
    navigate("/auth/login");
  };

  const totalBingo = bingos.filter((b) => b.state).length;


  return (
    <>
      {/* BOTON MOBILE */}
      <button
        onClick={() => setOpen(true)}
        className="
          fixed top-20 left-4 z-50
          rounded-xl bg-slate-700 p-2
          text-white shadow-lg
          lg:hidden
        "
      >
        <img src="/menu.png" className="w-full block" alt="Logotipo Bingo" />
      </button>

      {/* OVERLAY */}
      {open && (
        <button
          onClick={() => setOpen(false)}
          className="
            fixed inset-0 z-40
            bg-black/50
            backdrop-blur-sm
            lg:hidden
          "
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-72
          border-r border-slate-800
          bg-slate-900 text-white
          transition-transform duration-300


          ${open ? "translate-x-0" : "-translate-x-full"}

          lg:translate-x-0
          flex
          flex-col
        `}
      >
        <div className="border-b border-slate-800 px-6 py-6">
          <h1 className="text-2xl font-bold">Bingo Panel</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Gestión financiera de bingos
          </p>
        </div>

        <div className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="mb-8 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4">
            <p className="text-xs uppercase tracking-wide text-blue-300">
              Sesión actual
            </p>

            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold">
                {user.name[0].toUpperCase()}
              </div>

              <div>
                <h3 className="font-semibold">{user.name}</h3>
              </div>
            </div>
          </div>

          {user.role === "admin" && (
            <div className="mb-6">
              <p className="mb-2 block text-xs uppercase tracking-wide text-zinc-500">
                Panel de Administacion
              </p>
              <nav className="space-y-2">
                {adminMenu.map((item) => (
                  <button
                    key={item.value}
                    className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                    onClick={() => {
                      navigate(`${item.value}`);
                      setOpen(false);
                    }}
                  >
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    {item.key}
                  </button>
                ))}
              </nav>
            </div>
          )}

          <div className="mb-6">
            <p className="mb-2 block text-xs uppercase tracking-wide text-zinc-500">
              Bingo activo
            </p>

            <div className="rounded-2xl border border-zinc-800 bg-slate-950 p-1 ">
              <select
                disabled={totalBingo === 0 ? true : false}
                value={bingoId}
                className="w-full rounded-xl bg-slate-950 px-4 py-3 text-sm text-white outline-none disabled:cursor-not-allowed"
                onChange={(e) => {
                  const id = Number(e.target.value);
                  setSelectedBingo(id);
                  navigate(`/admin/${id}/dashboard`);
                  setOpen(false);
                }}
              >
                {totalBingo === 0 && <option>No hay bingos aún</option>}
                <>
                  <option value="">Seleccionar</option>

                  {bingos
                    ?.filter((b) => b.state)
                    .map((bingo) => (
                      <option key={bingo.id} value={bingo.id}>
                        {bingo.name}
                      </option>
                    ))}
                </>
              </select>
            </div>
          </div>

          {validateBingo && totalBingo > 0 && selectedBingo > 0 ? (
            <nav className="space-y-2">
              {validateBingo > 0 &&
                menu.map((item) => (
                  <button
                    key={item.value}
                    className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                    onClick={() => {
                      navigate(`/admin/${activeBingo}/${item.value}`);
                      setOpen(false);
                    }}
                  >
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    {item.key}
                  </button>
                ))}
            </nav>
          ) : (
            ""
          )}
        </div>

        <div className="border-t border-zinc-800 p-4 mt-auto">
          <button
            className="w-full rounded-2xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
            onClick={logout}
          >
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}
