import Cart from "./components/Cart";
import ProductGrid from "./components/ProductGrid";
import { CartProvider } from "./context/shopping-cart-context";

const App = () => {
  return (
    <CartProvider>
      <div className="min-h-screen antialiased font-Geist bg-zinc-100">
        <main className="flex flex-col min-h-screen mx-auto max-w-7xl md:px-12">
          <Cart />
          <ProductGrid />
        </main>
      </div>
    </CartProvider>
  );
};

export default App;
