import "./globals.css";
import Image from "next/image";
import SessionProvider from "@/components/SessionProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-900">
        <header className="top-0 w-full flex justify-center items-center">
          <Image src="/logo.png" alt="Unidades Del Sur Automotores" width={200} height={100} priority className="h-full w-auto" />
        </header>
        <div className="w-full flex justify-center items-center">
          <SessionProvider>{children}</SessionProvider>
        </div>
      </body>
    </html>
  );
}
