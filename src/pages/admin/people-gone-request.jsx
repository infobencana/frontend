import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  getDetailReqMissingPeople,
  actionReqMissingPeople,
} from "@/api/missing-people";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useApi } from "@/hooks/use-api";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function PeopleGoneRequest() {
  const [loadingReq, setLoadingReq] = useState(false);
  const [currentButton, setCurrentButton] = useState(null);
  const { loading, error, data, request } = useApi(getDetailReqMissingPeople);

  const { toast } = useToast();
  const params = useParams();
  const navigate = useNavigate();

  const fields = {
    name: "nama",
    status: "status",
    gender: "jenis kelamin",
    weight: "berat",
    height: "tinggi",
    age: "umur",
    address: "alamat",
    last_seen: "lokasi terakhir",
  };

  const handleUserRequest = async (status) => {
    const actionData = {
      req_missing_people_id: data.data._id,
      req_status: status,
    };

    try {
      setLoadingReq(true);
      await actionReqMissingPeople(actionData);
      toast({
        title: "Proses berhasil",
      });
      setTimeout(() => {
        navigate("../dashboard", { replace: true });
      }, 2000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Proses Gagal",
        description: "silahkan coba lagi",
      });
    } finally {
      setCurrentButton(null);
      setLoadingReq(false);
    }
  };

  useEffect(() => {
    request(params?.id);
  }, []);

  return (
    <Dialog open={open}>
      <DialogContent
        closeIcon={false}
        className="custom-scroll outline-0 flex flex-col overflow-y-auto px-4 py-10 lg:p-10 font-inter max-w-full lg:max-w-[995px] w-full h-full lg:h-auto lg:min-h-[530px]"
      >
        {loading || error || (!loading && !data) ? (
          <div className="flex justify-center items-center w-full h-[400px]">
            {loading ? <Spinner className="text-green w-10 h-10" /> : false}
            {error ? (
              <div className="flex flex-col items-center">
                <h1 className="text-2xl text-black font-bold text-center">
                  Ooops!
                </h1>
                <p className="text-sm text-black text-center mt-1">
                  Sepertinya data yang anda cari tidak tersedia atau telah di
                  hapus
                </p>
                <Button asChild className="w-40 h-12 rounded-md mt-10">
                  <Link to="../dashboard" replace>
                    Kembali
                  </Link>
                </Button>
              </div>
            ) : (
              false
            )}
          </div>
        ) : (
          <>
            <div className="w-full h-fit flex flex-col lg:flex-row items-start justify-between space-y-1 lg:space-x-3">
              <div className="text-black w-full">
                <h1 className="text-xl lg:text-base font-bold">
                  {data.data.title}
                </h1>
                <p className="text-xs lg:text-sm mt-2 lg:mt-1">
                  Di request oleh
                  <span className="font-semibold ml-1.5">
                    {data.data.req_by}
                  </span>
                </p>
              </div>
              <div className="w-full lg:w-[200px]">
                <p className="text-xs lg:text-sm font-medium text-gray text-left lg:text-right">
                  {dayjs(data.data.date).format("DD MMMM YYYY")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] auto-rows-auto w-full mt-8 gap-10 lg:gap-3">
              {["before", "after"].map((state) => (
                <React.Fragment key={state}>
                  <div className="relative border-2 border-snow border-dotted px-5 py-7 lg:px-6 rounded-md">
                    <p
                      className={cn(
                        "absolute uppercase text-xs font-bold bg-white border border-snow",
                        "-translate-x-1/2 -translate-y-1/2 left-1/2 -top-0 px-2 py-1 rounded-sm",
                        state === "before" ? "text-red-500" : "text-green",
                      )}
                    >
                      {state}
                    </p>
                    <div className="flex flex-col text-sm text-black">
                      {Object.keys(fields).map((field) => (
                        <div
                          key={field}
                          className={cn(
                            "flex items-start justify-between space-x-4 py-1.5",
                            data.data["before"][field] !==
                              data.data["after"][field]
                              ? "bg-green/10"
                              : "bg-white",
                          )}
                        >
                          <div className="h-fit lg:min-w-[150px]">
                            <p className="font-semibold text-left capitalize">
                              {fields[field]}
                            </p>
                          </div>
                          <div className="w-fit h-fit">
                            <p className="text-right capitalize">
                              {field === "status"
                                ? data.data[state][field]
                                  ? "DITEMUKAN"
                                  : "HILANG"
                                : data.data[state][field]}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div className="flex flex-col w-full space-y-3 mt-5">
              <Button
                size="lg"
                disabled={loadingReq}
                onClick={() => {
                  setCurrentButton("accept");
                  handleUserRequest("accepted");
                }}
              >
                {currentButton === "accept" ? (
                  <Spinner className="mr-2" />
                ) : (
                  false
                )}
                Perbarui Data
              </Button>
              <Button
                size="lg"
                variant="outline"
                disabled={loadingReq}
                onClick={() => {
                  setCurrentButton("reject");
                  handleUserRequest("rejected");
                }}
              >
                {currentButton === "reject" ? (
                  <Spinner className="mr-2" />
                ) : (
                  false
                )}
                Tolak
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
