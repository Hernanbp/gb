import { useState, useEffect } from "react";
import { X, ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "../context/useCart";

export default function Component() {
  const { products, removeProduct, updateQuantity, getTotalPrice } = useCart();

  const handleRemoveFromCart = (id: string) => {
    removeProduct(id);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const [isOpen, setIsOpen] = useState(false);

  const total = getTotalPrice();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed p-2 text-white transition-colors rounded-md shadow-lg bg-zinc-900 top-4 right-4 hover:bg-zinc-900/90"
        aria-label="Open shopping cart"
      >
        <ShoppingCart className="w-5 h-5" />
      </button>

      <div
        className={`fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`absolute inset-y-0 right-0 overflow-hidden w-full max-w-md bg-white shadow-xl transition-transform duration-300 ease-in-out transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-zinc-200 bg-zinc-50">
              <h2 className="font-semibold text-zinc-900 ">Your Cart</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 transition-colors rounded-full hover:bg-[#dae4e0]"
                aria-label="Close cart"
              >
                <X className="w-4 h-4 text-indigo-900" />
              </button>
            </div>

            <div className="flex-grow p-4 overflow-y-auto bg-zinc-100">
              {products.length === 0 ? (
                <p className="text-center text-zinc-400">Your cart is empty</p>
              ) : (
                products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center py-4 border-b"
                  >
                    <div className="flex-grow">
                      <h3 className="font-semibold text-zinc-900">
                        {product.title}
                      </h3>
                      <p className="text-sm text-zinc-400">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(product.id, product.quantity - 1)
                        }
                        className="p-1 transition-colors bg-gray-300 rounded-full hover:bg-gray-400"
                        aria-label={`Decrease quantity of ${product.title}`}
                      >
                        <Minus className="w-4 h-4 text-slate-800" />
                      </button>
                      <span className="w-8 text-center">
                        {product.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(product.id, product.quantity + 1)
                        }
                        className="p-1 transition-colors bg-gray-300 rounded-full hover:bg-gray-400"
                        aria-label={`Increase quantity of ${product.title}`}
                      >
                        <Plus className="w-4 h-4 text-slate-800" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(product.id)}
                      className="p-1 ml-2 text-gray-600 transition-colors hover:text-gray-800"
                      aria-label={`Remove ${product.title} from cart`}
                    >
                      <Trash2 className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-zinc-200 bg-zinc-50">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
              <button
                className="w-full px-4 py-2 font-semibold text-white transition-colors rounded bg-zinc-900 hover:bg-zinc-900/90"
                onClick={() => {
                  console.log("Proceeding to checkout");
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
