import { useApi } from "@/hooks/use-api";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useParams } from "react-router-dom";
import { getDisasterById } from "@/api/disaster";
import { useEffect } from "react";
import { DescriptionPost } from "@/components/post/description-post";
import { DetailPost } from "@/components/post/detail-post";
import { Donation } from "@/components/donation";
import { MissingPeople } from "@/components/post/missing-people";
import { Spinner } from "@/components/ui/spinner";
import { Comment } from "@/components/post/comment";
import { getTimeFromNow } from "@/utils/date";

export default function Post() {
  const { loading, error, data, request } = useApi(getDisasterById);
  const params = useParams();
  const matches = useMediaQuery("(min-width: 1280px)");

  useEffect(() => {
    request(params.id);
  }, []);

  if (loading || !data || error) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        {loading ? <Spinner className="mr-2.5 text-green w-7 h-7" /> : false}
        <p className="text-sm font-inter text-black font-semibold">
          {loading ? "Memuat data" : "Laporan tidak ditemukan"}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-[1fr] my-3 auto-rows-auto gap-8 xl:gap-16 xl:grid-cols-[1fr_350px] xl:my-10">
      <div className="flex flex-col xl:space-y-20 w-full h-auto">
        <DescriptionPost
          postBy={data?.user_detail}
          description={data?.detail?.description}
          date={data?.timestamp}
        />
        {matches ? <Comment disasterId={params.id} /> : false}
      </div>
      <div className="flex flex-col space-y-5 xl:space-y-9 w-full h-auto">
        <DetailPost
          status={data?.detail?.status}
          place={data?.place}
          coordinate={`${data?.latitude}, ${data?.longitude}`}
          date={data?.date}
          victim={data?.victim}
        />
        {data?.people_gone?.length ? (
          <MissingPeople data={data?.people_gone} />
        ) : (
          false
        )}
        {data?.donations?.length ? (
          <Donation data={data?.donations[0]} />
        ) : (
          false
        )}
      </div>
      {!matches ? <Comment disasterId={params.id} /> : false}
    </div>
  );
}
