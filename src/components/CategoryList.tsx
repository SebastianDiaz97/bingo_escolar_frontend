import type { DataCategoryDashboard } from "../types";

type Props = {
  title: string;
  data: DataCategoryDashboard[];
};

export default function CategoryList({ title, data }: Props) {
  const filtered = data.filter((item) => item.total > 0);
  return (
    <div className="text-white bg-slate-700 rounded-2xl shadow p-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      {filtered.length === 0 ? (
        <p>Sin movimientos todavía</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <div
              key={item.category}
              className="flex justify-between items-center border-b pb-2"
            >
              <span className="capitalize">{item.category}</span>

              <span className="font-semibold">{item.total}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
