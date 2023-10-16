import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Outlet } from "react-router-dom";
import { UserProvider } from "./context/user-context";
import { Toaster } from "./components/ui/toaster";
import "dayjs/locale/id";

export function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="id">
      <UserProvider>
        <Toaster />
        <Outlet />
      </UserProvider>
    </LocalizationProvider>
  );
}
