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
      {/* HEADER SECTION */}
      <section className="px-6 pt-10 md:pt-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white leading-tight">
          Upload • Share • Learn Together
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Share semester-wise study notes and help thousands of learners accelerate their studies.
        </p>
      </section>

      {/* TWO-COLUMN SECTION */}
      <div className="container mx-auto px-6 mt-12 mb-20 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Upload Form */}
        <div className="lg:col-span-1">
          <UploadNoteForm onUploadSuccess={handleUploadSuccess} />
        </div>

        {/* Notes List */}
        <div className="lg:col-span-2">
          <NotesList refreshTrigger={refreshTrigger} />
        </div>
      </div>

      

      {/* FOOTER */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-8 text-center">
        <p className="text-gray-700 dark:text-gray-300 font-medium">
          StudySphere — Powered by Students, for Students
        </p>
        <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
          Together we learn. Together we grow.
        </p>
      </footer>
    </>
  );
}
