import { Link } from "react-router-dom";
import { IconPlus } from "@tabler/icons-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useUser } from "@/context/user-context";
import { cn } from "@/utils/cn";
import { UserMenu } from "../user/user-menu";
import { UserMenuMobile } from "../user/user-menu-mobile";
import { Button } from "../ui/button";
import { Search } from "../ui/search";
import Logo from "@/assets/images/infobencana.svg";

export function Header() {
  const { user, loading, error } = useUser();
  const matches = useMediaQuery("(min-width:1024px)");
  const isAdmin = user?.role === "admin";

  return (
    <header className="fixed top-0 w-full h-[75px] lg:h-[86px] px-4 sm:px-5 bg-white border-b border-b-snow z-[9999]">
      <div
        className={cn(
          "flex items-center",
          "max-w-[1320px] 2xl:max-w-[1400px] w-full h-full mx-auto",
        )}
      >
        <Link to="" className="w-fit h-fit">
          <img
            src={Logo}
            alt="infobencana logo"
            className="w-[188px] sm:w-52"
            draggable="false"
          />
        </Link>
        <div className="ml-auto">
          {matches ? (
            <div className="flex items-center w-fit h-full space-x-8">
              {isAdmin ? (
                <Button
                  size="lg"
                  variant="outline"
                  className="pl-10 pr-5 h-[50px] rounded-full"
                  asChild
                >
                  <div className="relative w-fit">
                    <IconPlus
                      size={20}
                      className="absolute text-green left-3"
                    />
                    <Link to="/r/admin/create-post">Buat Laporan</Link>
                  </div>
                </Button>
              ) : (
                <Search />
              )}
              {!loading && user ? <UserMenu /> : false}
              {!loading && (!user || error) ? (
                <div className="flex w-fit h-full items-center justify-between space-x-3">
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
              ) : (
                false
              )}
            </div>
          ) : (
            <UserMenuMobile />
          )}
        </div>
      </div>
    </header>
  );
}
