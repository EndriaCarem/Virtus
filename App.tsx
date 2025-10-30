
// fix: Implement the main App component to structure the application layout and manage state.
import React, { useState } from 'react';
import Header from './components/Header';
import DocumentInput from './components/DocumentInput';
import CopilotPanel from './components/CopilotPanel';
import StarryBackground from './components/StarryBackground';
import { analyzeWithCopilot } from './services/microsoftCopilotService';
import type { AnalysisResult } from './types';

const App: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (text: string) => {
    if (!text.trim()) {
      setError("Por favor, insira o texto do documento para análise.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeWithCopilot(text);
      setAnalysisResult(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Ocorreu um erro desconhecido.";
      setError(`Falha na análise: ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen text-gray-900 dark:text-gray-100 font-sans">
      {/* Dynamic Backgrounds */}
      <div className="light-theme-bg dark:hidden">
        <div className="yellow-dot"></div>
      </div>
      <div className="hidden dark:block">
        <StarryBackground />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full px-4 sm:px-6 lg:px-8">
        <Header />
        <main className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 mt-8">
          <div className="lg:w-1/2">
            <DocumentInput onAnalyze={handleAnalyze} isLoading={isLoading} />
          </div>
          <div className="lg:w-1/2">
            <CopilotPanel 
              result={analysisResult} 
              isLoading={isLoading} 
              error={error}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
