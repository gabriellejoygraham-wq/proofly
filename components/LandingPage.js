import { Search, Clipboard, AlertCircle, DollarSign, Heart, Briefcase, TrendingUp } from 'lucide-react';

const iconMap = {
  DollarSign,
  Heart,
  Briefcase,
  TrendingUp
};

export default function LandingPage({ 
  inputText, 
  setInputText, 
  onAnalyze,
  detectedType,
  showClipboardPrompt,
  onPasteFromClipboard,
  onDismissClipboard
}) {
  
  const presets = [
    { 
      icon: '💰', 
      label: 'Money guru', 
      example: 'I made $47k in 30 days with my proven system. Former Fortune 500 executive. Helped 10,000+ clients achieve financial freedom.',
      color: 'emerald'
    },
    { 
      icon: '🏥', 
      label: 'Health miracle', 
      example: 'This natural remedy cured my chronic pain in 2 weeks. Doctor recommended. Zero side effects. Helped thousands.',
      color: 'rose'
    },
    { 
      icon: '⭐', 
      label: 'Success story', 
      example: 'Featured in Forbes and TechCrunch. Built 3 successful 7-figure businesses. Helped over 5,000 entrepreneurs scale.',
      color: 'purple'
    },
    { 
      icon: '💼', 
      label: 'Expert coach', 
      example: 'Certified life coach with 10+ years experience. Transformed 2,000+ lives. Award-winning methodology.',
      color: 'blue'
    }
  ];

  const handleSubmit = () => {
    if (inputText.trim().length > 10) {
      onAnalyze(inputText);
    }
  };

  const DetectedIcon = detectedType ? iconMap[detectedType.icon] : null;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      
      {/* Header with Positioning */}
      <div className="px-4 pt-8 pb-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="flex items-center gap-2 mb-3">
          <Search className="w-6 h-6 text-slate-900" strokeWidth={2} />
          <h1 className="text-2xl font-bold text-slate-900">Proofly</h1>
        </div>
        <p className="text-base text-slate-700 font-semibold mb-1">
          Built for social media claims
        </p>
        <p className="text-sm text-slate-500">
          Check influencer bios, health advice, money claims
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 pb-4">
        
        {/* Clipboard Prompt */}
        {showClipboardPrompt && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clipboard className="w-4 h-4 text-blue-700" />
                <span className="text-sm font-medium text-blue-900">Found text on clipboard</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={onDismissClipboard}
                  className="px-2 py-1 text-xs text-blue-700 hover:text-blue-900"
                >
                  Dismiss
                </button>
                <button
                  onClick={onPasteFromClipboard}
                  className="px-3 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-lg active:scale-95 transition-all"
                >
                  Paste
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="mb-3">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste a claim from TikTok, Instagram, anywhere..."
            className="w-full h-32 p-4 border-2 border-slate-300 rounded-xl focus:border-slate-500 focus:outline-none resize-none text-base text-slate-800 placeholder:text-slate-400"
            maxLength={2000}
          />
          <div className="flex items-center justify-between mt-2 px-1">
            <span className="text-xs text-slate-400">
              {inputText.length}/2000
            </span>
          </div>
        </div>

        {/* Smart Detection Badge */}
        {detectedType && DetectedIcon && (
          <div className="mb-4 p-3 bg-slate-50 border-2 border-slate-200 rounded-xl">
            <div className="flex items-start gap-2">
              <DetectedIcon className="w-5 h-5 text-slate-700 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900 mb-1">
                  {detectedType.label}
                </p>
                <p className="text-xs text-slate-600">
                  Will check: {detectedType.signals.join(' • ')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Big Check Button */}
        <button
          onClick={handleSubmit}
          disabled={inputText.trim().length < 10}
          className="w-full py-4 bg-slate-900 text-white text-lg font-bold rounded-xl hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all active:scale-95 shadow-lg disabled:shadow-none mb-6"
        >
          Check Claim
        </button>

        {/* What We Check For */}
        <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <p className="text-xs font-bold text-slate-700 mb-3 uppercase tracking-wide">
            What Proofly Detects
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-slate-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-slate-600">Exaggerated income claims ($X in Y days)</p>
            </div>
            <div className="flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-slate-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-slate-600">Vague proof language ("proven system", "many clients")</p>
            </div>
            <div className="flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-slate-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-slate-600">Unverifiable authority ("expert", "certified")</p>
            </div>
            <div className="flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-slate-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-slate-600">Inflated numbers without evidence (10,000+ clients)</p>
            </div>
          </div>
        </div>

        {/* Quick Examples */}
        <div>
          <p className="text-xs font-bold text-slate-700 mb-3 px-1 uppercase tracking-wide">
            Try Common Scams
          </p>
          <div className="grid grid-cols-2 gap-2">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => setInputText(preset.example)}
                className="p-3 bg-white border-2 border-slate-200 rounded-xl text-left hover:border-slate-400 active:scale-95 transition-all"
              >
                <div className="text-2xl mb-2">{preset.icon}</div>
                <div className="text-xs font-bold text-slate-900 mb-1">{preset.label}</div>
                <div className="text-xs text-slate-500 line-clamp-2">{preset.example}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Tagline */}
      <div className="px-4 py-4 border-t border-slate-100 bg-slate-50">
        <p className="text-xs text-slate-600 text-center font-medium">
          Stop falling for internet BS
        </p>
      </div>
    </div>
  );
}