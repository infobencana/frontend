import { UserProvider } from "./context/user-context";
import { Toaster } from "./components/ui/toaster";
import { Outlet } from "react-router-dom";

export function App() {
  return (
    <UserProvider>
      <Toaster />
      <Outlet />
    </UserProvider>
  );
}
