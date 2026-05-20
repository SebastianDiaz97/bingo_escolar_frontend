import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { getDashboard } from "../api/dashboardApi";
import Dashboard from "./Dashboard";

export default function DashboardViewAll() {
  const { bingoId } = useParams();

  const { data, error, isLoading } = useQuery({
    queryFn: () => getDashboard(Number(bingoId)),
    queryKey: ["dashboard", bingoId],
    retry: 2,
  });

  if (isLoading)
    return (
      <p className="font-bold text-2xl text-center text-white uppercase">
        cargando...
      </p>
    );
  if (error) return <Navigate to={"/404"} />;

  if (data) return <Dashboard />;
}
