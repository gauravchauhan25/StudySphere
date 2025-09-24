import { Outlet, Navigate, Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import SignUpForm from "./_forms/SignUpForm";
import SignInForm from "./_forms/SigninForm";
import { useState } from "react";


export default function AuthLayout() {
  const { isAuthenticated } = useAuthContext();
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };


  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">


              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex justify-center mb-8">
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <Link to="/sign-in">
                      <button
                        onClick={() => setIsSignUp(false)}
                        className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ${!isSignUp
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                          }`}
                      >
                        Sign In
                      </button>
                    </Link>

                    <Link to="/sign-up">
                      <button
                        onClick={() => setIsSignUp(true)}
                        className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ${isSignUp
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                          }`}
                      >
                        Sign Up
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="transition-all duration-300">
                  {isSignUp ? (
                    <SignUpForm toggleForm={toggleForm} />
                  ) : (
                    <SignInForm toggleForm={toggleForm} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
