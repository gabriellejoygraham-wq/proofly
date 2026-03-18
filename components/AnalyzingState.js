import { useState, useEffect } from 'react';
import { DollarSign, Heart, Briefcase, TrendingUp } from 'lucide-react';

const iconMap = {
  DollarSign,
  Heart,
  Briefcase,
  TrendingUp
};

export default function AnalyzingState({ detectedType }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 90) {
          clearInterval(interval);
          return 90;
        }
        return p + 8;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const DetectedIcon = detectedType ? iconMap[detectedType.icon] : null;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        
        {/* Type Badge */}
        {detectedType && DetectedIcon && (
          <div className="mb-6 flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 rounded-full">
            <DetectedIcon className="w-4 h-4 text-slate-700" />
            <span className="text-sm font-semibold text-slate-700">
              {detectedType.type === 'money' && 'Checking income claims'}
              {detectedType.type === 'health' && 'Checking health claims'}
              {detectedType.type === 'authority' && 'Checking credentials'}
              {detectedType.type === 'influencer' && 'Checking achievements'}
              {!detectedType.type && 'Analyzing claim'}
            </span>
          </div>
        )}
        
        {/* Spinner */}
        <div className="w-12 h-12 border-3 border-slate-200 border-t-slate-900 rounded-full animate-spin mx-auto mb-6"></div>
        
        {/* Progress */}
        <div className="mb-4">
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-slate-900 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Status Text */}
        <p className="text-center text-sm font-medium text-slate-600 mb-2">
          {progress < 30 && 'Analyzing claim patterns...'}
          {progress >= 30 && progress < 60 && 'Searching for evidence...'}
          {progress >= 60 && progress < 90 && 'Checking sources...'}
          {progress >= 90 && 'Generating report...'}
        </p>
        
        {detectedType && (
          <p className="text-center text-xs text-slate-500">
            Looking for: {detectedType.signals.join(', ')}
          </p>
        )}
      </div>
    </div>
  );
}