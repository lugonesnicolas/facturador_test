import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
}

export default function ProductCard({ id, name, price }: ProductCardProps) {
  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-md bg-white">
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-gray-700">Precio: ${price}</p>
      <Link href={`/product/${id}`} className="text-blue-500 hover:underline">
        Ver más
      </Link>
    </div>
  );
}
