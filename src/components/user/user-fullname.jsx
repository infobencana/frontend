import { IconDiscountCheckFilled } from "@tabler/icons-react";
import { getTimeFromNow } from "@/utils/date";

export function UserFullname({ fullname, verified, time }) {
  return (
    <div className="w-full h-fit flex items-start font-inter space-x-1.5">
      <div className="max-w-3xl overflow-hidden">
        <h2 className="text-sm xl:text-base font-semibold text-black">
          {fullname}
        </h2>
      </div>
      {verified ? (
        <IconDiscountCheckFilled className="w-4 h-4 mt-[3px] xl:mt-1 mr-2 text-[#008DE9]" />
      ) : (
        false
      )}
      {time ? (
        <p className="text-sm text-gray font-medium capitalize xl:mt-[1.5px]">
          {getTimeFromNow(time)}
        </p>
      ) : (
        false
      )}
    </div>
  );
}
