import { useState, useCallback } from "react";
import { IconSearch, IconX } from "@tabler/icons-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "../badge/badge";
import { MissingPersonCard } from "../card/missing-person-card";
import { Input } from "../ui/input";

export function ModalListPeopleGone({
  peopleGone,
  openRequestModal,
  children,
}) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const searchItem = useCallback(
    (items) => {
      return items?.filter((item) => {
        const name = item.name.toLowerCase();
        return name.indexOf(search) > -1;
      });
    },
    [search],
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children({ open, openModal, closeModal })}
      <DialogContent
        closeIcon={false}
        className="flex flex-col min-w-full h-full xl:min-w-fit xl:max-w-[1135px] xl:max-h-[600px] xl:h-auto px-8 py-6"
      >
        <IconX
          className="text-black cursor-pointer ml-auto w-4 h-4 flex-shrink-0"
          onClick={closeModal}
        />
        <div className="w-full flex flex-col space-y-8 xl:space-y-0 xl:flex-row xl:justify-between xl:items-center mt-2">
          <div>
            <h1 className="text-base font-bold text-black uppercase">
              Daftar Orang Hilang
            </h1>
            <Badge className=" text-black text-xs font-bold bg-snow rounded-sm mt-1 py-0 px-1 hover:bg-snow">
              TOTAL: {peopleGone?.length}
            </Badge>
          </div>
          <div className="w-full lg:max-w-[290px] relative h-fit">
            <Input
              name="search"
              type="text"
              placeholder="Cari disini..."
              className="w-full h-10 pl-10 pr-6 rounded-xl font-inter bg-[#F9FAFB]"
              onChange={(e) => setSearch(e.target.value)}
            />
            <IconSearch
              size={20}
              className="text-gray absolute -translate-y-1/2 top-1/2 left-3"
            />
          </div>
        </div>
        <div className="w-full min-h-[260px] grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] auto-rows-auto gap-5 mt-4 overflow-y-auto custom-scroll">
          {searchItem(peopleGone).map((person) => (
            <MissingPersonCard
              key={person._id}
              requestChanging
              personData={person}
              requestClick={() => openRequestModal(person)}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
