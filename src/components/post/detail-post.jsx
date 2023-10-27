import dayjs from "dayjs";
import { DisasterStatusBadge } from "../badge/disaster-status-badge";
import { PanelCard } from "../card/panel-card";

export function DetailPost({ status, place, coordinate, date, victim, type }) {
  return (
    <PanelCard>
      <div className="w-full h-auto flex flex-col space-y-5 font-inter">
        <div className="border-b border-b-snow pb-[15px]">
          <h2 className="font-bold text-black text-sm mb-2.5 uppercase">
            status bencana
          </h2>
          <DisasterStatusBadge status={status} />
        </div>
        <div className="border-b border-b-snow pb-[15px]">
          <h2 className="font-bold text-black text-sm mb-2.5 uppercase">
            Jenis Bencana
          </h2>
          <p className="text-sm text-black font-medium capitalize">{type}</p>
        </div>
        <div className="border-b border-b-snow pb-[15px]">
          <h2 className="font-bold text-black text-sm mb-2.5 uppercase">
            Lokasi
          </h2>
          <p className="text-sm text-black font-medium">{place}</p>
        </div>
        <div className="border-b border-b-snow pb-[15px]">
          <h2 className="font-bold text-black text-sm mb-2.5 uppercase">
            Koordinat
          </h2>
          <p className="text-sm text-black font-medium">{coordinate}</p>
        </div>
        <div className="border-b border-b-snow pb-[15px]">
          <h2 className="font-bold text-black text-sm mb-2.5 uppercase">
            Waktu
          </h2>
          <p className="text-sm text-black font-medium">
            {dayjs(date).format("DD MMMM YYYY [pukul] HH.mm A")}
          </p>
        </div>
        <div>
          <h2 className="font-bold text-black text-sm mb-2.5 uppercase">
            Total Korban
          </h2>
          <p className="text-sm text-black font-medium">{victim}</p>
        </div>
      </div>
    </PanelCard>
  );
}
