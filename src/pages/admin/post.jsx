import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { disasterFormSchema } from "@/utils/schema";

import { SelectStatus } from "@/components/admin/post/select-status";
import { DisasterLocation } from "@/components/admin/post/disaster-location";
import { Coordinate } from "@/components/admin/post/coordinate";
import { DisasterTime } from "@/components/admin/post/disaster-time";
import { Donation } from "@/components/admin/post/donation";
import { TitlePost } from "@/components/admin/post/title-post";
import { TotalVictim } from "@/components/admin/post/total-victim";
import { ContentEditor } from "@/components/admin/post/content-editor";
import { MissingPeople } from "@/components/admin/post/missing-people";

export default function AdminPost() {
  const form = useForm({
    defaultValues: {
      people_gone: [],
    },
    resolver: yupResolver(disasterFormSchema),
  });
  console.log("POST : ", form.getValues());

  return (
    <FormProvider {...form}>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-32">
          {/* Detail Info & Description */}
          <div className="mt-5 grid grid-cols-[300px_1fr] auto-rows-auto gap-20">
            <div className="space-y-6 border-r border-r-snow pr-10">
              <SelectStatus />
              <DisasterLocation />
              <Coordinate />
              <DisasterTime />
              <TotalVictim />
              <Donation />
            </div>
            <div>
              <TitlePost />
              <div className="mt-3">
                <ContentEditor />
              </div>
            </div>
          </div>
          <MissingPeople />
        </div>
      </form>
    </FormProvider>
  );
}
