import { useEffect, useState } from "react";
import { supabaseNotes } from "../lib/supabase_notes";
import { Search, FileText, Eye, Download } from "lucide-react";

export default function NotesList() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [loading, setLoading] = useState(true);

  // ---------- FETCH NOTES ----------
  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      const { data, error } = await supabaseNotes
        .from("notes")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) {
        setNotes(data);
        setFilteredNotes(data);
      }
      setLoading(false);
    };

    fetchNotes();
  }, []);

  // ---------- APPLY FILTERS ----------
  useEffect(() => {
    let filtered = notes;

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (note) =>
          note.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.uploaded_by?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedSemester) {
      filtered = filtered.filter(
        (note) => Number(note.semester) === Number(selectedSemester)
      );
    }

    if (selectedSubject) {
      filtered = filtered.filter((note) => note.subject === selectedSubject);
    }

    setFilteredNotes(filtered);
  }, [searchQuery, selectedSemester, selectedSubject, notes]);

  // ---------- DOWNLOAD FUNCTION ----------
  const handleDownload = async (url, fileName) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Download failed:", err);
      alert("Download failed. Try again.");
    }
  };

  return (
  <div className="pr-2">

    {/* ---------- SEARCH + FILTERS ---------- */}
    <div className="flex flex-col md:flex-row gap-4 mb-8">

      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by title, subject, or uploaded by..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg 
          bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      </div>

      {/* Semester Filter */}
      <select
        className="px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg 
        bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 
        focus:ring-2 focus:ring-blue-500 transition-all"
        value={selectedSemester}
        onChange={(e) => {
          setSelectedSemester(e.target.value);
          setSelectedSubject("");
        }}
      >
        <option value="">All Semesters</option>
        {[1, 2, 3, 4, 5, 6].map((sem) => (
          <option key={sem} value={sem}>
            Semester {sem}
          </option>
        ))}
      </select>

      {/* Subject Filter */}
      <select
        className="px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg 
        bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 
        focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-40"
        value={selectedSubject}
        onChange={(e) => setSelectedSubject(e.target.value)}
        disabled={!selectedSemester}
      >
        <option value="">All Subjects</option>
        {selectedSemester &&
          [...new Set(
            notes
              .filter((n) => n.semester === Number(selectedSemester))
              .map((n) => n.subject)
          )].map((subj) => (
            <option key={subj} value={subj}>
              {subj}
            </option>
          ))}
      </select>
    </div>

    {/* ---------- LOADING UI ---------- */}
    {loading && (
      <p className="text-center text-gray-500 dark:text-gray-300 animate-pulse">
        Loading notes...
      </p>
    )}

    {/* ---------- NO NOTES FOUND ---------- */}
    {!loading && filteredNotes.length === 0 && (
      <p className="text-center text-gray-500 dark:text-gray-300">
        No notes found.
      </p>
    )}

    {/* ---------- NOTES GRID ---------- */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
      {filteredNotes.map((note) => (
        <div
          key={note.id}
          className="p-5 bg-white dark:bg-gray-900 rounded-xl shadow-sm 
          border border-gray-200 dark:border-gray-800 
          hover:shadow-lg hover:-translate-y-1 transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <FileText className="w-6 h-6 text-blue-700 dark:text-blue-300" />
            </div>
            <h3
              className="font-semibold text-lg text-gray-900 dark:text-gray-200 truncate"
              title={note.title}
            >
              {note.title || "Untitled Note"}
            </h3>
          </div>

          <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <p><strong>Uploaded By:</strong> {note.uploaded_by}</p>
            <p><strong>Semester:</strong> {note.semester || "-"}</p>
            <p><strong>Subject:</strong> {note.subject}</p>
            <p><strong>File Size:</strong> {(note.file_size / 1024).toFixed(2)} KB</p>
          </div>

          <div className="flex gap-2 mt-4">
            {/* View button */}
            <a
              href={note.public_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 
              bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg 
              font-medium transition-all"
            >
              <Eye className="w-5 h-5" /> View
            </a>

            {/* Download button */}
            <button
              onClick={() => handleDownload(note.public_url, note.file_name)}
              className="flex-1 flex items-center justify-center gap-2 
              bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg 
              font-medium transition-all"
            >
              <Download className="w-5 h-5" /> Download
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

}
