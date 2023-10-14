import { useState } from "react";
import { IconMenu2 } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useUser } from "@/context/user-context";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Search } from "../ui/search";
import { UserInfo } from "./user-menu";
import { MenuList } from "./menu-list";
import { ModalSignOut } from "../modal/modal-signout";
import { DialogClose } from "@radix-ui/react-dialog";

export function UserMenuMobile() {
  const [openSheet, setOpenSheet] = useState(false);
  const { user } = useUser();

  return (
    <ModalSignOut>
      {({ openModal }) => (
        <Sheet open={openSheet} onOpenChange={setOpenSheet}>
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="bg-transparent rounded-md hover:bg-gray/10 w-9 h-9"
            >
              <IconMenu2 size={22} stroke={1.5} className="text-black" />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="max-w-xs w-full px-0 py-8"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <div className="mt-6 font-inter">
              <div className="px-5">
                <Search onSearchSubmit={() => setOpenSheet(false)} />
              </div>
              <div className="w-full mt-6">
                {user ? (
                  <div className="flex flex-col space-y-4">
                    <UserInfo user={user} />
                    <DialogClose className="w-full h-fit">
                      <div className="w-full h-fit">
                        <MenuList onSignOutMenuClick={openModal} />
                      </div>
                    </DialogClose>
                  </div>
                ) : (
                  <div className="px-5">
                    <h2 className="uppercase text-center text-xs font-semibold text-black/40">
                      Bergabung
                    </h2>
                    <div className="w-full flex flex-col space-y-4 mt-6">
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
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </ModalSignOut>
  );
}
