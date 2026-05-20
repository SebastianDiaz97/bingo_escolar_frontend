import {
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Toaster } from "sonner";
import EmptyState from "../components/EmptyState";
import HeaderDashboard from "../components/HeaderDashboard";
import SideBar from "../components/SideBar";
import { getKey } from "../config/menus";
import { useEffect } from "react";
import { useUser } from "../hooks/useUsers";
import { useBingos } from "../hooks/useBingos";

export default function AppLayout() {
  const { data: dataUser, isLoading, isError } = useUser();
  const {
    data: bingos,
    isLoading: loadingBingos,
    isError: errorBingos,
  } = useBingos();

  const navigate = useNavigate();
  const location = useLocation();
  const currentTitle = getKey(location.pathname);
  const { bingoId } = useParams();

  const firstBingo = bingos?.find((b) => b.state)?.id ?? null;
  useEffect(() => {
    if (firstBingo && currentTitle === "Inicio") {
      navigate(`/admin/${firstBingo}/dashboard`);
    }
  }, [firstBingo, currentTitle, navigate]);

  if (isLoading && loadingBingos)
    return (
      <>
        <div className="bg-slate-900 min-h-screen">
          <h1 className="text-3xl text-white text-center">Cargando...</h1>
        </div>
      </>
    );
  if (isError) return <Navigate to="/auth/login" />;
  if (errorBingos)
    return (
      <>
        <div className="bg-slate-900 min-h-screen">
          <h1 className="text-3xl text-white">Error</h1>
        </div>
      </>
    );

  const validateBingo = bingos?.filter((b) => b.id === Number(bingoId)).length;
  if (dataUser && bingos)
    return (
      <>
        <div className="bg-slate-900 min-h-screen">
          <div className="flex min-h-screen bg-zinc-950 text-white">
            <SideBar validateBingo={validateBingo}/>
            <div className="flex-1 bg-slate-800/60 lg:ml-72 min-w-0">
              <HeaderDashboard
                role={dataUser.role}
                validateBingo={validateBingo}
              />
              <main className="mx-auto max-w-7xl px-6 py-10 pt-28 ">
                {dataUser.totalBingo === 0 && currentTitle === "Inicio" && (
                  <EmptyState role={dataUser.role} />
                )}
                <Outlet />
              </main>
            </div>
          </div>
        </div>
        <Toaster position="top-right" />
      </>
    );
}
