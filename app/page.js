'use client';

import { useState, useEffect } from 'react';
import LandingPage from '../components/LandingPage';
import AnalyzingState from '../components/AnalyzingState';
import AnalysisResults from '../components/AnalysisResults';
import { detectClaimType } from '../lib/claimDetection';

export default function Home() {
  const [view, setView] = useState('landing');
  const [inputText, setInputText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [detectedType, setDetectedType] = useState(null);
  const [clipboardText, setClipboardText] = useState('');
  const [showClipboardPrompt, setShowClipboardPrompt] = useState(false);

  // Check clipboard on mount (mobile-friendly)
  useEffect(() => {
    const checkClipboard = async () => {
      try {
        // Only check if no text entered yet
        if (!inputText && view === 'landing') {
          // Simple check - don't actually read yet
          setShowClipboardPrompt(true);
        }
      } catch (err) {
        console.log('Clipboard not available');
      }
    };

    checkClipboard();
  }, [view]);

  // Detect claim type as user types
  useEffect(() => {
    if (inputText.length > 20) {
      setDetectedType(detectClaimType(inputText));
    } else {
      setDetectedType(null);
    }
  }, [inputText]);

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputText(text);
        setShowClipboardPrompt(false);
      }
    } catch (err) {
      console.error('Failed to read clipboard:', err);
      setShowClipboardPrompt(false);
    }
  };

  const handleAnalyze = async (text) => {
    setAnalyzing(true);
    setView('analyzing');
    
    try {
      const claimType = detectClaimType(text);
      
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text,
          claimType: claimType?.type 
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setAnalysis(data);
      setView('results');
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Analysis failed. Please try again.');
      setView('landing');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleReset = () => {
    setView('landing');
    setInputText('');
    setAnalysis(null);
    setDetectedType(null);
  };

  if (view === 'landing') {
    return (
      <LandingPage
        inputText={inputText}
        setInputText={setInputText}
        onAnalyze={handleAnalyze}
        detectedType={detectedType}
        showClipboardPrompt={showClipboardPrompt}
        onPasteFromClipboard={handlePasteFromClipboard}
        onDismissClipboard={() => setShowClipboardPrompt(false)}
      />
    );
  }

  if (view === 'analyzing') {
    return <AnalyzingState detectedType={detectedType} />;
  }

  if (view === 'results' && analysis) {
    return (
      <AnalysisResults
        analysis={analysis}
        onReset={handleReset}
      />
    );
  }

  return null;
}