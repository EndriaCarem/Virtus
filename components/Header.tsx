
// fix: Implement the Header component to display the application title and description.
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full max-w-5xl mx-auto text-center py-8">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
        Copiloto de Relatórios
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
        Potencializado pelo Google Gemini para análise de conformidade regulatória.
      </p>
    </header>
  );
};

export default Header;
