import { Link, Navigate, useLocation, Outlet } from "react-router-dom";
import { useUser } from "@/context/user-context";
import { cn } from "@/utils/cn";
import Logo from "@/assets/images/circle-logo-outlined.webp";
import AuthImg from "@/assets/images/auth-img.webp";

export default function AuthLayout() {
  const { pathname } = useLocation();
  const authType = pathname.replace("/auth/", "");

  const authText = {
    register: {
      instruction: "Silahkan isi kolom dibawah untuk mendaftarkan akun anda",
      navText: "Masuk",
      navLink: "/auth/login",
    },
    login: {
      instruction: "Masukan akun anda terlebih dahulu sebelum melanjutkan ",
      navText: "Daftar",
      navLink: "/auth/register",
    },
  };

  if (useUser().user) return <Navigate to="/" replace />;

  return (
    <div
      className={cn(
        "flex items-center justify-between",
        "max-w-[1600px] w-full h-auto font-inter mx-auto",
        "lg:min-h-[650px] lg:h-full 2xl:max-w-full",
      )}
    >
      <div
        className={cn(
          "flex flex-col justify-center items-center",
          "w-full h-full px-6 py-10 lg:px-4 lg:max-w-[550px] 2xl:max-w-[50%]",
        )}
      >
        <div className="mx-auto max-w-[400px] w-full 2xl:max-w-2xl">
          <img
            src={Logo}
            alt="logo info bencana"
            className="w-16 h-16 mx-auto"
          />
          <div className="text-center mt-5 w-full mx-auto sm:w-full">
            <h1 className="text-black font-semibold text-xl xl:text-2xl">
              Selamat Datang
            </h1>
            <p className="text-gray text-sm font-medium mt-2">
              {authText[authType].instruction}
            </p>
          </div>
          <div className="mt-16">
            <Outlet />
          </div>
          <div className="flex w-fit mx-auto text-sm text-center space-x-1 mt-9">
            <p className="text-gray font-medium ">
              {authType === "register" ? "Sudah " : "Belum "} memiliki akun?
            </p>
            <Link
              to={authText[authType].navLink}
              className="font-semibold text-green"
            >
              {authText[authType].navText}
            </Link>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "items-center justify-start overflow-hidden",
          "hidden w-full min-w-[420px]",
          "lg:flex lg:h-full max-h-[1000px]",
          "lg:max-w-[760px] xl:max-w-full 2xl-max-w-[50%] 2xl:max-h-full",
        )}
      >
        <img
          src={AuthImg}
          alt="disaster image"
          className="w-full h-full lg:object-cover"
          // draggable="false"
          loading="lazy"
        />
      </div>
    </div>
  );
}
