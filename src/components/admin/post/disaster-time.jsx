import dayjs from "dayjs";
import { useFormContext, Controller } from "react-hook-form";
import {
  DateTimeField,
  LocalizationProvider,
  AdapterDayjs,
} from "@mui/x-date-pickers";
import { Label } from "@/components/ui/label";

export function DisasterTime() {
  const { control, getFieldState } = useFormContext();
  const { error } = getFieldState("detail.date");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="id">
      <div className="space-y-2">
        <Label className="text-sm text-black capitalize">
          Tanggal & Waktu Bencana
        </Label>
        <Controller
          name="detail.date"
          control={control}
          render={({ field }) => (
            <DateTimeField
              format="LLL"
              sx={{
                "&": {
                  width: "100%",
                  "& .MuiInputBase-root": {
                    ":hover": {
                      fieldset: {
                        border: `1px solid ${error ? "#ef4444" : "#1DB261"}`,
                      },
                    },
                  },
                  "& input": {
                    fontSize: "14px",
                    color: "#2D3748",
                    padding: "16px",
                  },
                  "& fieldset": {
                    border: `1px solid ${error ? "#ef4444" : "#E2E8F0"}`,
                    borderRadius: "15px",
                  },
                },
              }}
              {...field}
              value={dayjs(field.value || new Date())}
              onChange={(time) => field.onChange(time.toISOString())}
            />
          )}
        />
      </div>
    </LocalizationProvider>
  );
}
