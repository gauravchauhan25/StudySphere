import { useEffect, useState } from "react";
import { User, Mail, Phone, Github } from "lucide-react";
import api from "../services/appwrite"; // assuming you have an api wrapper

export const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Example: fetch user data from Appwrite
    const fetchUser = async () => {
      try {
        const response = await api.getProfile(); // <-- implement this in your service
        setUser(response);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">My Profile</h1>
          <p className="text-xl text-blue-100 dark:text-blue-200">
            Study guidance, all in one sphere.
          </p>
        </div>
      </div>

      {/* Profile Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-6">
            {/* Avatar */}
            <img
              src={
                user?.avatar ||
                "https://avatars.githubusercontent.com/u/9919?s=200&v=4" 
              }
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-4 border-blue-600 shadow-md"
            />

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user?.name || "John"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {user?.bio || "No bio available"}
              </p>
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <Mail className="w-5 h-5 mr-3 text-blue-500" />
              <span>{user?.email || "Not provided"}</span>
            </div>
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <Phone className="w-5 h-5 mr-3 text-green-500" />
              <span>{user?.phone || "Not provided"}</span>
            </div>
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <Github className="w-5 h-5 mr-3 text-gray-900 dark:text-white" />
              {user?.github ? (
                <a
                  href={user.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {user.github}
                </a>
              ) : (
                <span>Not linked</span>
              )}
            </div>
          </div>

          {/* Extra */}
          <div className="mt-8">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
