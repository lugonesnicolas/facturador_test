export default function ProductLayout({ children }: { children: React.ReactNode }) {
    return (
      <section className="p-6 border-2 border-purple-600 rounded-lg">
        <h2 className="text-2xl font-bold text-purple-600">Sección de Productos</h2>
        {children}
      </section>
    );
  }
  