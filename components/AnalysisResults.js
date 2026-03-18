import { Search, Share2, ChevronDown, ChevronUp, Copy, Download } from 'lucide-react';
import { useState } from 'react';
import { shareViaWebAPI, copyToClipboard, generateShareText } from '../lib/shareUtils';
import ShareCard from './ShareCard';

export default function AnalysisResults({ analysis, onReset }) {
  const [showDetails, setShowDetails] = useState(false);
  const [shareStatus, setShareStatus] = useState('');

  const handleShare = async () => {
    // Try Web Share API first
    const shared = await shareViaWebAPI(analysis);
    
    if (!shared) {
      // Fallback to copy
      const shareText = generateShareText(analysis);
      const copied = await copyToClipboard(shareText);
      
      if (copied) {
        setShareStatus('Copied to clipboard!');
        setTimeout(() => setShareStatus(''), 2000);
      }
    }
  };

  const handleCopyLink = async () => {
    const copied = await copyToClipboard(window.location.href);
    if (copied) {
      setShareStatus('Link copied!');
      setTimeout(() => setShareStatus(''), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-200 sticky top-0 bg-white z-10">
        <div className="flex items-center justify-between">
          <button
            onClick={onReset}
            className="text-sm font-semibold text-slate-600 hover:text-slate-900"
          >
            ← New Check
          </button>
          <div className="flex items-center gap-1.5">
            <Search className="w-4 h-4 text-slate-700" strokeWidth={2} />
            <span className="text-sm font-bold text-slate-900">Proofly</span>
          </div>
          <div className="w-20"></div>
        </div>
      </div>

      {/* Results Content */}
      <div className="flex-1 px-4 py-6">
        
        {/* Claim Type Badge */}
        {analysis.claimType && (
          <div className="mb-4 flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-lg w-fit">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              {analysis.claimType.type} Claim
            </span>
          </div>
        )}
        
        {/* Score Card - Screenshot Optimized */}
        <div className="mb-5 p-6 bg-slate-50 border-2 border-slate-300 rounded-2xl shadow-sm">
          <div className="text-center mb-4">
            <div className="text-7xl font-light text-slate-900 mb-2">
              {analysis.overallScore}
            </div>
            <div className="text-base font-bold text-slate-700 mb-4">
              {analysis.scoreLabel}
            </div>
          </div>

          {/* Red Flags */}
          {analysis.redFlags && analysis.redFlags.length > 0 && (
            <div className="mb-4 p-3 bg-white rounded-lg border border-slate-200">
              <p className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                🚩 Red Flags
              </p>
              <div className="space-y-1.5">
                {analysis.redFlags.map((flag, idx) => (
                  <p key={idx} className="text-sm text-slate-700 leading-snug">
                    {flag}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Key Findings */}
          <div className="space-y-2 mb-4">
            {analysis.topFindings.map((finding, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 flex-shrink-0"></div>
                <p className="text-sm text-slate-700 leading-snug">{finding}</p>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-slate-500 text-center border-t border-slate-200 pt-3">
            Based on public verifiability • Not financial or legal advice
          </p>
        </div>

        {/* Share Status */}
        {shareStatus && (
          <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-lg text-center">
            <p className="text-sm font-medium text-green-800">{shareStatus}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            onClick={handleShare}
            className="py-3.5 bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
          <button
            onClick={onReset}
            className="py-3.5 bg-slate-900 text-white font-bold rounded-xl active:scale-95 transition-all shadow-lg"
          >
            Check Another
          </button>
        </div>

        {/* Expandable Details */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full py-3 px-4 bg-white border-2 border-slate-200 rounded-xl flex items-center justify-between hover:border-slate-400 transition-colors"
        >
          <span className="text-sm font-bold text-slate-900">
            {showDetails ? 'Hide' : 'Show'} detailed breakdown
          </span>
          {showDetails ? (
            <ChevronUp className="w-5 h-5 text-slate-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-600" />
          )}
        </button>

        {/* Detailed Breakdown */}
        {showDetails && (
          <div className="mt-4 space-y-4">
            
            {/* Original Claim */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">
                Original Claim
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                "{analysis.text}"
              </p>
            </div>

            {/* Individual Claims */}
            <div>
              <p className="text-xs font-bold text-slate-700 mb-3 uppercase tracking-wide">
                Claim-by-Claim Analysis
              </p>
              <div className="space-y-3">
                {analysis.claims.map((claim, idx) => (
                  <div key={idx} className={`border-l-3 ${claim.borderColor} pl-4 py-3 bg-white rounded-r-lg`}>
                    <div className="mb-2 flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-bold ${claim.color} uppercase tracking-wide`}>
                        {claim.label}
                      </span>
                      {claim.pattern && (
                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {claim.pattern}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-bold text-slate-900 mb-2">
                      "{claim.claim}"
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {claim.finding}
                    </p>
                    {claim.sources && claim.sources.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {claim.sources.map((source, sidx) => (
                          <span key={sidx} className="text-xs text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded">
                            {source}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Language Patterns */}
            {analysis.languageFlags && analysis.languageFlags.length > 0 && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-xs font-bold text-amber-900 mb-3 uppercase tracking-wide">
                  ⚠️ Language Patterns Detected
                </p>
                <ul className="space-y-2">
                  {analysis.languageFlags.map((flag, idx) => (
                    <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">•</span>
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="px-4 py-4 border-t border-slate-200 bg-slate-50">
        <p className="text-xs text-slate-600 text-center font-medium mb-2">
          Spot BS before you believe it
        </p>
        <p className="text-xs text-slate-500 text-center">
          Private achievements cannot always be verified
        </p>
      </div>
    </div>
  );
}