import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/appwrite";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await api.getCurrentUser();

        if (userData) {
          setUserProfile({
            username: userData.username,
            userId: userData.userId,
            email: userData.email,
            name: userData.name,
            avatarUrl: userData.avatarUrl || "",
          });
        } else {
          console.error("User data not found!");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    

    fetchUserProfile();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        userProfile,
        setUserProfile,
        loading,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => useContext(ProfileContext);