import { useState } from 'react';
import { ThumbsUp, MessageCircle, User, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import AnswerForm from './AnswerForm';

export default function QuestionCard({ question, userEnrollment, onVote, onUnvote, onAnswerSubmit, userVotedQuestions }) {
  const [showAnswers, setShowAnswers] = useState(false);
  const [showAnswerForm, setShowAnswerForm] = useState(false);

  const hasVoted = userVotedQuestions.includes(question.id);
  const answerCount = question.answers?.length || 0;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleVoteClick = async () => {
    if (hasVoted) {
      await onUnvote(question.id);
    } else {
      await onVote(question.id);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      General: 'bg-gray-100 text-gray-700',
      Technical: 'bg-blue-100 text-blue-700',
      Academic: 'bg-green-100 text-green-700',
      Career: 'bg-orange-100 text-orange-700',
      Projects: 'bg-purple-100 text-purple-700',
      Others: 'bg-pink-100 text-pink-700',
    };
    return colors[category] || colors.General;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={handleVoteClick}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
              hasVoted
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={hasVoted ? 'Click to unvote' : 'Click to vote'}
          >
            <ThumbsUp className={`w-5 h-5 ${hasVoted ? 'fill-current' : ''}`} />
            <span className="text-sm font-semibold">{question.vote_count}</span>
          </button>
          <span className="text-xs text-gray-500">votes</span>
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getCategoryColor(question.category)}`}>
                  {question.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{question.question_text}</h3>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span>
                {question.user_name} ({question.enrollment_no})
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(question.created_at)}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>
                {answerCount} {answerCount === 1 ? 'Answer' : 'Answers'}
              </span>
              {answerCount > 0 && (showAnswers ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
            </button>

            <button
              onClick={() => setShowAnswerForm(!showAnswerForm)}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              {showAnswerForm ? 'Cancel' : 'Answer'}
            </button>
          </div>

          {showAnswerForm && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <AnswerForm
                questionId={question.id}
                onSubmit={async (answerData) => {
                  await onAnswerSubmit(answerData);
                  setShowAnswerForm(false);
                }}
                onCancel={() => setShowAnswerForm(false)}
              />
            </div>
          )}

          {showAnswers && answerCount > 0 && (
            <div className="mt-4 space-y-3">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Answers:</h4>
              {question.answers.map((answer) => (
                <div key={answer.id} className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-gray-800 mb-3">{answer.answer_text}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span className="font-medium">
                        {answer.user_name} ({answer.enrollment_no})
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(answer.created_at)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
