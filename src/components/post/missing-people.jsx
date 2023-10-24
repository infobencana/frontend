import { useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "../badge/badge";
import { PanelCard } from "../card/panel-card";
import { MissingPersonCard } from "../card/missing-person-card";
import { ModalListPeopleGone } from "../modal/modal-list-people-gone";
import { ModalPeopleGone } from "../modal/modal-people-gone";
import { requestMissingPeople } from "@/api/missing-people";

export function MissingPeople({ data }) {
  const [requestData, setRequestData] = useState(null);
  const params = useParams();
  const { toast } = useToast();

  const handleRequestClick = (data, openModal) => {
    setRequestData(data);
    openModal();
  };

  const sendRequestPeopleData = async (data) => {
    data.missing_people_id = data._id;
    data.bencana_id = params.id;
    delete data._id;

    await requestMissingPeople(data);

    toast({ title: "Permintaan anda berhasil dikirim" });
  };

  return (
    <ModalPeopleGone
      initialValue={requestData}
      confirmText="Ajukan Perubahan"
      actionOnClose={() => setRequestData(null)}
      onSubmit={sendRequestPeopleData}
    >
      {({ openModal: openForm }) => (
        <ModalListPeopleGone
          peopleGone={data}
          openRequestModal={(peopleData) =>
            handleRequestClick(peopleData, openForm)
          }
        >
          {({ openModal: showListPeopleGone }) => (
            <PanelCard
              title={
                <div className="flex items-center text-black">
                  <h1 className="text-sm font-bold uppercase">orang hilang</h1>
                  <Badge className=" text-black text-xs font-bold bg-[#EDF2F7] rounded-sm ml-1.5 py-0 px-1.5 hover:bg-[#EDF2F7]">
                    {data?.length}
                  </Badge>
                </div>
              }
              action={
                data?.length > 1 ? (
                  <p
                    onClick={showListPeopleGone}
                    className="cursor-pointer text-xs font-semibold"
                  >
                    Lainnya
                  </p>
                ) : (
                  false
                )
              }
            >
              <MissingPersonCard
                requestClick={(peopleData) =>
                  handleRequestClick(peopleData, openForm)
                }
                requestChanging
                personData={data[0]}
              />
            </PanelCard>
          )}
        </ModalListPeopleGone>
      )}
    </ModalPeopleGone>
  );
}
