import { Loading } from "@/components/ui/loading";
import { useUser } from "@/context/user-context";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export function PrivateRoute({ role = [], children, redirect }) {
  const { user, loading } = useUser();
  const isCurrentRoleAllowed = role.includes(user?.role);

  if (loading) {
    return <Loading />;
  } else if (user && isCurrentRoleAllowed) {
    return children ?? <Outlet />;
  } else {
    return <Navigate to={redirect} replace />;
  }
}
