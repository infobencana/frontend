import { useState } from "react";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { disasterFormSchema } from "@/utils/schema";
import { uploadImageDisaster } from "@/api/disaster";
import { useNavigate, useParams } from "react-router-dom";
import {
  addDisasterPost,
  getDisasterById,
  updateDisaster,
} from "@/api/disaster";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ToastAction } from "@/components/ui/toast";
import { DropdownStatusDisaster } from "@/components/dropdown/dropdown-status-disaster";
import { DisasterLocation } from "@/components/admin/post/disaster-location";
import { Coordinate } from "@/components/admin/post/coordinate";
import { DropdownDisasterType } from "@/components/dropdown/dropdown-disaster-type";
import { DisasterTime } from "@/components/admin/post/disaster-time";
import { Donation } from "@/components/admin/post/donation";
import { TitlePost } from "@/components/admin/post/title-post";
import { TotalVictim } from "@/components/admin/post/total-victim";
import { MissingPeople } from "@/components/admin/post/missing-people";
import Editor from "@/components/editor";
import { cn } from "@/utils/cn";

export default function AdminPost({ onEdit }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getDisasterData = async () => {
    const id = params?.id;

    if (onEdit && id) {
      try {
        const data = await getDisasterById(id);
        const { timestamp, _id, discuss, ...disasterData } = data;
        return disasterData.data;
      } catch (error) {
        setError(error);
      }
    }

    return {
      people_gone: [],
      donations: [],
      picture: "",
    };
  };

  const form = useForm({
    defaultValues: getDisasterData,
    resolver: yupResolver(disasterFormSchema),
  });

  const { toast } = useToast();
  const navigate = useNavigate();
  const params = useParams();

  const picture = form.getFieldState("picture");
  const formLoading = form.formState.isLoading;

  const uploadIMG = async (picture) => {
    const imageURL = await uploadImageDisaster(picture);
    form.setValue("picture", imageURL);
    form.clearErrors("picture");
    return imageURL;
  };

  const submitDisasterPost = async (data) => {
    setLoading(true);

    try {
      let formData = JSON.parse(JSON.stringify(data));
      let donate = formData.donations.length;

      formData.people_gone = formData.people_gone.map((people) => {
        delete people.id;
        delete people._id;
        delete people.timestamp;

        return people;
      });

      if (donate) delete formData.donations[0]._id;
      if (formData._id) delete formData._id;
      if (formData.user_detail) delete formData.user_detail;

      const response = onEdit
        ? await updateDisaster(params?.id, formData)
        : await addDisasterPost(formData);

      toast({
        title: "Berhasil",
        description: "anda akan diarahkan ke halaman post",
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => navigate(`/post/${response._id}`)}
          >
            Lihat Postingan
          </ToastAction>
        ),
      });

      setTimeout(() => navigate(`/post/${response._id}`), 3000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal",
        description: onEdit
          ? "update post gagal"
          : "Postingan gagal di publikasi",
      });
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="w-full h-[350px] flex items-center justify-center">
        <p className="text-sm font-inter text-black">
          Data bencana tidak ditemukan
        </p>
      </div>
    );
  }

  return (
    <FormProvider {...form}>
      {formLoading ? (
        <div className="w-full h-[400px] flex items-center justify-center">
          <Spinner className="mr-2 text-gray/50" />
          <p className="text-sm font-inter text-black">Sedang Memuat Data</p>
        </div>
      ) : (
        <form
          onSubmit={(e) => e.preventDefault()}
          className="animate-in duration-1000 fade-in"
        >
          <div className="space-y-20 lg:space-y-32">
            <div className="mt-5 grid lg:grid-cols-[300px_1fr] auto-rows-auto gap-10 lg:gap-20">
              <div
                className={cn(
                  "space-y-6 border-t border-t-snow border-r-snow pt-10 order-2",
                  "lg:pt-0 lg:border-t-0 lg:border-r  lg:pr-10  lg:order-1",
                )}
              >
                <DropdownDisasterType />
                <DisasterLocation />
                <Coordinate />
                <DisasterTime />
                <TotalVictim />
                <DropdownStatusDisaster />
                <Donation
                  initialValue={onEdit ? form.getValues("donations")[0] : {}}
                />
              </div>
              <div className="order lg:order-2">
                <TitlePost />
                <div className="mt-3">
                  <Controller
                    control={form.control}
                    name="detail.description"
                    render={({ field }) => (
                      <div className="w-full h-full">
                        <Editor
                          onChange={field.onChange}
                          config={{
                            uploadFile: uploadIMG,
                            initialContent: onEdit
                              ? JSON.parse(form.getValues("detail.description"))
                              : null,
                          }}
                        />
                        {picture?.error ? (
                          <p className="text-[11px] italic text-red-500 mt-2">
                            *konten tidak boleh kosong dan wajib melampirkan
                            gambar
                          </p>
                        ) : (
                          false
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
            <MissingPeople initialValue={form.getValues("people_gone")} />
          </div>
          <div className="mt-14 flex justify-end items-center w-full space-x-5">
            <Button
              size="lg"
              variant="ghost"
              className="bg-gray/10 w-36"
              onClick={() => {
                form.reset();
                navigate("/r/admin/dashboard", { replace: true });
              }}
            >
              Batal
            </Button>
            <Button
              size="lg"
              className="w-36"
              onClick={form.handleSubmit(submitDisasterPost)}
              disabled={loading}
            >
              {loading ? <Spinner className="mr-2" /> : false}
              {onEdit ? "Perbarui" : "Publikasi"}
            </Button>
          </div>
        </form>
      )}
    </FormProvider>
  );
}
