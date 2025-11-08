import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  BookOpen,
  Plus,
  Calendar,
  Trash2,
} from "lucide-react";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";

export const Dashboard = () => {
  const [savedChats] = useState([
    {
      id: "1",
      title: "Math Help - Quadratic Equations",
      messages: [],
      createdAt: new Date(2025, 0, 15),
      updatedAt: new Date(2025, 0, 15),
    },
   
  ]);

  const getSubjectColor = (subject) => {
    const colors = {
      Mathematics: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      Biology: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      English: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      Physics: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      Chemistry: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    };
    return colors[subject] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "video":
        return "🎥";
      case "pdf":
        return "📄";
      case "article":
        return "📖";
      default:
        return "🔗";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Dashboard</h1>
          <p className="text-xl text-blue-100">
            Study guidance, all in one sphere.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <Link to="/chat">
            <Button size="lg" icon={Plus} className="w-full sm:w-auto">
              Start New Chat
            </Button>
          </Link>
        </div>

        {/* Saved Chats */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <MessageSquare className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
                Saved Chats
              </h2>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {savedChats.map((chat) => (
                <Card
                  key={chat.id}
                  className="cursor-pointer hover:shadow-md transition-shadow duration-200"
                  onClick={() => {}}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                        {chat.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {chat.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <button className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
