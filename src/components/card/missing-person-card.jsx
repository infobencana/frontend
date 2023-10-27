import { useUser } from "@/context/user-context";
import { IconAlertCircleFilled } from "@tabler/icons-react";
import { Badge } from "../badge/badge";
import { Button } from "../ui/button";
import { DialogTrigger } from "../ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function MissingPersonCard({
  personData,
  requestChanging = false,
  requestClick,
  editable = false,
  editData,
  deleteData,
}) {
  const details = {
    umur: personData.age,
    berat: `${personData.weight}kg`,
    tinggi: `${personData.height}cm`,
    "lokasi terakhir": personData.last_seen,
    alamat: personData.address,
  };

  const { user } = useUser();

  return (
    <div className="flex flex-col justify-between font-inter w-full h-auto bg-[#F9F9F9] rounded-[8px] px-5 py-6">
      <div>
        <div className="flex justify-between items-start pb-[14px] border-b border-b-snow">
          <div className="max-w-[60%] w-full">
            <h2 className="text-base font-semibold text-black leading-6">
              {personData.name}
            </h2>
            <p className="capitalize text-xs text-gray font-medium mt-0.5">
              {personData.gender}
            </p>
          </div>
          <div className="w-fit">
            {!user || personData.status || !requestChanging ? (
              <Badge className="uppercase bg-green text-white font-semibold text-xs py-0 px-1 rounded-sm">
                {personData.status ? "ditemukan" : "hilang"}
              </Badge>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <IconAlertCircleFilled
                      onClick={() => requestClick(personData)}
                      size={18}
                      className="mt-1 text-[#BDBDC1] cursor-pointer hover:text-black transition-all duration-300"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Laporkan Perubahan</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-1 mt-5">
          {Object.keys(details).map((key) => (
            <div className="flex items-start justify-between gap-x-2" key={key}>
              <div className="flex items-start max-w-[100px] w-full">
                <h2 className="capitalize text-xs font-semibold text-black leading-5">
                  {key}
                </h2>
              </div>
              <div className="max-w-[160px] w-full pt-[3px]">
                <p className="text-right text-xs font-medium text-gray">
                  {details[key]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {editable ? (
        <div className="flex flex-col space-y-2 mt-6">
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="font-medium"
              onClick={() => editData(personData)}
            >
              Update
            </Button>
          </DialogTrigger>
          <Button
            size="sm"
            variant="ghost"
            className="font-medium bg-slate-200/40"
            onClick={() => deleteData(personData.id || personData._id)}
          >
            Delete
          </Button>
        </div>
      ) : (
        false
      )}
    </div>
  );
}
