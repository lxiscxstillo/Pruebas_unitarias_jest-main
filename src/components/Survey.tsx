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
    <div className="h-full w-full flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-2xl font-bold">Encuesta de Satisfacción</h1>
      
      <div className="text-center">
        <p className="text-lg mb-4">¿Cómo calificarías nuestro servicio?</p>
        
        <div className="flex gap-2 justify-center mb-6">
          {[1, 2, 3, 4, 5].map((rating) => (
            <label key={rating} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={selectedRating === rating}
                onChange={() => handleRatingChange(rating)}
                className="sr-only"
              />
              <span className={`text-3xl transition-colors ${
                selectedRating !== null && rating <= selectedRating
                  ? "text-yellow-400"
                  : "text-gray-300"
              } hover:text-yellow-400`}>
                ★
              </span>
            </label>
          ))}
        </div>
      </div>

      {selectedRating && (
        <div className="text-center mb-4">
          <p className="text-lg">
            Has seleccionado: <span className="font-bold text-blue-600">{selectedRating}</span> estrella{selectedRating !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={handleSubmit}
          disabled={selectedRating === null}
          className={`px-6 py-3 rounded-lg shadow transition-colors ${
            selectedRating === null
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Enviar
        </button>
        
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition-colors"
        >
          Reiniciar
        </button>
      </div>

      {isSubmitted && (
        <div className="text-center p-4 bg-green-100 border border-green-400 rounded-lg">
          <p className="text-lg text-green-800">
            ¡Gracias por tu evaluación! Has calificado con {selectedRating} estrella{selectedRating !== 1 ? 's' : ''}.
          </p>
        </div>
      )}
    </div>
  );
}
