import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, BookOpen, Plus, Calendar, ExternalLink, Trash2 } from 'lucide-react';
import { Button } from '../components/common/Button';

export const Profile = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4">My Profile</h1>
                    <p className="text-xl text-blue-100">Study guidance, all in one sphere.</p>
                </div>
            </div>
        </div>
    );
};