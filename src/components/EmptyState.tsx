import { useState } from "react";
import Modal from "./Modal";
import CreateBingoForm from "./CreateBingoForm";
import { useNavigate } from "react-router-dom";

export default function EmptyState({ role }: { role: string }) {
  const [modal, setModal] = useState<string | null>(null);
  const navigate = useNavigate();


  return (
    <div>
      <section
        className={`mb-10 rounded-3xl border border-zinc-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl`}
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
              {role === "admin" ? "Modo administrador" : "Modo usuario"}
            </span>

            <h2 className="mb-4 text-4xl font-bold leading-tight">
              Aún no tienes bingos activos
            </h2>

            <p className="text-zinc-400">
              Cuando crees o te asignen un bingo podrás visualizar ingresos,
              egresos, metas por curso y estadísticas financieras en tiempo
              real.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {role === "admin" ? (
              <>
                <button
                  className="rounded-2xl bg-blue-600 px-6 py-4 font-semibold transition hover:bg-blue-500"
                  onClick={() => setModal("bingo")}
                >
                  Crear mi primer bingo
                </button>

                <button onClick={()=> navigate('cursos')} className="rounded-2xl border border-zinc-700 bg-slate-900 px-6 py-4 font-semibold text-zinc-300 transition hover:border-zinc-600 hover:bg-slate-800">
                  Ver cursos
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-zinc-800 bg-slate-900 p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl">
            🎯
          </div>

          <h3 className="mb-2 text-xl font-semibold">Metas por curso</h3>

          <p className="text-sm leading-relaxed text-zinc-400">
            Define objetivos y monitorea el progreso financiero por curso.
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-slate-900 p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-2xl">
            📈
          </div>

          <h3 className="mb-2 text-xl font-semibold">Dashboard financiero</h3>

          <p className="text-sm leading-relaxed text-zinc-400">
            Analiza balances, ingresos, egresos y estadísticas automáticamente.
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-slate-900 p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-2xl">
            👥
          </div>

          <h3 className="mb-2 text-xl font-semibold">Gestión de usuarios</h3>

          <p className="text-sm leading-relaxed text-zinc-400">
            Administra permisos y colaboradores dentro de cada bingo.
          </p>
        </div>
      </section>

      {/* Empty state */}
      <section className="mt-10 rounded-3xl border border-dashed border-zinc-700 bg-slate-900/40 p-12 text-center">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-slate-800 text-4xl">
          🎟️
        </div>

        <h3 className="mb-3 text-2xl font-bold">No hay actividad todavía</h3>

        <p className="mx-auto mb-6 max-w-xl text-zinc-400">
          Cuando comiences a usar el sistema aparecerán aquí ingresos, egresos y
          estadísticas del bingo.
        </p>

        {role === "admin" && (
          <button className="rounded-2xl bg-blue-600 px-6 py-4 font-semibold transition hover:bg-blue-500">
            Crear Bingo
          </button>
        )}
      </section>

      <Modal open={modal !== null} onClose={() => setModal(null)}>
        {modal === "bingo" && (
          <CreateBingoForm onClose={() => setModal(null)} />
        )}
      </Modal>
    </div>
  );
}
