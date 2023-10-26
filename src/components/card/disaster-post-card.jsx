import { Link } from "react-router-dom";
import {
  IconMapPinFilled,
  IconClockFilled,
  IconMoodSadFilled,
} from "@tabler/icons-react";
import { DisasterStatusBadge } from "../badge/disaster-status-badge";
import { UserFullname } from "../user/user-fullname";
import dayjs from "dayjs";

export function DisasterPostCard({ disaster }) {
  return (
    <Link
      to="/"
      className="w-full h-auto bg-white border border-snow px-4 py-6 sm:p-7 rounded-xl font-inter hover:border-green animate-in fade-in-20 duration-300 transition-all"
    >
      <DisasterStatusBadge status="pemulihan" />
      <h1 className="font-bold text-base leading-6 mt-4 line-clamp-3 sm:text-lg sm:leading-7">
        PERINGATAN DINI ! BERPOTENSI TERJADI TSUNAMI DI WILAYAH SUMUT SETELAH
        GEMPA BUMI
      </h1>
      <div className="w-full mt-3">
        <UserFullname
          fullname="Badan Penanggulangan Bencana Nasional"
          time={dayjs("2023-10-20T08:22:12.396Z").format("DD MMMM YYYY")}
          verified
        />
      </div>
      <div className="w-full mt-5 flex flex-col space-y-2.5">
        <div className="flex items-start">
          <IconMapPinFilled className="w-4 h-4  text-green mr-2.5 mt-[2.5px] flex-shrink-0 sm:mt-0.5 sm:w-5 sm:h-5 " />
          <p className="text-sm sm:text-base text-black">
            Pulau Tanahbala, Nias Selatan, Sumatera Utara
          </p>
        </div>
        <div className="flex items-start">
          <IconClockFilled className="w-4 h-4  text-black mr-2.5 mt-[2.5px] flex-shrink-0 sm:mt-0.5 sm:w-5 sm:h-5 " />
          <p className="text-sm sm:text-base text-black">
            24 Januari 2018 pukul 03.09 WIB
          </p>
        </div>
        <div className="flex items-start">
          <IconMoodSadFilled className="w-4 h-4  text-red-500 mr-2.5 mt-[2.5px] flex-shrink-0 sm:mt-0.5 sm:w-5 sm:h-5 " />
          <p className="text-sm sm:text-base text-black">31 Korban</p>
        </div>
      </div>
    </Link>
  );
}
