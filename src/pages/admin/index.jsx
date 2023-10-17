import { useUser } from "@/context/user-context";

export default function HomeAdmin() {
  const { user } = useUser();

  return (
    <h1>
      Welcome {user.full_name} | role {user.role}
    </h1>
  );
}
