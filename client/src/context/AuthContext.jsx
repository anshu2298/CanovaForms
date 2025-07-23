/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] =
    useState(null);
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/user/get-user",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
        setUser(data.user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (err) {
      console.error("Error verifying user:", err);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async () => await fetchUser();
  const refreshUser = async () => await fetchUser();
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
