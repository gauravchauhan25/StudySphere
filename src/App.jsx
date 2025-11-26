import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";
import { Reminders } from "./pages/Reminders";
import { Chat } from "./pages/Chat";
import { Landing } from "./pages/Landing";
import { Profile } from "./pages/Profile";
import { UploadNotes } from "./pages/UploadNotes";
import { Navigation } from "./components/common/Navigation";
import { useAuthContext } from "./contexts/AuthContext";
import SignUpForm from "./_auth/_forms/SignUpForm";
import SignInForm from "./_auth/_forms/SignInForm";
import Authlayout from "./_auth/AuthLayout";
import ForumPage from "./qna-forum/ForumPage";
import api from "./services/appwrite";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated ? element : <Navigate to="/sign-in" replace />;
};

const AppLayout = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors">
    <Navigation />
    <Outlet />
  </div>
);

function App() {
  const { isAuthenticated } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    <Routes>
      {/* Auth routes (no nav) */}
      <Route
        element={
          <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-200 transition-colors">
            <Authlayout />
          </div>
        }
      >
        <Route
          path="/sign-in"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <SignInForm />
          }
        />
        <Route
          path="/sign-up"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <SignUpForm />
          }
        />
      </Route>

      {/* App routes (with nav) */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/chat" element={<ProtectedRoute element={<Chat />} />} />
        <Route
          path="/reminders"
          element={<ProtectedRoute element={<Reminders />} />}
        />
        <Route
          path="/my-profile"
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path="/upload-notes"
          element={<ProtectedRoute element={<UploadNotes />} />}
        />
        <Route
          path="/qna"
          element={<ProtectedRoute element={<ForumPage />} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
