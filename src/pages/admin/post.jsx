import { useState } from "react";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { disasterFormSchema } from "@/utils/schema";
import { uploadImageDisaster } from "@/api/disaster";
import { useNavigate } from "react-router-dom";
import Editor from "@/components/editor";
import { Button } from "@/components/ui/button";
import { addDisasterPost } from "@/api/disaster";
import { useToast } from "@/hooks/use-toast";
import { Spinner } from "@/components/ui/spinner";

import { SelectStatus } from "@/components/admin/post/select-status";
import { DisasterLocation } from "@/components/admin/post/disaster-location";
import { Coordinate } from "@/components/admin/post/coordinate";
import { DisasterType } from "@/components/admin/post/disaster-type";
import { DisasterTime } from "@/components/admin/post/disaster-time";
import { Donation } from "@/components/admin/post/donation";
import { TitlePost } from "@/components/admin/post/title-post";
import { TotalVictim } from "@/components/admin/post/total-victim";
import { MissingPeople } from "@/components/admin/post/missing-people";

export default function AdminPost() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      people_gone: [],
      picture: "",
    },
    resolver: yupResolver(disasterFormSchema),
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  const uploadIMG = async (picture) => {
    const imageURL = await uploadImageDisaster(picture);
    form.setValue("picture", imageURL);

    return imageURL;
  };

  const submitDisasterPost = async (data) => {
    setLoading(true);

    try {
      const response = await addDisasterPost(data);

      toast({
        title: "Berhasil",
        description: "Postingan berhasil di publikasi",
      });

      navigate("/r/admin");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal",
        description: "Postingan gagal di publikasi",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-32">
          <div className="mt-5 grid grid-cols-[300px_1fr] auto-rows-auto gap-20">
            <div className="space-y-6 border-r border-r-snow pr-10">
              <DisasterType />
              <DisasterLocation />
              <Coordinate />
              <DisasterTime />
              <TotalVictim />
              <SelectStatus />
              <Donation />
            </div>
            <div>
              <TitlePost />
              <div className="mt-3">
                <Controller
                  control={form.control}
                  name="detail.description"
                  render={({ field }) => (
                    <Editor
                      onChange={field.onChange}
                      config={{ uploadFile: uploadIMG }}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <MissingPeople />
        </div>
        <div className="mt-14 flex justify-end items-center w-full space-x-5">
          <Button
            size="lg"
            variant="ghost"
            className="bg-gray/10 w-36"
            onClick={() => {
              form.reset();
              navigate("/r/admin", { replace: true });
            }}
          >
            Batal
          </Button>
          <Button
            size="lg"
            className="w-36"
            onClick={form.handleSubmit(submitDisasterPost)}
          >
            {loading ? <Spinner className="mr-2" /> : false}
            Publikasi
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
