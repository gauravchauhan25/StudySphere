import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, BookOpen, Plus, Calendar, ExternalLink, Trash2 } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Chat, Resource } from '../types';

export const Dashboard: React.FC = () => {
  const [savedChats] = useState<Chat[]>([
    {
      id: '1',
      title: 'Math Help - Quadratic Equations',
      messages: [],
      createdAt: new Date(2025, 0, 15),
      updatedAt: new Date(2025, 0, 15)
    },
    {
      id: '2',
      title: 'Biology Study Session',
      messages: [],
      createdAt: new Date(2025, 0, 14),
      updatedAt: new Date(2025, 0, 14)
    },
    {
      id: '3',
      title: 'Essay Writing Tips',
      messages: [],
      createdAt: new Date(2025, 0, 13),
      updatedAt: new Date(2025, 0, 13)
    }
  ]);

  const [savedResources] = useState<Resource[]>([
    {
      id: '1',
      title: 'Khan Academy - Algebra Basics',
      description: 'Complete guide to algebraic concepts and problem-solving techniques.',
      url: 'https://khanacademy.org/algebra',
      subject: 'Mathematics',
      type: 'video'
    },
    {
      id: '2',
      title: 'Biology Study Guide',
      description: 'Comprehensive biology notes covering cell structure and function.',
      url: '#',
      subject: 'Biology',
      type: 'pdf'
    },
    {
      id: '3',
      title: 'Writing Center - Essay Structure',
      description: 'Learn how to structure compelling academic essays.',
      url: '#',
      subject: 'English',
      type: 'article'
    },
    {
      id: '4',
      title: 'Physics Simulation Lab',
      description: 'Interactive physics simulations for better understanding.',
      url: '#',
      subject: 'Physics',
      type: 'link'
    }
  ]);

  const getSubjectColor = (subject: string): string => {
    const colors: { [key: string]: string } = {
      Mathematics: 'bg-blue-100 text-blue-800',
      Biology: 'bg-green-100 text-green-800',
      English: 'bg-purple-100 text-purple-800',
      Physics: 'bg-orange-100 text-orange-800',
      Chemistry: 'bg-red-100 text-red-800'
    };
    return colors[subject] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return '🎥';
      case 'pdf':
        return '📄';
      case 'article':
        return '📖';
      default:
        return '🔗';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Dashboard</h1>
          <p className="text-xl text-blue-100">Study guidance, all in one sphere.</p>
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
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <MessageSquare className="w-6 h-6 mr-2 text-blue-600" />
                Saved Chats
              </h2>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {savedChats.map((chat) => (
                <Card
                  key={chat.id}
                  className="cursor-pointer hover:shadow-md transition-shadow duration-200"
                  onClick={() => { }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{chat.title}</h3>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {chat.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <button className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Saved Resources */}
          {/* <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <BookOpen className="w-6 h-6 mr-2 text-teal-600" />
                Saved Resources
              </h2>
            </div>
            
            <div className="grid gap-4 max-h-96 overflow-y-auto">
              {savedResources.map((resource) => (
                <Card 
                  key={resource.id}
                  className="cursor-pointer"
                  onClick={() => window.open(resource.url, '_blank')}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-lg mr-2">{getTypeIcon(resource.type)}</span>
                        <h3 className="font-medium text-gray-900">{resource.title}</h3>
                        <ExternalLink className="w-4 h-4 ml-2 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSubjectColor(resource.subject)}`}>
                          {resource.subject}
                        </span>
                        <button className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div> */}
        </div>

        {/* Study Statistics */}
        {/* <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Study Statistics</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">15</h3>
              <p className="text-sm text-gray-600">Total Chats</p>
            </Card>
            
            <Card className="text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">28</h3>
              <p className="text-sm text-gray-600">Resources Saved</p>
            </Card>
            
            <Card className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">12</h3>
              <p className="text-sm text-gray-600">Days Active</p>
            </Card>
            
            <Card className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Plus className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">5</h3>
              <p className="text-sm text-gray-600">Subjects Covered</p>
            </Card>
          </div>
        </div> */}
      </div>
    </div>
  );
};