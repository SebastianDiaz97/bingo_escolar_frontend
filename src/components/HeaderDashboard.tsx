import { useLocation } from "react-router-dom";
import { getKey } from "../config/menus";
import Modal from "./Modal";
import { useState } from "react";
import CreateBingoForm from "./CreateBingoForm";
import CreateCourseForm from "./CreateCourseForm";
import CreateMovement from "./CreateMovement";

type Props = {
  role: string;
  validateBingo: number | undefined
};
export default function HeaderDashboard({ role, validateBingo}: Props) {
  const location = useLocation();
  const currentTitle = getKey(location.pathname);

  const [modal, setModal] = useState<string | null>(null);

  return (
    <div>
      {/* Header */}
      <header className=" fixed top-0 right-0 left-0 lg:left-72 z-40 border-b border-slate-800 bg-slate-900/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h2 className="text-2xl font-bold">{currentTitle}</h2>

            {currentTitle === "Inicio" && (
              <p className="text-sm text-zinc-400">Bienvenido nuevamente 👋</p>
            )}
          </div>

          {role === "admin" && (currentTitle === "Bingos" || currentTitle === "Inicio") && (
            <button
              className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500"
              onClick={() => setModal("bingo")}
            >
              + Crear Bingo
            </button>
          )}
          {role === "admin" && currentTitle === "Cursos" && (
            <button
              className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500"
              onClick={() => setModal("curso")}
            >
              + Crear Curso
            </button>
          )}
          {role === "admin" && currentTitle === "Ingresos" && validateBingo && validateBingo > 0 && (
            <button
              className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500"
              onClick={() => setModal("income")}
            >
              + Crear Ingreso
            </button>
          )}
          {role === "admin" && currentTitle === "Gastos" && validateBingo && validateBingo > 0 && (
            <button
              className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500"
              onClick={() => setModal("expense")}
            >
              + Crear Gasto
            </button>
          )}
        </div>
      </header>
      <Modal open={modal !== null} onClose={() => setModal(null)}>
        {modal === "bingo" && (
          <CreateBingoForm onClose={() => setModal(null)} />
        )}
        {modal === "curso" && (
          <CreateCourseForm onClose={() => setModal(null)} />
        )}
        {(modal === "income" || modal === "expense") && (
          <CreateMovement type={modal} onClose={() => setModal(null)} />
        )}
      </Modal>
    </div>
  );
}
