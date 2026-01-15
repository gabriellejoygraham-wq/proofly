import { Search } from 'lucide-react';

export default function AnalysisResults({ analysis, onReset }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12 sm:px-8 lg:px-12">
        
        <div className="flex items-center justify-between mb-12 pb-8 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Search className="w-6 h-6 text-slate-700" strokeWidth={1.5} />
            <h1 className="text-2xl font-medium text-slate-900">Proofly</h1>
          </div>
          <button
            onClick={onReset}
            className="text-slate-500 hover:text-slate-700 text-sm font-medium"
          >
            New analysis
          </button>
        </div>

        <div className={`${analysis.scoreBg} border ${analysis.scoreBorder} rounded-sm p-8 mb-8`}>
          <div className="text-center mb-4">
            <div className="text-6xl font-light text-slate-900 mb-2">
              {analysis.overallScore}
            </div>
            <div className={`text-sm font-medium ${analysis.scoreColor}`}>
              {analysis.scoreLabel}
            </div>
          </div>
          <p className="text-xs text-slate-500 text-center max-w-md mx-auto">
            Confidence level reflects available signals, not intent.
          </p>
        </div>

        <div className="mb-8 p-6 bg-slate-50 border border-slate-100 rounded-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500 mb-3">Input</p>
          <p className="text-sm text-slate-700 leading-relaxed">
            {analysis.text}
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-sm font-medium text-slate-900 mb-6">Claims assessed</h2>
          <div className="space-y-4">
            {analysis.claims.map((claim, idx) => (
              <div key={idx} className={`border-l-2 ${claim.borderColor} pl-6 py-4`}>
                <div className="mb-2">
                  <span className={`text-xs font-medium ${claim.color} uppercase tracking-wide`}>
                    {claim.label}
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-900 mb-2">
                  {claim.claim}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  {claim.finding}
                </p>
                {claim.sources && claim.sources.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {claim.sources.map((source, sidx) => (
                      <span key={sidx} className="text-xs text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded-sm">
                        {source}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {analysis.languageFlags && analysis.languageFlags.length > 0 && (
          <div className="mb-8 p-6 bg-amber-50 border border-amber-100 rounded-sm">
            <h3 className="text-sm font-medium text-slate-900 mb-4">Language patterns</h3>
            <ul className="space-y-2">
              {analysis.languageFlags.map((flag, idx) => (
                <li key={idx} className="text-sm text-slate-700 leading-relaxed">
                  {flag}
                </li>
              ))}
            </ul>
          </div>
        )}

        {analysis.alternatives && analysis.alternatives.length > 0 && (
          <div className="mb-8 p-6 bg-slate-50 border border-slate-100 rounded-sm">
            <h3 className="text-sm font-medium text-slate-900 mb-4">Possible alternatives</h3>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              Based on the claims provided, these may be a better match.
            </p>
            <div className="space-y-4">
              {analysis.alternatives.map((alt, idx) => (
                <div key={idx} className="border-l-2 border-slate-200 pl-4">
                  <p className="text-sm font-medium text-slate-900 mb-1">
                    {alt.suggestion}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-2">
                    {alt.reason}
                  </p>
                  <span className="text-xs text-slate-500 uppercase tracking-wide">
                    {alt.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-8 border-t border-slate-100">
          <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
            This analysis shows what can be verified through public sources. Absence of evidence does not indicate falsification. Private achievements and confidential information cannot be assessed.
          </p>
        </div>
      </div>
    </div>
  );
}