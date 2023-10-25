import { IconDiscountCheckFilled } from "@tabler/icons-react";
import { getTimeFromNow } from "@/utils/date";

export function UserFullname({ fullname, verified, time }) {
  return (
    <div className="w-full h-fit flex items-start font-inter space-x-1.5">
      <div className="w-fit overflow-hidden">
        <h2 className="text-sm xl:text-base line-clamp-1 font-semibold text-black break-all">
          {fullname}
        </h2>
      </div>
      {verified ? (
        <IconDiscountCheckFilled className="flex-shrink-0 w-4 h-4 mt-0.5 xl:mt-1 mr-2 text-[#008DE9]" />
      ) : (
        false
      )}
      {time ? (
        <p className="flex-shrink-0 text-xs mt-0.5 xl:text-sm text-gray font-medium capitalize xl:mt-[1.5px]">
          {getTimeFromNow(time)}
        </p>
      ) : (
        false
      )}
    </div>
  );
}
