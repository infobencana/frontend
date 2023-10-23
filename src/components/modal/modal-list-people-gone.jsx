import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "../badge/badge";
import { MissingPersonCard } from "../card/missing-person-card";

export function ModalListPeopleGone({ peopleGone, children }) {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children({ open, openModal, closeModal })}
      <DialogContent className="max-w-[1135px] w-full h-auto">
        <div className="w-full flex justify-between items-center">
          <div>
            <h1 className="text-base font-bold text-black uppercase">
              Daftar Orang Hilang
            </h1>
            <Badge className=" text-black text-xs font-bold bg-snow rounded-sm mt-1 py-0 px-1.5 hover:bg-snow">
              Total: {peopleGone?.length}
            </Badge>
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] auto-rows-auto gap-5 mt-8 overflow-y-auto">
          {peopleGone?.map((person) => (
            <MissingPersonCard
              key={person._id}
              requestChanging
              personData={person}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
