import { useParams } from "react-router-dom";
import Modal from "../components/Modal";
import { useState } from "react";
import type { Income } from "../types";
import EditMovements from "../components/EditMovements";
import DeleteMovements from "../components/DeleteMovements";
import { useIncomes } from "../hooks/useIncome";
import { formatCLP } from "../utils";

export default function Ingresos() {
  const { bingoId } = useParams();
  const { data: incomes, isLoading, isError } = useIncomes(Number(bingoId));
  const [modal, setModal] = useState<null | {
    type: "edit" | "delete";
    movement: Income;
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
  if (isError || !incomes) {
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

  if (incomes.length === 0) {
    return (
      <>
        <div className="min-h-screen">
          <h1 className="text-3xl text-white text-center">
            Aun no se han registrado ingresos
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
      {incomes.map((income) => (
        <div
          className="rounded-3xl border border-zinc-800 bg-slate-900 p-6"
          key={income.id}
        >
          <p className="mb-5 min-h-[72px] line-clamp-2 w-full text-3xl font-bold text-center capitalize text-zinc-200 outline-none">
            {income.description}
            {income.courseName ? ` - ${income.courseName}` : ""}
          </p>
          <p className=" w-full text-lg font-bold capitalize text-zinc-500 outline-none">
            Categoría
          </p>
          <p className="mb-3 line-clamp-2 w-full text-3xl font-bold capitalize text-zinc-200 outline-none">
            {income.category}
          </p>
          <p className="w-full text-lg font-bold capitalize text-zinc-500 outline-none">
            Fecha
          </p>
          <p className="mb-3 w-full text-3xl font-bold capitalize text-zinc-200 outline-none">
            {dateToString(income.date)}
          </p>
          <p className="mb-2 w-full text-lg font-bold capitalize text-zinc-500 outline-none">
            Monto
          </p>
          <p className="mb-3 w-full text-3xl font-bold capitalize text-zinc-200 outline-none">
            {formatCLP(income.amount)}
          </p>
          <p className="mb-2 w-full text-lg font-bold capitalize text-zinc-500 outline-none">
            Método de pago
          </p>
          <p className="mb-9 w-full text-3xl font-bold capitalize text-zinc-200 outline-none">
            {income.paymentMethod}
          </p>

          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <button
                className={`w-full rounded-2xl px-4 py-3 text-sm font-medium transition bg-red-500/10 text-red-300 hover:bg-red-500/20`}
                onClick={() => {
                  setModal({
                    type: "delete",
                    movement: income,
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
                    movement: income,
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
        {modal?.type === "edit" && (
          <EditMovements
            income={modal.movement}
            onClose={() => setModal(null)}
          />
        )}
        {modal?.type === "delete" && (
          <DeleteMovements
            income={modal.movement}
            onClose={() => setModal(null)}
          />
        )}
      </Modal>
    </div>
  );
}
