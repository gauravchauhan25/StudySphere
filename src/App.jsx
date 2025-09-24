import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Navigation } from "./components/common/Navigation";
import { Landing } from "./pages/Landing";
import { Chat } from "./pages/Chat";
import { Reminders } from "./pages/Reminders";
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Profile";
import { useAuthContext } from "./contexts/AuthContext";
import SignUpForm from "./_auth/_forms/SignUpForm";
import SignInForm from "./_auth/_forms/SignInForm";
import Authlayout from "./_auth/AuthLayout";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated ? element : <Navigate to="/sign-in" replace />;
};

const AppLayout = () => (
  <div className="min-h-screen bg-gray-50">
    <Navigation />
    <Outlet />
  </div>
);

function App() {
  const { isAuthenticated } = useAuthContext();

  return (
    <Routes>
      {/* Auth routes (no nav) */}
      <Route element={<Authlayout />}>
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
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route
          path="/reminders"
          element={<ProtectedRoute element={<Reminders />} />}
        />
        <Route
          path="/my-profile"
          element={<ProtectedRoute element={<Profile />} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
