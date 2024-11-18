import Card from "./Card";

const ProductGrid = () => {
  const products = [
    {
      id: "1",
      title: "Wireless Headphones",
      description: "Noise-cancelling headphones.",
      price: 199.99,
    },
    {
      id: "2",
      title: "Smartwatch",
      description: "Fitness tracking smartwatch.",
      price: 149.99,
    },
    {
      id: "3",
      title: "4K Ultra HD TV",
      description: "Stunning 4K picture quality.",
      price: 799.99,
    },
    {
      id: "4",
      title: "Gaming Laptop",
      description: "Powerful gaming laptop.",
      price: 1299.99,
    },
  ];

  return (
    <div className="">
      <h1 className="mt-10 text-2xl font-bold text-gray-900">Electronics</h1>
      <h2 className="mb-6 text-gray-600 text-">
        A wide variety of products to choose from.
      </h2>
      <section className="grid gap-6 md:grid-cols-4">
        {products.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
          />
        ))}
      </section>
    </div>
  );
};

export default ProductGrid;
