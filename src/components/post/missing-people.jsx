import { Badge } from "../badge/badge";
import { PanelCard } from "../card/panel-card";
import { MissingPersonCard } from "../card/missing-person-card";
import { ModalListPeopleGone } from "../modal/modal-list-people-gone";

export function MissingPeople({ data }) {
  return (
    <ModalListPeopleGone peopleGone={data}>
      {({ openModal }) => (
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
            <p
              onClick={openModal}
              className="cursor-pointer text-xs font-semibold"
            >
              Lainnya
            </p>
          }
        >
          <MissingPersonCard requestChanging personData={data[0]} />
        </PanelCard>
      )}
    </ModalListPeopleGone>
  );
}
