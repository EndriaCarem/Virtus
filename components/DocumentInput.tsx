
// fix: Implement the DocumentInput component for user text input.
import React, { useState, useRef } from 'react';
import UploadIcon from './icons/UploadIcon';

interface DocumentInputProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

const DocumentInput: React.FC<DocumentInputProps> = ({ onAnalyze, isLoading }) => {
  const [text, setText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target?.result as string);
      };
      reader.readAsText(file);
    }
    // Reset file input to allow uploading the same file again
    if (event.target) {
      event.target.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAnalyze(text);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 h-full flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Seu Documento</h2>
      <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
        <div className="relative flex-grow">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="Cole seu texto aqui ou carregue um arquivo..."
            rows={15}
            disabled={isLoading}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".txt,.md"
          />
        </div>
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={handleUploadClick}
            disabled={isLoading}
            className="flex items-center justify-center w-full sm:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <UploadIcon className="w-5 h-5 mr-2" />
            Carregar Arquivo
          </button>
          <button
            type="submit"
            disabled={isLoading || !text.trim()}
            className="flex items-center justify-center w-full sm:w-auto px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Analisando...' : 'Analisar Documento'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DocumentInput;
