import React from 'react';
import { Search } from 'lucide-react';

export default function ShareCard({ analysis }) {
  return (
    <div 
      id="share-card"
      className="w-full max-w-md mx-auto bg-white p-6 rounded-2xl border-2 border-slate-300"
      style={{ aspectRatio: '9/16' }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Search className="w-6 h-6 text-slate-900" strokeWidth={2} />
        <h1 className="text-xl font-bold text-slate-900">Proofly</h1>
      </div>

      {/* Score */}
      <div className="text-center mb-6">
        <div className="text-8xl font-light text-slate-900 mb-2">
          {analysis.overallScore}
        </div>
        <div className="text-lg font-bold text-slate-700">
          {analysis.scoreLabel}
        </div>
      </div>

      {/* Claim */}
      <div className="mb-6 p-4 bg-slate-50 rounded-lg">
        <p className="text-sm text-slate-700 line-clamp-3">
          "{analysis.text}"
        </p>
      </div>

      {/* Red Flags */}
      {analysis.redFlags && (
        <div className="mb-6">
          <p className="text-sm font-bold text-slate-900 mb-2">Red Flags:</p>
          <div className="space-y-1">
            {analysis.redFlags.slice(0, 3).map((flag, idx) => (
              <p key={idx} className="text-sm text-slate-700">{flag}</p>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-slate-200">
        <p className="text-xs text-slate-500 text-center">
          Check claims at proofly.app
        </p>
      </div>
    </div>
  );
}