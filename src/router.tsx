import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import AuthLayout from "./layout/AuthLayout";
import Dashboard from "./views/Dashboard";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import Cursos from "./views/Cursos";
import Bingos from "./views/Bingos";
import Users from "./views/Users";
import Ingresos from "./views/Ingresos";
import Gastos from "./views/Gastos";
import DashboardViewAll from "./views/DashboardViewAll";
import NotFoundView from "./views/NotFoundView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/dashboard/:bingoId" element={<DashboardViewAll />} />
        </Route>

        <Route path="/admin" element={<AppLayout />}>
          <Route path="bingos" element={<Bingos />} />
          <Route path="cursos" element={<Cursos />} />
        </Route>
        <Route path="/admin/:bingoId?" element={<AppLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cursos" element={<Cursos />} />
          <Route path="usuarios" element={<Users />} />
          <Route path="ingresos" element={<Ingresos />} />
          <Route path="gastos" element={<Gastos />} />
        </Route>

        <Route path="/404" element={<AuthLayout />}>
          <Route element={<NotFoundView />} index={true} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
