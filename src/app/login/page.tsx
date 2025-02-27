"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Si ya está autenticado, redirigir al home
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Eliminar error de la URL si existe
  useEffect(() => {
    if (searchParams.get("error")) {
      setError("Credenciales incorrectas. Intenta nuevamente.");
      router.replace("/login"); // Limpia la URL eliminando el error
    }
  }, [searchParams, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Limpiar errores previos

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // No redirigir automáticamente
    });

    if (result?.error) {
      setError("Email o contraseña incorrectos");
    } else {
      router.push("/"); // Redirige manualmente al home si es exitoso
      router.refresh(); // Actualiza la sesión en la UI
    }
  };

  return (
    <main className="flex w-full items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md w-80">
        <h1 className="text-2xl font-bold text-white mb-4">Iniciar Sesión</h1>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-gray-300 mb-2"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-gray-300 mb-4"
        />

        <button type="submit" className="bg-gray-700 hover:bg-gray-600 text-white w-full py-2 rounded">
          Ingresar
        </button>
      </form>
    </main>
  );
}
