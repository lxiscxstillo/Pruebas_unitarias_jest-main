import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const initialProducts: Product[] = [
  { 
    id: 1, 
    name: "Laptop Quantum X", 
    price: 999.99,
    description: "Procesador cuántico de última generación",
    image: "💻"
  },
  { 
    id: 2, 
    name: "Mouse Háptico", 
    price: 129.99,
    description: "Control gestual avanzado",
    image: "🖱️"
  },
  { 
    id: 3, 
    name: "Teclado Neural", 
    price: 179.99,
    description: "Respuesta táctil biomimética",
    image: "⌨️"
  },
  { 
    id: 4, 
    name: "Monitor Holográfico", 
    price: 599.99,
    description: "Proyección 4D en tiempo real",
    image: "🖥️"
  },
  { 
    id: 5, 
    name: "Auriculares IA", 
    price: 249.99,
    description: "Audio adaptativo con IA",
    image: "🎧"
  },
];

export default function ShoppingCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-full w-full p-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
        Carrito de Compras
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product List */}
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-blue-200">Productos Disponibles</h2>
          <div className="space-y-4">
            {initialProducts.map(product => (
              <div key={product.id} 
                   className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg
                            hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{product.image}</span>
                  <div>
                    <h3 className="font-medium text-white">{product.name}</h3>
                    <p className="text-sm text-blue-200">{product.description}</p>
                    <p className="text-lg font-bold mt-1 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white
                           shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
                >
                  Agregar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Shopping Cart */}
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-blue-200">Mi Carrito</h2>
            <div className="px-4 py-1 rounded-full bg-white/10 text-blue-200">
              {getTotalItems()} {getTotalItems() === 1 ? 'artículo' : 'artículos'}
            </div>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-blue-200">Tu carrito está vacío</p>
              <p className="text-sm text-blue-200/70 mt-2">Explora nuestros productos y comienza a agregar</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.product.id} 
                     className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{item.product.image}</span>
                    <div>
                      <h3 className="font-medium text-white">{item.product.name}</h3>
                      <p className="text-sm text-blue-200">${item.product.price.toFixed(2)} c/u</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-white/10 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-blue-200 hover:bg-white/10 transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-blue-200 hover:bg-white/10 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors"
                      title="Eliminar"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}

              {/* Total */}
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold text-blue-200">Total:</span>
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
