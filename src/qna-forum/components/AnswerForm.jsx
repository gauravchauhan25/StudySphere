import { useState } from 'react';

export default function AnswerForm({ questionId, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    userName: '',
    enrollmentNo: '',
    answerText: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.userName.trim() || !formData.enrollmentNo.trim() || !formData.answerText.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        questionId,
        userName: formData.userName,
        enrollmentNo: formData.enrollmentNo,
        answerText: formData.answerText,
      });
      setFormData({
        userName: '',
        enrollmentNo: '',
        answerText: '',
      });
    } catch (err) {
      setError('Failed to submit answer. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h4 className="text-sm font-semibold text-gray-900">Submit Your Answer</h4>

      <div>
        <input
          type="text"
          value={formData.userName}
          onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm"
          placeholder="Your name"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <input
          type="text"
          value={formData.enrollmentNo}
          onChange={(e) => setFormData({ ...formData, enrollmentNo: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm"
          placeholder="Your enrollment number"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <textarea
          value={formData.answerText}
          onChange={(e) => setFormData({ ...formData, answerText: e.target.value })}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none text-sm"
          placeholder="Write your answer..."
          disabled={isSubmitting}
        />
      </div>

      {error && (
        <div className="p-2 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-xs text-red-600">{error}</p>
        </div>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Answer'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
