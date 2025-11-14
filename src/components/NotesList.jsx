import { useState, useEffect } from "react";
import { FileText, Download, Eye, Calendar, Book, Trash2 } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function NotesList({ refreshTrigger }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterSemester, setFilterSemester] = useState("all");
  const [filterSubject, setFilterSubject] = useState("all");
  const [currentUserId, setCurrentUserId] = useState(null);

  const uniqueSubjects = Array.from(
    new Set(notes.map((note) => note.subject))
  ).sort();

  useEffect(() => {
    getCurrentUser();
    fetchNotes();
  }, [refreshTrigger]);

  const getCurrentUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setCurrentUserId(user?.id || null);
  };

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (note) => {
    try {
      const { data, error } = await supabase.storage
        .from("notes")
        .download(note.file_path);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = note.file_name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Failed to download file");
    }
  };

  const handleView = async (note) => {
    try {
      const { data } = supabase.storage
        .from("notes")
        .getPublicUrl(note.file_path);

      window.open(data.publicUrl, "_blank");
    } catch (error) {
      console.error("Error viewing file:", error);
    }
  };

  const handleDelete = async (note) => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    try {
      const { error: storageError } = await supabase.storage
        .from("notes")
        .remove([note.file_path]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from("notes")
        .delete()
        .eq("id", note.id);

      if (dbError) throw dbError;

      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Failed to delete note");
    }
  };

  const filteredNotes = notes.filter((note) => {
    if (filterSemester !== "all" && note.semester !== filterSemester)
      return false;
    if (filterSubject !== "all" && note.subject !== filterSubject) return false;
    return true;
  });

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-100 dark:bg-cyan-900 rounded-lg">
            <FileText className="w-6 h-6 text-cyan-600 dark:text-cyan-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Shared Notes
          </h2>
        </div>
        <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
          {filteredNotes.length} notes
        </span>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">
            Filter by Semester
          </label>
          <select
            value={filterSemester}
            onChange={(e) =>
              setFilterSemester(
                e.target.value === "all" ? "all" : Number(e.target.value)
              )
            }
            className="px-4 py-2 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 rounded-lg focus:border-blue-500 outline-none transition-all"
          >
            <option value="all">All Semesters</option>
            {[1, 2, 3, 4, 5, 6].map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">
            Filter by Subject
          </label>
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="px-4 py-2 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 rounded-lg focus:border-blue-500 outline-none transition-all"
          >
            <option value="all">All Subjects</option>
            {uniqueSubjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredNotes.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-300 text-lg">
            No notes available
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
            Be the first to share your notes!
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="border-2 border-gray-100 dark:border-gray-700 rounded-lg p-5 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">
                    {note.title}
                  </h3>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                    <div className="flex items-center gap-1">
                      <Book className="w-4 h-4" />
                      <span className="font-medium">{note.subject}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded font-semibold text-xs">
                        Semester {note.semester}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(note.created_at)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <FileText className="w-4 h-4" />
                    <span>{note.file_name}</span>
                    <span className="text-gray-400 dark:text-gray-600">•</span>
                    <span>{formatFileSize(note.file_size)}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleView(note)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>

                  <button
                    onClick={() => handleDownload(note)}
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-600 dark:bg-cyan-700 text-white rounded-lg hover:bg-cyan-700 dark:hover:bg-cyan-800 transition-colors font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>

                  {currentUserId === note.uploaded_by && (
                    <button
                      onClick={() => handleDelete(note)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-800 transition-colors font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
