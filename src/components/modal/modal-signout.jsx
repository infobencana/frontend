import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { logout } from "@/utils/auth";

export function ModalSignOut({ children }) {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children({ open, openModal, closeModal })}
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
