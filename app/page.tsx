'use client';

import { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import AnalyzingState from '@/components/AnalyzingState';
import AnalysisResults from '@/components/AnalysisResults';

export default function Home() {
  const [view, setView] = useState('landing');
  const [inputText, setInputText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = async (text) => {
    setAnalyzing(true);
    setView('analyzing');
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
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
  };

  if (view === 'landing') {
    return (
      <LandingPage
        inputText={inputText}
        setInputText={setInputText}
        onAnalyze={handleAnalyze}
      />
    );
  }

  if (view === 'analyzing') {
    return <AnalyzingState />;
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