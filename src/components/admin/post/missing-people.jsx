import { useFormContext } from "react-hook-form";
import { ModalPeopleGone } from "@/components/modal/modal-people-gone";
import { Button } from "@/components/ui/button";
import { MissingPersonCard } from "@/components/card/missing-person-card";

export function MissingPeople() {
  const form = useFormContext();

  const peoples_gone = form.watch("people_gone");

  const submitMissingPeople = (data) => {
    const peoples_gone = form.getValues("people_gone");
    form.setValue("people_gone", [...peoples_gone, data]);
  };

  return (
    <div className="w-full h-auto py-10 border-t border-t-snow font-inter">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl uppercase font-bold text-black">
            orang hilang
          </h2>
          <p className="text-sm text-gray">{peoples_gone.length} Laporan</p>
        </div>
        <ModalPeopleGone
          onSubmit={submitMissingPeople}
          trigger={
            <Button size="lg" className="rounded-lg">
              Input Data
            </Button>
          }
        >
          {({ closeModal }) => (
            <div className="space-y-3">
              <Button size="lg" className="w-full">
                Simpan Data
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="bg-gray/10 w-full"
                onClick={() => closeModal()}
              >
                Batal
              </Button>
            </div>
          )}
        </ModalPeopleGone>
      </div>
      {!peoples_gone.length ? (
        <div className="flex justify-center items-center w-full h-80">
          <p className="text-gray/70 text-sm">Tidak ada laporan saat ini</p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5 auto-rows-auto mt-10">
          {peoples_gone.map((people) => (
            <MissingPersonCard
              personData={people}
              key={people.full_name}
              editable
            />
          ))}
        </div>
      )}
    </div>
  );
}
