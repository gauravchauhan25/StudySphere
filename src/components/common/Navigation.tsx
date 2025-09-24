import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageSquare, User, LogOut } from 'lucide-react';
import { Button } from './Button';
import { useAuthContext } from '../../contexts/AuthContext';

export const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuthContext();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '#features' },
    { name: 'Resources', href: '#resources' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Reminders', href: '/reminders'},
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const defaultImage =
    "https://pathwayactivities.co.uk/wp-content/uploads/2016/04/Profile_avatar_placeholder_large-circle-300x300.png";

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-500 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">StudySphere</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${isActive(item.href)
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4 gap-2">
            <Link to="/sign-in">
              {!isAuthenticated && (
                <Button variant="outline" size="sm" className="w-full">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              )}
            </Link>
            <Link to="/dashboard">
              <Button size="sm">
                Start Chatting
              </Button>
            </Link>

            <Link to="/my-profile">
              {isAuthenticated && (<div className="w-9 h-9 rounded-full overflow-hidden">
                <img
                  src={defaultImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>)}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${isActive(item.href)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
              {!isAuthenticated && (
                <Button variant="outline" size="sm" className="w-full">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              )}
              <Link to="/chat" onClick={() => setIsMobileMenuOpen(false)}>
                <Button size="sm" className="w-full">
                  Start Chatting
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};