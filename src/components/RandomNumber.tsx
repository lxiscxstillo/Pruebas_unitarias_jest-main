import { useState } from "react";

export default function RandomNumber() {
  const [randomNumber, setRandomNumber] = useState<number | null>(null);

  const generateRandomNumber = () => {
    const number = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(number);
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-8 p-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="w-full max-w-md backdrop-blur-lg bg-white/10 rounded-2xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>
        
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Generador Numérico
        </h1>
        
        <div className="text-center mb-8">
          {randomNumber ? (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-xl animate-pulse"></div>
              <p className="text-lg mb-2 text-blue-200">Número generado:</p>
              <span className="font-bold text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {randomNumber}
              </span>
            </div>
          ) : (
            <p className="text-lg text-blue-200">Inicia la generación numérica</p>
          )}
        </div>

        <button
          onClick={generateRandomNumber}
          className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl 
                   shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300
                   font-semibold text-lg relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 
                        group-hover:opacity-20 transition-opacity duration-300"></div>
          Generar Número
        </button>

        <p className="mt-6 text-sm text-blue-200 text-center">Rango disponible: 1 - 100</p>
      </div>
    </div>
  );
}
