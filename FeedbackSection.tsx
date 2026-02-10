
import React, { useState } from 'react';
import { MessageSquareText, Send, CheckCircle2 } from 'lucide-react';
import { FeedbackEntry } from '../types';

interface FeedbackSectionProps {
  onFeedbackSubmit: (feedback: Omit<FeedbackEntry, 'id' | 'timestamp'>) => void;
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({ onFeedbackSubmit }) => {
  const [type, setType] = useState<'issue' | 'suggestion'>('suggestion');
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    onFeedbackSubmit({
      type,
      comment,
      userName: name || 'Anonymous'
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setComment('');
      setName('');
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center animate-in fade-in zoom-in duration-300">
        <div className="bg-emerald-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-white">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h4 className="font-bold text-emerald-800">Feedback Received!</h4>
        <p className="text-sm text-emerald-600">Your contribution helps the river flow smoother.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquareText className="w-5 h-5 text-sky-500" />
        <h3 className="text-lg font-bold text-slate-800">Improve the Grid</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex p-1 bg-slate-100 rounded-lg">
          <button
            type="button"
            onClick={() => setType('suggestion')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
              type === 'suggestion' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-500'
            }`}
          >
            Suggestion
          </button>
          <button
            type="button"
            onClick={() => setType('issue')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
              type === 'issue' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500'
            }`}
          >
            Report Issue
          </button>
        </div>

        <input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
        />

        <textarea
          placeholder="Share your thoughts or report an issue..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          rows={3}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all resize-none"
        />

        <button
          type="submit"
          disabled={!comment.trim()}
          className="w-full bg-slate-800 text-white font-bold py-2.5 rounded-xl hover:bg-slate-900 transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
        >
          <Send className="w-4 h-4" /> Send Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackSection;
