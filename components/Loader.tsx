
import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

const Loader: React.FC = () => {
  const googleBlue = '#4285F4';
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <SparklesIcon className="w-16 h-16 mb-4 animate-pulse" style={{ color: googleBlue }} />
      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Analisando com Gemini...</h3>
      <p className="mt-2 text-gray-500 dark:text-gray-400">Conectando à API do Google Gemini para formatar e analisar seu documento. Isso pode levar um momento.</p>
    </div>
  );
};

export default Loader;
