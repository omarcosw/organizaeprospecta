import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-blue-100 bg-white/95 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">Prospecta&Vende</span>
          <div className="flex items-center gap-3">
            <Link to="/select-user">
              <Button variant="ghost" size="sm">Ver Demo</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">Começar</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">Organize sua prospecção</h1>
          <p className="text-xl text-gray-600 mb-8">Deixe as planilhas para trás. Transforme como você acompanha leads e bate metas.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/select-user">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">Ver Demo</Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline">Começar Agora</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gray-50 border-t">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Funcionalidades</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-2">Dashboard</h3>
              <p className="text-sm text-gray-600">Indicadores e progresso</p>
            </div>
            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-2">Leads</h3>
              <p className="text-sm text-gray-600">Tabela e Kanban visual</p>
            </div>
            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-2">Atividades</h3>
              <p className="text-sm text-gray-600">Lista do que fazer</p>
            </div>
            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-2">Relatórios</h3>
              <p className="text-sm text-gray-600">Performance em tempo real</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Transforme sua Prospecção</h2>
          <Link to="/signup">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">Começar Gratuitamente</Button>
          </Link>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-gray-200">
        <div className="container mx-auto text-center text-sm text-gray-600">
          © 2024 Prospecta&Vende
        </div>
      </footer>
    </div>
  );
}
