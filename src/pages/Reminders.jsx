import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, BookOpen, Plus, Calendar, ExternalLink, Trash2 } from 'lucide-react';
import { Button } from '../components/common/Button';

export const Reminders = () => {
    const [savedChats] = useState([
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


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4">Reminders</h1>
                    <p className="text-xl text-blue-100">Study guidance, all in one sphere.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Quick Actions */}
                <div className="mb-8">
                    <Link to="/reminders">
                        <Button size="lg" icon={Plus} className="w-full sm:w-auto">
                            Add a new Reminder
                        </Button>
                    </Link>
                </div>



            </div>
        </div>
    );
};