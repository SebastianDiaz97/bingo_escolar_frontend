import { Link, Outlet, useParams } from "react-router-dom";
import { Toaster } from "sonner";

export default function AuthLayout() {
  const { bingoId } = useParams();

  return (
    <>
      <div className="bg-slate-800 min-h-screen">
        <div
          className={`${bingoId ? "w-full" : "max-w-md"}  mx-auto pt-10 px-5`}
        >
          <Link to="/">
            <img
              src="/logo2.png"
              className={`${bingoId ? "w-52 place-self-center" : "w-full block"} `}
              alt="Logotipo Bingo"
            />
          </Link>
          <div className="py-5">
            <Outlet />
          </div>
        </div>
      </div>

      <Toaster position="top-right" />
    </>
  );

}
