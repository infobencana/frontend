import { Link } from "react-router-dom";
import { useUser } from "@/context/user-context";
import { cn } from "@/utils/cn";
import { UserMenu } from "../user/user-menu";
import { Button } from "../ui/button";
import { Search } from "../ui/search";
import { Sidebar } from "../sidebar";
import Logo from "@/assets/images/infobencana.svg";

export function Header() {
  const { user } = useUser();

  return (
    <header className="fixed top-0 w-full h-20 sm:h-24 px-5 bg-white border-b border-b-snow">
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
            className="w-44 sm:w-52"
            draggable="false"
          />
        </Link>
        <div className="ml-auto">
          {/* <Sidebar /> */}
          <div className="flex items-center w-fit h-full space-x-8">
            <Search />
            {user && !user.error ? (
              <UserMenu />
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
      </div>
    </header>
  );
}
