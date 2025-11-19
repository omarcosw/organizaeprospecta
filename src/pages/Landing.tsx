import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Landing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-blue-100 bg-white/95 shadow-sm backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">Prospecta&Vende</span>
          <div className="flex items-center gap-3">
            <Link to="/select-user">
              <Button variant="ghost" size="sm" className="text-gray-700">Ver Demo</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">Começar</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6">
            <span className="text-sm font-medium text-blue-600">🚀 A ferramenta definitiva para vendedores</span>
          </div>
          <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Organize sua
            <span className="text-blue-600 block">prospecção</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">Deixe as planilhas para trás. Transforme como você acompanha leads e bate metas.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/select-user">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">Ver Demo</Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">Começar Agora</Button>
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-16 pt-8 border-t border-gray-200">
            <div>
              <div className="text-3xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-600">Usuários</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">50k+</div>
              <div className="text-sm text-gray-600">Leads</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">4.9★</div>
              <div className="text-sm text-gray-600">Satisfação</div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-20 px-4 bg-gray-50 border-t">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">Como Funciona</h2>
          <p className="text-center text-gray-600 mb-16">Apenas 4 passos simples</p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: "1", title: "Cadastre", desc: "Importe ou crie leads" },
              { num: "2", title: "Organize", desc: "Defina seu funil" },
              { num: "3", title: "Acompanhe", desc: "Atividades diárias" },
              { num: "4", title: "Analise", desc: "Veja resultados" },
            ].map((step, i) => (
              <div key={i} className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="text-4xl font-bold text-blue-600 mb-2">{step.num}</div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section id="funcionalidades" className="py-20 px-4 bg-white border-t">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">Funcionalidades</h2>
          <p className="text-center text-gray-600 mb-16">Tudo que você precisa em um só lugar</p>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Dashboard", desc: "Indicadores em tempo real e progresso visual" },
              { title: "Leads", desc: "Tabela avançada com Kanban visual" },
              { title: "Atividades", desc: "Plano diário organizado e sincronizado" },
              { title: "Relatórios", desc: "Performance e análise de conversão" },
            ].map((f, i) => (
              <div key={i} className="p-8 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparação */}
      <section className="py-20 px-4 bg-gray-50 border-t">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">Por que não Planilha?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-red-50 rounded-lg border border-red-200">
              <h3 className="text-xl font-bold text-red-600 mb-6">❌ Planilhas</h3>
              <ul className="space-y-3">
                {["Risco de bagunça", "Sem histórico", "Sem visualização", "Impossível em equipe"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <span className="text-red-600">✕</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 bg-green-50 rounded-lg border border-green-200 shadow-lg">
              <h3 className="text-xl font-bold text-green-600 mb-6">✓ Prospecta&Vende</h3>
              <ul className="space-y-3">
                {["Funil visual", "Timeline completa", "Interface intuitiva", "Colaboração em tempo real"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-600">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="py-20 px-4 bg-white border-t">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">O que dizem nossos usuários</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              { name: "Fernanda Silva", role: "SDR", company: "Tech Company", feedback: "Aumentei minha produtividade em 300%! Simples demais." },
              { name: "Roberto Santos", role: "Gestor de Vendas", company: "B2B Solutions", feedback: "Finalmente consigo visualizar tudo o que minha equipe faz." },
              { name: "Juliana Costa", role: "Gerente de Prospecção", company: "E-commerce", feedback: "Antes eram planilhas infinitas, agora é tudo organizado." },
            ].map((t, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{t.feedback}"</p>
                <div className="pt-4 border-t">
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-600">{t.role} • {t.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preços */}
      <section id="precos" className="py-20 px-4 bg-gray-50 border-t">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">Planos Simples</h2>
          <p className="text-center text-gray-600 mb-16">Escolha o plano ideal para seu negócio</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Starter", price: "R$ 49", features: ["1 usuário", "100 leads/mês", "Funil básico"] },
              { name: "Pro", price: "R$ 129", features: ["5 usuários", "Ilimitados", "Personalizado"], highlight: true },
              { name: "Equipe", price: "R$ 297", features: ["Ilimitados", "Ilimitados", "Avançado"] },
            ].map((p, i) => (
              <div
                key={i}
                className={`p-8 rounded-lg border transition-all ${
                  p.highlight
                    ? "border-blue-300 bg-gradient-to-b from-blue-50 to-white shadow-xl scale-105"
                    : "border-gray-200 bg-white hover:shadow-lg"
                }`}
              >
                {p.highlight && (
                  <div className="text-center mb-4 inline-block w-full">
                    <span className="text-xs font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">POPULAR</span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{p.name}</h3>
                <div className="text-4xl font-bold text-gray-900 mb-6">
                  {p.price}
                  <span className="text-lg text-gray-600">/mês</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-700">
                      <span className="text-blue-600">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/signup" className="block">
                  <Button className="w-full" variant={p.highlight ? "default" : "outline"}>
                    Começar
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 bg-white border-t">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Perguntas Frequentes</h2>
          <div className="space-y-4">
            {[
              { q: "Preciso saber usar CRM?", a: "Não! A interface é intuitiva. Se você usa email e planilha, você consegue usar Prospecta&Vende." },
              { q: "Quantos usuários posso adicionar?", a: "Depende do plano. Pro permite 5 usuários, Equipe permite ilimitados." },
              { q: "Posso migrar meus dados?", a: "Sim! Oferecemos importação de dados via Excel/CSV. Basta enviar e processamos." },
              { q: "Há contrato?", a: "Não! Você pode cancelar quando quiser. Sem multas ou taxas ocultas." },
            ].map((f, i) => (
              <div
                key={i}
                className="p-6 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">{f.q}</h3>
                  <span className={`text-blue-600 transition-transform ${openFaq === i ? "rotate-180" : ""}`}>
                    ▼
                  </span>
                </div>
                {openFaq === i && (
                  <p className="text-gray-600 mt-4 pt-4 border-t">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Transforme sua Prospecção</h2>
          <p className="text-xl text-blue-100 mb-8">Centenas de vendedores já abandonaram as planilhas</p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Começar Gratuitamente
            </Button>
          </Link>
          <p className="text-sm text-blue-100 mt-6">✨ Sem cartão de crédito • 🚀 2 minutos de setup</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-gray-300 border-t">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-white mb-4">Prospecta&Vende</h4>
            <p className="text-sm">Ferramenta definitiva para prospecção e vendas.</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Produto</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#como-funciona" className="hover:text-white">Como Funciona</a></li>
              <li><a href="#funcionalidades" className="hover:text-white">Funcionalidades</a></li>
              <li><a href="#precos" className="hover:text-white">Preços</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Sobre</a></li>
              <li><a href="#" className="hover:text-white">Contato</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Termos</a></li>
              <li><a href="#" className="hover:text-white">Privacidade</a></li>
              <li><a href="#" className="hover:text-white">Cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-800 text-center text-sm">
          © 2024 Prospecta&Vende. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
