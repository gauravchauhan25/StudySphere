import React from "react";
import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  MessageSquare,
  User,
  Settings,
  LogOut,
  Sun,
  Moon,
  GraduationCap,
} from "lucide-react";
import { Button } from "./Button";
import { useAuthContext } from "../../contexts/AuthContext";
import api from "../../services/appwrite";

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  const profileRef = useRef(null);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Ask StudyGenie", href: "/chat" },
    { name: "Reminders", href: "/reminders" },
    { name: "Upload Notes", href: "/upload-notes" },
    { name: "Q&A Forum", href: "/qna" },
  ];

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const isActive = (href) => location.pathname === href;

  const defaultImage =
    "https://pathwayactivities.co.uk/wp-content/uploads/2016/04/Profile_avatar_placeholder_large-circle-300x300.png";

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const logout = await api.logout();
      if (logout) {
        window.location.reload();
      }
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-white/95 dark:bg-gray-900 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-500 rounded-lg flex items-center justify-center gap-3">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              StudySphere
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2 gap-3">
            {!isAuthenticated && (
              <div className="hidden md:block">
                <Link to="/sign-in">
                  <Button variant="outline" size="sm" className="w-full">
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
              </div>
            )}

            <div className="hidden md:flex">
              <Link to="/chat">
                <Button size="sm">Start Chatting</Button>
              </Link>
            </div>

            {isAuthenticated && (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileMenuOpen((p) => !p)}
                  className="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 focus:outline-none cursor-pointer"
                  aria-haspopup="menu"
                  aria-expanded={isProfileMenuOpen}
                >
                  <img
                    src={defaultImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </button>

                {isProfileMenuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-100 dark:border-gray-700 py-2 z-50"
                  >
                    <Link
                      to="/my-profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <User className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                      My Profile
                    </Link>

                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                      Settings
                    </Link>

                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className="flex w-full items-center px-4 py-2 gap-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      {darkMode ? (
                        <>
                          <Sun className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          Light
                        </>
                      ) : (
                        <>
                          <Moon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          Dark
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Hamburger stays for mobile menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-blue-600 bg-blue-50 dark:bg-gray-700"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
              {!isAuthenticated && (
                <Link to="/sign-in">
                  <Button variant="outline" size="sm" className="w-full">
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
              )}
              <Link to="/chat" onClick={() => setIsMobileMenuOpen(false)}>
                <Button size="sm" className="w-full">
                  Start Chatting
                </Button>
              </Link>
              {/* <button
                onClick={() => setDarkMode(!darkMode)}
                className="flex w-full items-center px-3 py-2 gap-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                {darkMode ? (
                  <>
                    <Sun className="w-4 h-4 text-gray-500 dark:text-gray-400" />{" "}
                    Light
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-gray-500 dark:text-gray-400" />{" "}
                    Dark
                  </>
                )}
              </button> */}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}; 
