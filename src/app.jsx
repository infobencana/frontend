import { Outlet } from "react-router-dom";
import { UserProvider } from "./context/user-context";
import { Toaster } from "./components/ui/toaster";

export function App() {
  return (
    <UserProvider>
      <Toaster />
      <Outlet />
    </UserProvider>
  );
}
