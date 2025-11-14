import React, { useState } from "react";
import { BookOpen, Upload, Users, Sparkles } from "lucide-react";
import UploadNoteForm from "../components/UploadNoteForm";
import NotesList from "../components/NotesList";

export function UploadNotes() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUploadSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <>
      <div className="dark:bg-gray-900 dark:text-gray-100">
        <div className="grid lg:grid-cols-2 gap-8 mt-10 mb-12">
          <UploadNoteForm onUploadSuccess={handleUploadSuccess} />
          <NotesList refreshTrigger={refreshTrigger} />
        </div>

        {/* HERO SECTION */}
        <section className="container mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              Transform Your Learning Journey
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A next-generation academic ecosystem where knowledge flows freely,
              collaboration thrives, and every learner finds the support they
              need
            </p>
          </div>

          {/* CARDS */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              <div className="p-3 bg-blue-100 dark:bg-blue-800 rounded-lg w-fit mb-4">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Smart Learning
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Access organized notes from every semester and subject, curated
                by students for students
              </p>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              <div className="p-3 bg-cyan-100 dark:bg-cyan-800 rounded-lg w-fit mb-4">
                <Users className="w-6 h-6 text-cyan-600 dark:text-cyan-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Community Driven
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Share your knowledge and help fellow students succeed in their
                academic journey
              </p>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              <div className="p-3 bg-blue-100 dark:bg-blue-800 rounded-lg w-fit mb-4">
                <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Always Available
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Download and view notes anytime, anywhere. Your study companion
                that never sleeps
              </p>
            </div>
          </div>
        </section>

        {/* MISSION SECTION */}
        <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-12 dark:from-blue-800 dark:to-cyan-700">
          <div className="container mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Upload className="w-8 h-8" />
              <h2 className="text-3xl font-bold">Our Mission</h2>
            </div>
            <p className="text-lg max-w-3xl mx-auto opacity-95 leading-relaxed">
              To transform the way students learn, share, and grow by creating a
              digital environment that combines academic resources,
              community-driven assistance, and intelligent features — making
              education more interactive and accessible to all.
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-blue-100 dark:border-gray-700 py-8">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              StudySphere - Empowering students through collaborative learning
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              A student-powered community where knowledge flows freely
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
