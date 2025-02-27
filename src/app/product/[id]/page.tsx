import ProductCard from "@/components/ProductCard";

interface Product {
  id: number;
  title: string;
  price: number;
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Error al obtener los productos");
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Lista de Productos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product: Product) => (
          <ProductCard
            key={product.id}
            id={product.id.toString()}
            name={product.title}
            price={product.price}
          />
        ))}
      </div>
    </main>
  );
}
