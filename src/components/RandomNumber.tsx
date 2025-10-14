import { useState } from "react";

export default function RandomNumber() {
  const [randomNumber, setRandomNumber] = useState<number | null>(null);

  const generateRandomNumber = () => {
    const number = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(number);
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-2xl font-bold">Generador de Números Aleatorios</h1>
      
      <div className="text-center">
        {randomNumber ? (
          <p className="text-lg">
            Número generado: <span className="font-bold text-2xl text-blue-600">{randomNumber}</span>
          </p>
        ) : (
          <p className="text-lg text-gray-600">Haz clic para generar un número aleatorio</p>
        )}
      </div>

      <button
        onClick={generateRandomNumber}
        className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-colors"
      >
        Generar Número Aleatorio
      </button>

      <p className="text-sm text-gray-500">Rango: 1 - 100</p>
    </div>
  );
}
