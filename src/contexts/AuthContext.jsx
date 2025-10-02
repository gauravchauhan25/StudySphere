import { useContext, useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/appwrite.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authProvider , setAuthProvider] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await api.getAccount();
        if (!user) return
        setIsAuthenticated(true);
        setUser(user);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    const getAuthProvider = async () => {
      if (!isAuthenticated) return;
      
      try {
        const provider = await api.getCurrentAuthProvider();

        if (provider === 'google') {
          setAuthProvider("google")
        } else if (provider === 'github') {
          setAuthProvider("github")
        } else if (provider === 'email' || provider === 'email-password') {
          setAuthProvider("normal login")
        }
      } catch {
        setAuthProvider(null);
        return null;
      }
    };

    checkAuth();
    getAuthProvider();
  }, []);

  useEffect(() => {
    const fetchGoogleUserData = async () => {
      try {
        setLoading(true);
        const user = await api.getAccount();

        if (user) {
          const exists = await api.getUserById(user.$id);

          if (!exists) {
            const response = await api.addUser(
              user.$id,
              user.name,
              user.email,
              user.name,
              user.phone || "",
              user.prefs?.photo || ""
            );

            if (response) {
              console.log(" User added to Appwrite DB:");
            } else {
              console.log(" User data failed to save.");
            }
          }
        }
      } catch (error) {
        console.log("Error fetching user session. Logging out...", error);
        await api.logout();
        navigate("/sign-in");
      } finally {
        setLoading(false);
      }
    };

    fetchGoogleUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        authProvider,
        setAuthProvider
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
