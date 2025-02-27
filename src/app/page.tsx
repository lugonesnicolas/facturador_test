"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  if (!session) {
    return null;
  }

  return (
    <main className="flex flex-col items-center justify-center w-full bg-gray-900">
      <h1 className="text-4xl font-bold text-white mb-6">
        Bienvenido, {session.user?.name} 🚀
      </h1>

      <button
        onClick={() => window.location.href = "/facturacion"}
        className="bg-green-600 hover:bg-green-500 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 w-64"
      >
        🧾 Nueva Factura
      </button>

      <button
        onClick={async () => {
          await signOut({ redirect: false }); // No redirige automáticamente
          router.push("/login"); // Redirige manualmente
          router.refresh(); // Fuerza la actualización del estado
        }}
        className="mt-4 bg-red-600 hover:bg-red-500 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 w-64"
      >
        🚪 Cerrar sesión
      </button>
    </main>
  );
}
