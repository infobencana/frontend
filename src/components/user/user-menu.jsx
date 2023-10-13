import { useUser } from "@/context/user-context";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { UserAvatar } from "./user-avatar";
import { UserMenuList } from "./user-menu-list";
import { logout } from "@/utils/auth";

export function UserMenu() {
  const { user } = useUser();

  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <TooltipTrigger>
            <UserAvatar
              src={user.photo_profile}
              alt={user.full_name}
              fallback={user.email}
              className="ring-1 ring-snow ring-offset-2 ring-offset-white"
            />
          </TooltipTrigger>
          <TooltipContent
            align="end"
            sideOffset={10}
            collisionPadding={50}
            className="w-64 px-0 py-2 space-y-2"
          >
            <UserInfo user={user} />
            <UserMenuList />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="w-72 sm:w-full sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Keluar</DialogTitle>
          <DialogDescription>
            Apakah anda yakin ingin keluar dan mengakhiri semua sesi ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button size="sm" className="rounded-md mt-4" onClick={logout}>
            Keluar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function UserInfo({ user }) {
  return (
    <div className="w-full px-5">
      <div className="w-full flex items-center space-x-3 py-5 border-b border-b-snow">
        <UserAvatar
          src={user.photo_profile}
          alt={user.full_name}
          fallback={user.email}
          fallBackSize={40}
          className="w-10 h-10 ring-1 ring-snow ring-offset-2 ring-offset-white"
        />
        <div className="w-full font-inter overflow-hidden">
          <h2 className="line-clamp-1 text-sm text-black font-semibold">
            {user.full_name}
          </h2>
          <p className="line-clamp-1 text-gray text-[11px] font-light">
            {user.email}
          </p>
        </div>
      </div>
    </div>
  );
}
