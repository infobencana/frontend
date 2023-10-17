import { useState } from "react";
import * as yup from "yup";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function Donation() {
  const [donations, setDonations] = useState({});

  const form = useFormContext();
  const { toast } = useToast();

  const addDonation = async () => {
    const platformName = fieldValidation(
      "platform_name",
      donations?.platform_name,
    );
    const holderName = fieldValidation("holder_name", donations?.holder_name);
    const source = fieldValidation("source", donations?.source);

    if (platformName && holderName && source) {
      toast({
        title: "Info donasi berhasil di tambahkan",
      });

      const URLRegex = /(https?|ftp):\/\/[^\s\/$.?#].[^\s]*/i;

      return form.setValue("donations", [
        {
          ...donations,
          type: URLRegex.test(donations?.source) ? "D1" : "D2",
        },
      ]);
    }

    toast({
      variant: "destructive",
      title: "Gagal menambahkan donasi",
      description: "Lengkapi form donasi dengan benar",
    });
  };

  const fieldValidation = (name, value) => {
    const regexString = /^[A-Za-z0-9 ]+$/;
    const regexSource = /^(?:\d{10,15}|(https?|ftp):\/\/[^\s\/$.?#].[^\s]*)$/;

    if (name === "source") return regexSource.test(value);
    else return regexString.test(value);
  };

  const handleInputChange = (target) => {
    setDonations({ ...donations, [target.name]: target.value });
  };

  return (
    <div className="flex flex-col space-y-5">
      <Label className="text-sm text-black capitalize">Info Donasi</Label>
      <div className="flex flex-col space-y-4">
        <Input
          placeholder="Nama bank atau platform donasi"
          name="platform_name"
          onChange={(e) => {
            handleInputChange(e.target);
          }}
        />
        <Input
          placeholder="Nama pemilik donasi"
          name="holder_name"
          onChange={(e) => {
            handleInputChange(e.target);
          }}
        />
        <Input
          placeholder="Nomor rekening atau link donasi"
          name="source"
          onChange={(e) => {
            handleInputChange(e.target);
          }}
        />
        <div className="w-full">
          <span className="text-xs text-gray italic">
            *maksimal hanya satu donasi
          </span>
          <Button
            size="lg"
            variant="outline"
            className="w-full mt-3"
            onClick={addDonation}
          >
            Simpan Donasi
          </Button>
        </div>
      </div>
    </div>
  );
}
