import { createContext, ReactNode, useReducer } from "react";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl?: string;
};

type CartAction =
  | { type: "ADD_PRODUCT"; product: Product }
  | { type: "REMOVE_PRODUCT"; id: string }
  | { type: "UPDATE_QUANTITY"; id: string; quantity: number };

const initialCart: Product[] = [];

function cartReducer(state: Product[], action: CartAction): Product[] {
  switch (action.type) {
    case "ADD_PRODUCT": {
      const existingProduct = state.find(
        (product) => product.id === action.product.id
      );
      if (existingProduct) {
        return state.map((product) =>
          product.id === action.product.id
            ? {
                ...product,
                quantity: product.quantity + action.product.quantity,
              }
            : product
        );
      }
      return [...state, action.product];
    }
    case "REMOVE_PRODUCT": {
      return state.filter((product) => product.id !== action.id);
    }
    case "UPDATE_QUANTITY": {
      return action.quantity === 0
        ? state.filter((product) => product.id !== action.id) // Elimina el producto si la cantidad es 0
        : state.map((product) =>
            product.id === action.id
              ? { ...product, quantity: Math.max(action.quantity, 0) }
              : product
          );
    }
    default:
      return state;
  }
}

export const CartContext = createContext<{
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  getTotalPrice: () => number;
}>({
  products: [],
  addProduct: () => {},
  removeProduct: () => {},
  updateQuantity: () => {},
  getTotalPrice: () => 0,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, dispatch] = useReducer(cartReducer, initialCart);

  const addProduct = (product: Product) =>
    dispatch({ type: "ADD_PRODUCT", product });

  const removeProduct = (id: string) =>
    dispatch({ type: "REMOVE_PRODUCT", id });

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", id, quantity });
  };

  const getTotalPrice = () =>
    products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

  return (
    <CartContext.Provider
      value={{
        products,
        addProduct,
        removeProduct,
        updateQuantity,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
