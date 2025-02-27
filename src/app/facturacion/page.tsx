"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Importar useRouter para redirigir

export default function FacturacionPage() {
  const router = useRouter();
  const [factura, setFactura] = useState({
    cliente: "",
    telefono: "",
    email: "",
    direccion: "",
    producto: "Toyota Corolla 2023",
    precio: 30000,
  });

  const [cargando, setCargando] = useState(false);

  const productos = [
    { nombre: "Toyota Corolla 2023", precio: 30000 },
    { nombre: "Ford Mustang 2022", precio: 45000 },
    { nombre: "Honda Civic 2021", precio: 28000 },
    { nombre: "Chevrolet Onix 2020", precio: 22000 },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFactura({ ...factura, [e.target.name]: e.target.value });
  };

  const handleProductoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const productoSeleccionado = productos.find((p) => p.nombre === e.target.value);
    if (productoSeleccionado) {
      setFactura({
        ...factura,
        producto: productoSeleccionado.nombre,
        precio: productoSeleccionado.precio,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);

    try {
      const response = await fetch("/api/pdf_generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(factura),
      });

      if (!response.ok) {
        alert("Error generando el PDF");
        return;
      }

      // Descargar el PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Factura_${factura.cliente}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      alert("Error generando el PDF");
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="flex justify-center items-center w-full bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-1/2">
        <h1 className="text-3xl font-bold mb-6 text-white text-center">🧾 Generar Factura</h1>

        {/* Datos del Cliente */}
        <label className="block mb-2 text-gray-300">Nombre del Cliente:</label>
        <input
          type="text"
          name="cliente"
          value={factura.cliente}
          onChange={handleChange}
          className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white mb-3"
          required
        />

        <label className="block mb-2 text-gray-300">Teléfono:</label>
        <input
          type="text"
          name="telefono"
          value={factura.telefono}
          onChange={handleChange}
          className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white mb-3"
          required
        />

        <label className="block mb-2 text-gray-300">Correo:</label>
        <input
          type="email"
          name="email"
          value={factura.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white mb-3"
          required
        />

        <label className="block mb-2 text-gray-300">Dirección:</label>
        <input
          type="text"
          name="direccion"
          value={factura.direccion}
          onChange={handleChange}
          className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white mb-3"
          required
        />

        {/* Producto o Vehículo */}
        <label className="block mb-2 text-gray-300">Producto o Vehículo:</label>
        <select
          name="producto"
          value={factura.producto}
          onChange={handleProductoChange}
          className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white mb-4"
        >
          {productos.map((producto) => (
            <option key={producto.nombre} value={producto.nombre}>
              {producto.nombre} - ${producto.precio}
            </option>
          ))}
        </select>

        {/* Botón Generar Factura */}
        <button
          type="submit"
          className={`w-full text-lg font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300 transform ${
            cargando ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500 hover:scale-105"
          } text-white`}
          disabled={cargando}
        >
          {cargando ? "⏳ Generando..." : "📄 Generar Factura"}
        </button>

        {/* Botón Volver al Home */}
        <button
          type="button"
          onClick={() => router.push("/")}
          className="w-full mt-4 bg-gray-600 hover:bg-gray-500 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
        >
          🏠 Volver al Home
        </button>
      </form>
    </main>
  );
}
