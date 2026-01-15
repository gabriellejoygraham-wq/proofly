import { Search } from 'lucide-react';

export default function LandingPage({ inputText, setInputText, onAnalyze }) {
  const exampleClaim = `Serial entrepreneur with 3 successful exits. Former VP of Growth at TechCorp. Featured in Forbes and TechCrunch. Built and scaled multiple 7-figure businesses. Stanford MBA. Advisor to 20+ startups.`;

  const handleSubmit = () => {
    if (inputText.trim().length > 10) {
      onAnalyze(inputText);
    }
  };

  const handleTryExample = () => {
    setInputText(exampleClaim);
    onAnalyze(exampleClaim);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16 sm:px-8 lg:px-12">
        
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Search className="w-6 h-6 text-slate-700" strokeWidth={1.5} />
            <h1 className="text-2xl font-medium text-slate-900">Proofly</h1>
          </div>
          <p className="text-lg text-slate-600 max-w-xl">
            Credibility analysis for any claim.
          </p>
        </div>

        <div className="mb-12">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste text to analyze"
            className="w-full h-48 p-5 border border-slate-200 rounded-sm focus:border-slate-400 focus:outline-none resize-none text-slate-800 text-base leading-relaxed"
            maxLength={2000}
          />
          
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-slate-400">
              {inputText.length} / 2000
            </span>
            <button
              onClick={handleSubmit}
              disabled={inputText.trim().length < 10}
              className="px-6 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-sm hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              Analyze
            </button>
          </div>
        </div>

        <div className="mb-16">
          <button
            onClick={handleTryExample}
            className="text-slate-500 hover:text-slate-700 text-sm font-medium"
          >
            Try example
          </button>
        </div>

        <div className="border-t border-slate-100 pt-12 space-y-8">
          <div>
            <h3 className="text-sm font-medium text-slate-900 mb-2">How it works</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Paste any bio or claim. We extract individual statements and assess what can be verified publicly.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-slate-900 mb-2">What you get</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              A confidence score and breakdown showing what's verifiable, what's uncertain, and what lacks public evidence.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-900 mb-2">What this is not</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              This is not a truth detector. Absence of evidence does not mean something is false. Private achievements cannot always be verified.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}