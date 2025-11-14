import { useState } from "react";
import { Upload, FileText } from "lucide-react";
import { supabase } from "../lib/supabase";
import { SUBJECTS_BY_SEMESTER } from "../types/note";

export default function UploadNoteForm({ onUploadSuccess }) {
  const [semester, setSemester] = useState(1);
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
        "image/png",
        "image/jpeg",
        "image/jpg",
      ];

      if (!allowedTypes.includes(selectedFile.type)) {
        setError("Please upload PDF, DOCX, or image files only");
        setFile(null);
        return;
      }

      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        setFile(null);
        return;
      }

      setFile(selectedFile);
      setError("");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    alert("Upload feature Add krna");
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 transition-colors">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <Upload className="w-6 h-6 text-blue-600 dark:text-blue-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Upload Notes
        </h2>
      </div>

      <form onSubmit={handleUpload} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Semester
          </label>
          <select
            value={semester}
            onChange={(e) => {
              setSemester(Number(e.target.value));
              setSubject("");
            }}
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-700 outline-none transition-all"
          >
            {[1, 2, 3, 4, 5, 6].map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Subject
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-700 outline-none transition-all"
            required
          >
            <option value="">Select a subject</option>
            {SUBJECTS_BY_SEMESTER[semester].map((subj) => (
              <option key={subj} value={subj}>
                {subj}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Title or Description (Optional)
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Chapter 5 Summary Notes"
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-700 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Upload File
          </label>
          <div className="relative">
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-700 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 dark:file:bg-blue-900 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-800 cursor-pointer"
              required
            />
          </div>

          {file && (
            <div className="mt-3 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <FileText className="w-4 h-4" />
              <span>
                {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </span>
            </div>
          )}

          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Supported formats: PDF, DOCX, PNG, JPG (Max 10MB)
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-700 dark:text-red-300 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={uploading || !file || !subject}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-700 dark:to-cyan-700 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 dark:hover:from-blue-800 dark:hover:to-cyan-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
        >
          {uploading ? "Uploading..." : "Upload Note"}
        </button>
      </form>
    </div>
  );
}
