import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { ModalPeopleGone } from "@/components/modal/modal-people-gone";
import { Button } from "@/components/ui/button";
import { MissingPersonCard } from "@/components/card/missing-person-card";
import { uniqueId } from "@/utils/helpers";

export function MissingPeople() {
  const [edit, setEdit] = useState(null);
  const form = useFormContext();

  const peoples_gone = form.watch("people_gone");

  const startEditData = (data, form) => {
    setEdit(data);
    form.reset(data);
  };

  const triggerOpenModal = (callback, form) => {
    form.reset({ gender: "laki-laki", status: false });
    callback();
  };

  const addPeopleData = (data) => {
    const people_gone = form.getValues("people_gone");

    form.setValue("people_gone", [...people_gone, { id: uniqueId(), ...data }]);
  };

  const updateData = (data) => {
    const peopleData = form.getValues("people_gone").map((people) => {
      if (people.id) {
        return people.id === data.id ? data : people;
      }
      if (people._id) {
        return people._id === data._id ? data : people;
      }
    });

    form.setValue("people_gone", peopleData);
  };

  const deleteData = (id) => {
    const people_gone = form.getValues("people_gone").filter((people) => {
      if (people?.id) return people.id !== id;
      if (people?._id) return people._id !== id;
    });
    form.setValue("people_gone", people_gone);
  };

  return (
    <ModalPeopleGone
      confirmText="simpan data"
      onSubmit={edit ? updateData : addPeopleData}
      actionOnClose={() => setEdit(null)}
    >
      {({ openModal, form }) => (
        <div className="w-full h-auto py-8 lg:py-14 border-t border-t-snow font-inter">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl uppercase font-bold text-black">
                Daftar Orang Hilang
              </h2>
              <p className="text-sm text-gray mt-1">
                {peoples_gone.length} Laporan saat ini
              </p>
            </div>
            <Button
              size="lg"
              className="rounded-lg"
              onClick={() => triggerOpenModal(openModal, form)}
            >
              Input Data
            </Button>
          </div>
          {!peoples_gone.length ? (
            <div className="flex justify-center items-center w-full h-80">
              <p className="text-gray/70 text-sm">Tidak ada laporan saat ini</p>
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5 auto-rows-auto mt-12">
              {peoples_gone.map((people) => (
                <MissingPersonCard
                  key={uniqueId()}
                  personData={people}
                  editData={(data) => startEditData(data, form)}
                  editable
                  deleteData={deleteData}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </ModalPeopleGone>
  );
}
