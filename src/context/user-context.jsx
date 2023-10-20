import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "@/api/user";
import { getToken } from "@/utils/auth";
import { Loading } from "@/components/ui/loading";

const UserContext = createContext(null);

function UserProvider(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getUserData = async () => {
    try {
      const response = await getCurrentUser();
      setUser(response.data.data);
    } catch (error) {
      setError(error.response);
    }

    setTimeout(() => setLoading(false), 800);
  };

  useEffect(() => {
    if (!user && getToken()) {
      getUserData();
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error && error.message) {
    return (
      <div>
        <h1>Oppss error</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        updateUser: setUser,
        getUserData,
      }}
      {...props}
    />
  );
}

const useUser = () => {
  return useContext(UserContext);
};

export { UserProvider, useUser };
