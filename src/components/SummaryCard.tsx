import { formatCLP } from "../utils";

const colors = {
  green: "bg-green-100 text-green-700",
  red: "bg-red-100 text-red-700",
  blue: "bg-blue-100 text-blue-700",
  yellow: "bg-yellow-100 text-yellow-700",
};

type Props = {
  title: string;
  value: number;
  color: "blue" | "green" | "red" | "yellow";
};

export default function SummaryCard({ title, value, color }: Props) {
  return (
    <div className={`rounded-2xl p-5 shadow ${colors[color]}`}>
      <p className="text-sm opacity-80">{title}</p>

      <h3 className="text-2xl font-bold mt-2">{formatCLP(value || 0)}</h3>
    </div>
  );
}
