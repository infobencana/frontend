import { IconInfoCircleFilled, IconHeartFilled } from "@tabler/icons-react";
import { PanelCard } from "../card/panel-card";
import DonateImage from "@/assets/images/donate-hand.svg";
import { Button } from "../ui/button";

export function Donation({ data }) {
  return (
    <PanelCard
      title={
        <div className="flex items-center font-inter text-black">
          <IconInfoCircleFilled className=" w-5 h-5 mr-2" />
          <h1 className="font-bold text-base uppercase">Info Donasi</h1>
        </div>
      }
    >
      {data?.type === 1 ? (
        <div className="flex flex-col space-y-2 w-full">
          <p className="font-bold text-base uppercase">{data?.platform_name}</p>
          <p className="text-sm capitalize">{data?.holder_name}</p>
          <p className="text-sm capitalize">{data?.source} </p>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full">
          <p className="font-bold text-base uppercase text-center">
            {data?.platform_name}
          </p>
          <p className="text-sm capitalize mt-1 text-center">
            {data?.holder_name}
          </p>
          <img
            src={DonateImage}
            alt="donate image"
            className="mt-6 w-[60px] h-[84px]"
            draggable={false}
          />
          <Button
            className="text-[#EB3280] uppercase w-[110px] h-10 rounded-lg border border-snow flex items-center justify-center mt-6 bg-transparent hover:bg-transparent"
            asChild
          >
            <a href={data?.source} target="_blank" rel="noreferrer">
              <IconHeartFilled className="w-5 h-5 flex-shrink-0" />
              <p className="ml-2 text-sm">donasi</p>
            </a>
          </Button>
        </div>
      )}
    </PanelCard>
  );
}
