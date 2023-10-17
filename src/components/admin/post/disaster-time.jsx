import { useFormContext, Controller } from "react-hook-form";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
import { Label } from "@/components/ui/label";
import dayjs from "dayjs";

export function DisasterTime() {
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      <Label className="text-sm text-black capitalize">
        Tanggal & Waktu Bencana
      </Label>
      <Controller
        name="detail.date"
        control={control}
        render={({ field }) => (
          <DateTimeField
            defaultValue={dayjs()}
            format="LLL"
            minDate={dayjs()}
            sx={{
              "&": {
                width: "100%",
                "& .MuiInputBase-root": {
                  ":hover": {
                    fieldset: {
                      border: "1px solid #1DB261",
                    },
                  },
                },
                "& input": {
                  fontSize: "14px",
                  color: "#2D3748",
                  padding: "16px",
                },
                "& fieldset": {
                  border: "1px solid #E2E8F0",
                  borderRadius: "15px",
                },
              },
            }}
            {...field}
            onChange={(time) => field.onChange(time.toISOString())}
          />
        )}
      />
    </div>
  );
}
