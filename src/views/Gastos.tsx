import { useParams } from "react-router-dom";
import Modal from "../components/Modal";
import EditMovements from "../components/EditMovements";
import type { Expense } from "../types";
import { useState } from "react";
import DeleteMovements from "../components/DeleteMovements";
import { useExpenses } from "../hooks/useExpense";
import { formatCLP } from "../utils";

export default function Gastos() {
  const { bingoId } = useParams();
  const { data: expenses, isLoading, isError } = useExpenses(Number(bingoId));
  const [modal, setModal] = useState<null | {
    type: "edit" | "delete";
    movement: Expense;
  }>(null);

  if (isLoading) {
    return (
      <>
        <div className=" min-h-screen">
          <h1 className="text-3xl text-white text-center">Cargando...</h1>
        </div>
      </>
    );
  }

  if (isError || !expenses) {
    return (
      <>
        <div className="min-h-screen">
          <h1 className="text-3xl text-white text-center">
            Error al cargar los datos
          </h1>
        </div>
      </>
    );
  }
  if (expenses.length === 0) {
    return (
      <>
        <div className="min-h-screen">
          <h1 className="text-3xl text-white text-center">
            Aun no se han registrado gastos
          </h1>
        </div>
      </>
    );
  }

  const dateToString = (date: Date) => {
    return new Date(date).toLocaleDateString("es-CL", {
      timeZone: "UTC",
    });
  };
  return (
    <div className="mb-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {expenses.map((expense) => (
        <div
          className="rounded-3xl border border-zinc-800 bg-slate-900 p-6"
          key={expense.id}
        >
          <p className="mb-5 min-h-[72px] line-clamp-2 w-full text-3xl font-bold text-center capitalize text-zinc-200 outline-none">
            {expense.description}
          </p>
          <p className=" w-full text-lg font-bold capitalize text-zinc-500 outline-none">
            Categoría
          </p>
          <p className="mb-3 line-clamp-2 w-full text-3xl font-bold capitalize text-zinc-200 outline-none">
            {expense.category}
          </p>
          <p className="w-full text-lg font-bold capitalize text-zinc-500 outline-none">
            Fecha
          </p>
          <p className="mb-3 w-full text-3xl font-bold capitalize text-zinc-200 outline-none">
            {dateToString(expense.date)}
          </p>
          <p className="mb-2 w-full text-lg font-bold capitalize text-zinc-500 outline-none">
            Monto
          </p>
          <p className="mb-3 w-full text-3xl font-bold capitalize text-zinc-200 outline-none">
            {formatCLP(expense.amount)}
          </p>
          <p className="mb-2 w-full text-lg font-bold capitalize text-zinc-500 outline-none">
            Estado
          </p>
          <p className="mb-3 w-full text-3xl font-bold capitalize text-zinc-200 outline-none">
            {expense.state}
          </p>

          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <button
                className={`w-full rounded-2xl px-4 py-3 text-sm font-medium transition bg-red-500/10 text-red-300 hover:bg-red-500/20`}
                onClick={() => {
                  setModal({
                    type: "delete",
                    movement: expense,
                  });
                }}
              >
                Eliminar
              </button>
              <button
                className="w-full rounded-2xl bg-cyan-500/10 px-4 py-3 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20"
                onClick={() => {
                  setModal({
                    type: "edit",
                    movement: expense,
                  });
                }}
              >
                Modificar
              </button>
            </div>
          </div>
        </div>
      ))}

      <Modal open={modal !== null} onClose={() => setModal(null)}>
        {modal !== null && (
          <EditMovements
            expense={modal.movement}
            onClose={() => setModal(null)}
          />
        )}
        {modal?.type === "delete" && (
          <DeleteMovements
            expense={modal.movement}
            onClose={() => setModal(null)}
          />
        )}
      </Modal>
    </div>
  );
}
