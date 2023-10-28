import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "@/api/user";
import { getToken } from "@/utils/auth";

const UserContext = createContext(null);

function UserProvider(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getUserData = async () => {
    if (getToken()) {
      try {
        const response = await getCurrentUser();
        setUser(response.data.data);
      } catch (error) {
        setError(error.response);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    getUserData();
  }, []);

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
