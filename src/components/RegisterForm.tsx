import { useState } from "react";

interface FormData {
  name: string;
  email: string;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Always run validation to show errors
    const isValid = validateForm();
    
    if (isValid) {
      setIsSubmitted(true);
      setFormData({ name: "", email: "" });
      setErrors({});
    }
    // If not valid, errors are already set by validateForm
  };

  const handleReset = () => {
    setFormData({ name: "", email: "" });
    setIsSubmitted(false);
    setErrors({});
  };

  const isFormValid = formData.name.trim() !== "" && formData.email.trim() !== "";

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="w-full max-w-lg backdrop-blur-lg bg-white/10 rounded-2xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>
        
        <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Formulario de Registro
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-lg font-medium text-blue-200">
              Nombre completo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-xl bg-white/10 border-2 transition-all duration-300
                         text-white placeholder-blue-200/50 focus:outline-none
                         ${errors.name 
                           ? 'border-red-500/50 focus:border-red-500' 
                           : 'border-transparent focus:border-blue-500/50'}`}
              placeholder="Tu nombre completo"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400 flex items-center gap-2">
                <span className="text-xl">⚠</span> {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-lg font-medium text-blue-200">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-xl bg-white/10 border-2 transition-all duration-300
                         text-white placeholder-blue-200/50 focus:outline-none
                         ${errors.email 
                           ? 'border-red-500/50 focus:border-red-500' 
                           : 'border-transparent focus:border-blue-500/50'}`}
              placeholder="tucorreo@ejemplo.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400 flex items-center gap-2">
                <span className="text-xl">⚠</span> {errors.email}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full px-6 py-4 mt-6 rounded-xl font-semibold text-lg shadow-lg transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group ${
              !isFormValid
                ? 'bg-gray-300 text-gray-500'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-purple-500/25'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <span className="relative z-10">Registrar</span>
          </button>
          
          <button
            type="button"
            onClick={handleReset}
            className="w-full mt-3 px-6 py-3 rounded-xl bg-white/10 text-blue-200 shadow-lg hover:bg-white/20 transform hover:scale-[1.02] transition-all duration-300"
          >
            Limpiar
          </button>
        </form>

        {isSubmitted && (
          <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm animate-fade-in">
            <p className="text-lg text-emerald-300 flex items-center gap-3">
              <span className="text-2xl">✓</span>
              ¡Registro exitoso!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
