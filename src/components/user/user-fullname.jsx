import { IconDiscountCheckFilled } from "@tabler/icons-react";
import { getTimeFromNow } from "@/utils/date";

export function UserFullname({ fullname, verified, time }) {
  return (
    <div className="w-full h-auto flex items-start font-inter space-x-1">
      <div className="max-w-3xl overflow-hidden">
        <h2 className="text-base font-semibold text-black">{fullname}</h2>
      </div>
      <div className="flex items-center flex-shrink-0 mt-0.5">
        {verified ? (
          <IconDiscountCheckFilled className="w-4 h-4 mt-0.5 text-[#008DE9]" />
        ) : (
          false
        )}
        {time ? (
          <p className="text-sm text-gray font-medium ml-2 capitalize">
            {getTimeFromNow(time)}
          </p>
        ) : (
          false
        )}
      </div>
    </div>
  );
}
