import { useState } from "react";

export default function Survey() {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
    setIsSubmitted(false);
  };

  const handleSubmit = () => {
    if (selectedRating !== null) {
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setSelectedRating(null);
    setIsSubmitted(false);
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="w-full max-w-lg backdrop-blur-lg bg-white/10 rounded-2xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>
        
        <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Tu Opinión Importa
        </h1>
        
        <div className="text-center relative z-10">
          <p className="text-xl mb-8 text-blue-200">¿Cómo calificarías nuestra experiencia?</p>
          
          <div className="flex gap-4 justify-center mb-8">
            {[1, 2, 3, 4, 5].map((rating) => (
              <label key={rating} 
                     className="relative flex items-center justify-center w-16 h-16 cursor-pointer 
                              transform hover:scale-110 transition-all duration-300">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={selectedRating === rating}
                  onChange={() => handleRatingChange(rating)}
                  className="sr-only"
                />
                <div className={`absolute inset-0 rounded-xl ${
                  selectedRating !== null && rating <= selectedRating
                    ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                    : "bg-white/10"
                } transform transition-all duration-300 ${
                  selectedRating === rating ? "scale-110" : ""
                }`}></div>
                <span className={`relative text-4xl transition-all duration-300 ${
                  selectedRating !== null && rating <= selectedRating
                    ? "text-white"
                    : "text-blue-200"
                }`}>
                  ★
                </span>
              </label>
            ))}
          </div>

          {selectedRating && (
            <div className="mb-8">
              <p className="text-xl text-blue-200">
                Has seleccionado: 
                <span className="font-bold ml-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  {selectedRating} {selectedRating !== 1 ? 'estrellas' : 'estrella'}
                </span>
              </p>
            </div>
          )}

          <div className="flex gap-4 justify-center">
            <button
              onClick={handleSubmit}
              disabled={selectedRating === null}
              className={`px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 ${
                selectedRating === null
                  ? "bg-white/10 text-blue-200/50 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-purple-500/25"
              }`}
            >
              Enviar
            </button>
            
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-xl bg-white/10 text-blue-200 shadow-lg 
                       hover:bg-white/20 transform hover:scale-105 transition-all duration-300"
            >
              Reiniciar
            </button>
          </div>

          {isSubmitted && (
            <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm">
              <p className="text-lg text-emerald-300">
                ¡Gracias por tu evaluación! Has calificado con {selectedRating} {selectedRating !== 1 ? 'estrellas' : 'estrella'}.
              </p>
        </div>
      )}
    </div>
  );
}
