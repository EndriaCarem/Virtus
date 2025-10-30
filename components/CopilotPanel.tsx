
// fix: Implement the CopilotPanel to display results and states.
import React from 'react';
import type { AnalysisResult } from '../types';
import Loader from './Loader';
import SparklesIcon from './icons/SparklesIcon';

interface CopilotPanelProps {
  result: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
}

const CopilotPanel: React.FC<CopilotPanelProps> = ({ result, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center text-red-500 p-4">
          <h3 className="text-xl font-semibold">Erro na Análise</h3>
          <p className="mt-2">{error}</p>
        </div>
      );
    }

    if (result) {
      return (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
              <SparklesIcon className="w-5 h-5 mr-2 text-blue-500" />
              Texto Formatado
            </h3>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 max-h-60 overflow-y-auto">
              <p className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap">{result.formattedText}</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
              <SparklesIcon className="w-5 h-5 mr-2 text-green-500" />
              Sugestões de Conformidade
            </h3>
            <ul className="space-y-2 list-disc list-inside p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 max-h-60 overflow-y-auto">
              {result.suggestions.length > 0 ? (
                result.suggestions.map((suggestion, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-200">{suggestion}</li>
                ))
              ) : (
                <li className="text-gray-500 dark:text-gray-400">Nenhuma sugestão encontrada. O documento parece estar em conformidade.</li>
              )}
            </ul>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
         <SparklesIcon className="w-16 h-16 mb-4 text-gray-400" />
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Aguardando Documento</h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Insira o texto do seu documento e clique em "Analisar" para ver a mágica acontecer.</p>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 h-full flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Análise do Gemini</h2>
      <div className="flex-grow overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default CopilotPanel;
