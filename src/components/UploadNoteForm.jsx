import React, { useState } from "react";
import { supabaseNotes } from "../lib/supabase_notes";
import { FileText } from "lucide-react";

const UploadNoteForm = ({ onUploadSuccess }) => {
  const [uploadedBy, setUploadedBy] = useState("");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [semester, setSemester] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const SUBJECTS_BY_SEMESTER = {
    1: ["Mathematics I", "Physics", "Chemistry", "Engineering Drawing", "Programming Fundamentals"],
    2: ["Mathematics II", "Electronics", "Mechanics", "Environmental Science", "Data Structures"],
    3: ["Mathematics III", "Digital Logic", "Computer Architecture", "Database Systems", "Operating Systems"],
    4: ["Algorithms", "Software Engineering", "Computer Networks", "Theory of Computation", "Web Development"],
    5: ["Artificial Intelligence", "Machine Learning", "Compiler Design", "Mobile Computing", "Cloud Computing"],
    6: ["Distributed Systems", "Cybersecurity", "IoT", "Blockchain", "Project Management"],
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!uploadedBy || !file || !subject) {
      setError("Please enter your name/enrollment, subject, and select a file.");
      return;
    }

    try {
      setUploading(true);
      setError("");

      const fileExt = file.name.split(".").pop();
      const fileName = file.name;
      const fileSize = file.size;
      const uniqueFileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${semester || "General"}/${subject}/${uniqueFileName}`;

      const { error: uploadError } = await supabaseNotes.storage
        .from("notes")
        .upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: urlData } = supabaseNotes.storage.from("notes").getPublicUrl(filePath);
      const publicUrl = urlData.publicUrl;

      const { data: newNote, error: dbError } = await supabaseNotes
        .from("notes")
        .insert([
          {
            uploaded_by: uploadedBy,
            title: title || fileName,
            subject,
            semester: semester || null,
            file_name: fileName,
            file_size: fileSize,
            file_path: filePath,
            public_url: publicUrl,
          },
        ])
        .select()
        .single();

      if (dbError) throw dbError;

      setUploadedBy("");
      setTitle("");
      setSubject("");
      setSemester("");
      setFile(null);

      if (onUploadSuccess) onUploadSuccess(newNote);
      alert("File uploaded successfully!");
    } catch (err) {
      console.error(err);
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 mb-6 transition-colors">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Upload Notes</h2>

      {error && (
        <p className="text-red-600 dark:text-red-400 text-sm mb-3">{error}</p>
      )}

      <form onSubmit={handleUpload} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Enrollment Number
          </label>
          <input
            type="text"
            placeholder="Enrollment No"
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-700 outline-none transition-all"
            value={uploadedBy}
            onChange={(e) => setUploadedBy(e.target.value)}
            required
          />
        </div>

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
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-700 outline-none transition-all"
          >
            <option value="">Select a semester</option>
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
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-700 outline-none transition-all"
            required
          >
            <option value="">Select a subject</option>
            {SUBJECTS_BY_SEMESTER[semester]?.map((subj) => (
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
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-700 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Upload File
          </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 dark:file:bg-blue-900 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-800 cursor-pointer transition-all"
            required
          />

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
};

export default UploadNoteForm;
