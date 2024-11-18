import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/useCart";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity?: number;
  imageUrl?: string;
};

const Card: React.FC<Product> = React.memo(
  ({ title, description, price, imageUrl, id }) => {
    const [isAdding, setIsAdding] = useState(false);
    const { addProduct } = useCart();

    const handleAddToCart = async (id: string) => {
      setIsAdding(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      addProduct({ id, title, price, description, imageUrl, quantity: 1 });
      setIsAdding(false);
    };

    return (
      <article
        className="border size-full overflow-hidden rounded-lg min-w-[260px] shadow-sm"
        aria-labelledby={title}
      >
        <div className="aspect-[4/3] bg-[#E7E7E8]">{imageUrl}</div>

        <div className="p-4 ">
          <h2 className="font-bold">{title}</h2>
          <p className="text-sm text-zinc-500">{description}</p>
          <p className="mt-2">${price}</p>
          <button
            className={`
        inline-flex items-center justify-center w-full h-8 gap-2 px-3 mt-4 
        text-xs font-medium transition-colors rounded-md whitespace-nowrap 
        focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
        text-zinc-50 bg-zinc-900 hover:bg-zinc-900/90
        ${isAdding ? "opacity-75 cursor-not-allowed" : "hover:bg-zinc-900/90"}
      `}
            onClick={() => handleAddToCart(id)}
            disabled={isAdding}
          >
            {isAdding ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Adding to cart...
              </>
            ) : (
              <>
                Add to cart
                <ShoppingCart className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </article>
    );
  }
);

export default Card;
