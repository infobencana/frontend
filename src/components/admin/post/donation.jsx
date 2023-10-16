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
    const platformName = await fieldValidation(
      "platform_name",
      donations?.platform_name,
    );
    const holderName = await fieldValidation(
      "holder_name",
      donations?.holder_name,
    );
    const source = await fieldValidation("source", donations?.source);

    if (platformName && holderName && source) {
      toast({
        title: "Info donasi berhasil di tambahkan",
      });

      form.setValue("donations", [
        {
          ...donations,
          type: /(https?|ftp):\/\/[^\s\/$.?#].[^\s]*/i.test(donations?.source)
            ? "D1"
            : "D2",
        },
      ]);
    } else {
      toast({
        variant: "destructive",
        title: "Gagal",
        description: "Lengkapi form donasi dengan benar",
      });
    }
  };

  const fieldValidation = async (name, value) => {
    const schema = yup
      .string()
      .required()
      .matches(/^[A-Za-z0-9 ]+$/);

    const sourceSchema = yup
      .string()
      .required()
      .matches(/^(?:\d{10,15}|(https?|ftp):\/\/[^\s\/$.?#].[^\s]*)$/);

    try {
      if (name === "source") {
        await sourceSchema.validate(value);
      } else {
        await schema.validate(value);
      }
      return true;
    } catch (error) {
      return false;
    }
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
