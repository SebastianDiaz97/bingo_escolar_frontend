import { useParams } from "react-router-dom";
import CategoryList from "../components/CategoryList";
import SummaryCard from "../components/SummaryCard";
import CourseProgress from "../components/CourseProgress";
import { useDashboard } from "../hooks/useDashboard";
import { useState } from "react";
import { toast } from "sonner";
import LoadingButton from "../components/LoadingButton";

export default function Dashboard() {
  const { bingoId } = useParams();
  const { data, isLoading, isError } = useDashboard(Number(bingoId));
  const [showAll, setShowAll] = useState(false);

  const dateToString = (date: Date) => {
    return new Date(date).toLocaleDateString("es-CL", {
      timeZone: "UTC",
    });
  };
  if (isLoading)
    return (
      <>
        <div className="min-h-screen">
          <h1 className="text-3xl text-white text-center">Cargando...</h1>
        </div>
      </>
    );
  if (isError)
    return (
      <>
        <div className="min-h-screen">
          <h1 className="text-3xl text-white text-center">
            Error al cargar la información
          </h1>
        </div>
      </>
    );
  if (Number(bingoId) === 0)
    return (
      <>
        <div className="min-h-screen">
          <h1 className="text-3xl text-white text-center">
            Seleccione un bingo valido
          </h1>
        </div>
      </>
    );
  if (!data) return null;

  const summary = data.data.summary;
  const incomeCategories = data.data.incomeByCategory;
  const expenseCategories = data.data.expenseByCategory;
  const courses = data.data.courses;

  const sortedCourses = courses.sort((a, b) => b.progress - a.progress);
  const visibleCourses = showAll ? sortedCourses : sortedCourses.slice(0, 5);

  const copyLink = `${window.location.origin}/dashboard/${bingoId}`;

  return (
    <div className="p-4 md:p-6 space-y-6 capitalize">
      {/* HEADER */}
      <div className="text-white flex items-center ">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{data?.name}</h1>
          <p className="text-gray-500">
            {dateToString(data.date)} - {data.description || "Sin descripción"}
          </p>
        </div>
        <LoadingButton
          onClick={async () => {
            await navigator.clipboard.writeText(copyLink);
            toast.success("Link copiado");
          }}
          className="bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 mt-5 ml-auto w-auto "
        >
          Compartir Link
        </LoadingButton>
      </div>

      {/* SUMMARY */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <SummaryCard
          title="Ingresos"
          color="green"
          value={summary.totalIncome}
        />
        <SummaryCard title="Gastos" color="red" value={summary.totalExpense} />
        <SummaryCard title="Balance" color="blue" value={summary.balance} />
        <SummaryCard
          title="Pendientes"
          color="yellow"
          value={summary.pendingExpenses}
        />
      </section>

      {/* CATEGORIES */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryList title="Ingresos por categoría" data={incomeCategories} />

        <CategoryList title="Gastos por categoría" data={expenseCategories} />
      </section>

      {/* COURSES */}
      <section className="text-white bg-slate-700 rounded-2xl shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Cursos</h2>

        {courses.length === 0 ? (
          <h4>Aún no hay cursos registrados</h4>
        ) : (
          <div className="space-y-4">
            {visibleCourses
              .sort((a, b) => b.progress - a.progress)
              .map((course) => (
                <CourseProgress key={course.courseId} course={course} />
              ))}

            {courses.length > 5 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="mt-4 w-full rounded-xl bg-slate-600 px-4 py-2 text-sm font-medium transition hover:bg-slate-500"
              >
                {showAll ? "Mostrar menos" : "Mostrar más"}
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
