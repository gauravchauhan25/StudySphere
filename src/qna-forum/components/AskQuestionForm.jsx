import { useState } from 'react';
import { MessageSquarePlus } from 'lucide-react';

const CATEGORIES = ['General', 'Technical', 'Academic', 'Career', 'Projects', 'Others'];

export default function AskQuestionForm({ onQuestionSubmit }) {
  const [formData, setFormData] = useState({
    userName: '',
    enrollmentNo: '',
    questionText: '',
    category: 'General',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.userName.trim() || !formData.enrollmentNo.trim() || !formData.questionText.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await onQuestionSubmit(formData);
      setFormData({
        userName: '',
        enrollmentNo: '',
        questionText: '',
        category: 'General',
      });
    } catch (err) {
      setError('Failed to submit question. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 rounded-lg">
          <MessageSquarePlus className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">Ask a Question</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="userName"
            value={formData.userName}
            onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            placeholder="Enter your full name"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="enrollmentNo" className="block text-sm font-medium text-gray-700 mb-1">
            Enrollment Number
          </label>
          <input
            type="text"
            id="enrollmentNo"
            value={formData.enrollmentNo}
            onChange={(e) => setFormData({ ...formData, enrollmentNo: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            placeholder="Enter your enrollment number"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white"
            disabled={isSubmitting}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="questionText" className="block text-sm font-medium text-gray-700 mb-1">
            Your Question
          </label>
          <textarea
            id="questionText"
            value={formData.questionText}
            onChange={(e) => setFormData({ ...formData, questionText: e.target.value })}
            rows="6"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
            placeholder="Describe your question in detail..."
            disabled={isSubmitting}
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Question'}
        </button>
      </form>
    </div>
  );
}
