import { useApi } from "@/hooks/use-api";
import { useParams } from "react-router-dom";
import { getDisasterById } from "@/api/disaster";
import { useEffect } from "react";
import { DescriptionPost } from "@/components/post/description-post";
import { DetailPost } from "@/components/post/detail-post";
import { Donation } from "@/components/donation";
import { MissingPeople } from "@/components/post/missing-people";

export default function Post() {
  const { loading, error, data, request } = useApi(getDisasterById);
  const params = useParams();

  useEffect(() => {
    request(params.id);
  }, []);

  if (loading) {
    return <h1>Loading..</h1>;
  }

  if (error) {
    return <h1>Data tidak ditemukan...</h1>;
  }

  return (
    <div className="w-full grid grid-cols-[1fr_350px] auto-rows-auto gap-16 my-10">
      <div className="w-full h-auton">
        <DescriptionPost
          postBy={data?.user_detail}
          description={data?.detail?.description}
          date={data?.timestamp}
        />
      </div>
      <div className="flex flex-col space-y-9 w-full h-auto">
        <DetailPost
          status={data?.detail.status}
          place={data?.place}
          coordinate={`${data?.latitude}, ${data?.longitude}`}
          date={data?.date}
          victim={data?.victim}
        />
        {data?.people_gone.length ? (
          <MissingPeople data={data?.people_gone} />
        ) : (
          false
        )}
        {data?.donations.length ? (
          <Donation data={data?.donations[0]} />
        ) : (
          false
        )}
      </div>
    </div>
  );
}
