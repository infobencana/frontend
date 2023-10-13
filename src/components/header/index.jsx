import { Link } from "react-router-dom";
import { useUser } from "@/context/user-context";
import { cn } from "@/utils/cn";
import { UserMenuNavbar } from "../user/user-menu-navbar";
import { Button } from "../ui/button";
import Logo from "@/assets/images/infobencana.svg";

export function Header() {
  const { user } = useUser();

  return (
    <header className="fixed top-0 w-full h-[80px] px-5 bg-white border-b border-b-snow">
      <div
        className={cn(
          "flex items-center",
          "max-w-[1320px] 2xl:max-w-[1400px] w-full h-full mx-auto",
        )}
      >
        <Link to="/" className="w-fit h-fit">
          <img
            src={Logo}
            alt="infobencana logo"
            className="w-52"
            draggable="false"
          />
        </Link>
        <div className="ml-auto">
          {user && !user.error ? (
            <UserMenuNavbar />
          ) : (
            <div className="flex w-fit h-full items-center justify-between space-x-4">
              <Button size="lg" className="rounded-3xl px-8" asChild>
                <Link to="/auth/login">Masuk</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-3xl px-8"
                asChild
              >
                <Link to="/auth/register">Daftar</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
