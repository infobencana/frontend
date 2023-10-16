import { Badge } from "../ui/badge";
import { IconAlertCircleFilled } from "@tabler/icons-react";

export function MissingPersonCard({
  personData,
  requestChanging = false,
  editable = false,
}) {
  return (
    <div className="font-inter w-full h-auto bg-[#F9F9F9] rounded-[8px] px-5 py-6">
      <div className="flex justify-between items-start pb-[14px] border-b border-b-snow">
        <div className="max-w-[60%] w-full">
          <h2 className="text-base font-semibold text-black leading-6">
            {personData.name}
          </h2>
          <p className="capitalize text-xs text-gray font-medium mt-1">
            {personData.gender}
          </p>
        </div>
        <div className="w-fit">
          {personData.status || !requestChanging ? (
            <Badge className="uppercase bg-green text-white font-semibold text-xs py-0 px-1 rounded-sm">
              {personData.status ? "ditemukan" : "hilang"}
            </Badge>
          ) : (
            <IconAlertCircleFilled
              size={18}
              className="text-[#BDBDC1] cursor-pointer hover:text-black transition-all duration-300"
            />
          )}
        </div>
      </div>
      <div className="flex flex-col space-y-0.5 mt-5">
        <div className="flex items-center justify-between gap-x-2">
          <div className="max-w-[100px] w-full">
            <h2 className="capitalize text-xs font-semibold text-black leading-7">
              umur
            </h2>
          </div>
          <div className="max-w-[160px] w-full">
            <p className="text-right text-xs font-medium text-gray">
              {personData.age}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-x-2">
          <div className="max-w-[100px] w-full">
            <h2 className="capitalize text-xs font-semibold text-black leading-7">
              berat
            </h2>
          </div>
          <div className="max-w-[160px] w-full">
            <p className="text-right text-xs font-medium text-gray">
              {personData.weight}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-x-2">
          <div className="max-w-[100px] w-full">
            <h2 className="capitalize text-xs font-semibold text-black leading-7">
              tinggi
            </h2>
          </div>
          <div className="max-w-[160px] w-full">
            <p className="text-right text-xs font-medium text-gray">
              {personData.height}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-x-2">
          <div className="max-w-[100px] w-full">
            <h2 className="capitalize text-xs font-semibold text-black leading-7">
              lokasi terakhir
            </h2>
          </div>
          <div className="max-w-[160px] w-full">
            <p className="text-right text-xs font-medium text-gray">
              {personData.last_seen}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-x-2">
          <div className="max-w-[100px] w-full">
            <h2 className="capitalize text-xs font-semibold text-black leading-7">
              alamat
            </h2>
          </div>
          <div className="max-w-[160px] w-full">
            <p className="text-right text-xs font-medium text-gray">
              {personData.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
