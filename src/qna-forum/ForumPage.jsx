import { useState, useEffect } from "react";
import { MessageSquare, Users } from "lucide-react";
import AskQuestionForm from "./components/AskQuestionForm";
import QuestionCard from "./components/QuestionCard";
import SearchAndFilter from "./components/SearchAndFilter";
import { forumService } from "./services/forumService";

function ForumPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEnrollment, setUserEnrollment] = useState("");
  const [userVotedQuestions, setUserVotedQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedEnrollment = localStorage.getItem("userEnrollment") || "";
    setUserEnrollment(storedEnrollment);
    loadQuestions();
    if (storedEnrollment) {
      loadUserVotes(storedEnrollment);
    }
  }, [selectedCategory, searchTerm]);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const data = await forumService.getQuestions(
        selectedCategory === "All" ? null : selectedCategory,
        searchTerm
      );
      setQuestions(data);
      setError("");
    } catch (err) {
      setError("Failed to load questions. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadUserVotes = async (enrollment) => {
    try {
      const votedQuestionIds = await forumService.getUserVotes(enrollment);
      setUserVotedQuestions(votedQuestionIds);
    } catch (err) {
      console.error("Failed to load user votes:", err);
    }
  };

  const handleQuestionSubmit = async (questionData) => {
    try {
      await forumService.addQuestion(questionData);
      if (!userEnrollment) {
        localStorage.setItem("userEnrollment", questionData.enrollmentNo);
        setUserEnrollment(questionData.enrollmentNo);
      }
      await loadQuestions();
    } catch (err) {
      throw err;
    }
  };

  const handleVote = async (questionId) => {
    if (!userEnrollment) {
      alert("Please submit a question or answer first to vote.");
      return;
    }

    try {
      const result = await forumService.voteQuestion(
        questionId,
        userEnrollment
      );
      if (result.alreadyVoted) {
        alert("You have already voted on this question.");
        return;
      }
      setUserVotedQuestions([...userVotedQuestions, questionId]);
      await loadQuestions();
    } catch (err) {
      alert("Failed to vote. Please try again.");
      console.error(err);
    }
  };

  const handleUnvote = async (questionId) => {
    if (!userEnrollment) {
      return;
    }

    try {
      await forumService.unvoteQuestion(questionId, userEnrollment);
      setUserVotedQuestions(
        userVotedQuestions.filter((id) => id !== questionId)
      );
      await loadQuestions();
    } catch (err) {
      alert("Failed to unvote. Please try again.");
      console.error(err);
    }
  };

  const handleAnswerSubmit = async (answerData) => {
    try {
      await forumService.addAnswer(answerData);
      if (!userEnrollment) {
        localStorage.setItem("userEnrollment", answerData.enrollmentNo);
        setUserEnrollment(answerData.enrollmentNo);
      }
      await loadQuestions();
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 rounded-xl">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Peer Q&A Discussion Forum</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Study Sphere - Collaborative Learning Platform
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <AskQuestionForm onQuestionSubmit={handleQuestionSubmit} />

              <div className="mt-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold">Community Stats</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Total Questions
                    </span>
                    <span className="text-lg font-bold text-blue-600">
                      {questions.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Total Answers
                    </span>
                    <span className="text-lg font-bold text-green-600">
                      {questions.reduce(
                        (sum, q) => sum + (q.answers?.length || 0),
                        0
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <SearchAndFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : questions.length === 0 ? (
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
                <MessageSquare className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Questions Yet</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {searchTerm || selectedCategory !== "All"
                    ? "No questions match your search criteria."
                    : "Be the first to ask a question!"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {questions.map((question) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    userEnrollment={userEnrollment}
                    onVote={handleVote}
                    onUnvote={handleUnvote}
                    onAnswerSubmit={handleAnswerSubmit}
                    userVotedQuestions={userVotedQuestions}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Study Sphere - Peer Q&A Discussion Forum | Open Access Learning
            Platform
          </p>
        </div>
      </footer>
    </div>
  );
}

export default ForumPage;
