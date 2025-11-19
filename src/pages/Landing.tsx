import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Landing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Fixed Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PV</span>
            </div>
            <span className="text-lg font-bold text-gray-900">Prospecta&Vende</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#beneficios" className="text-sm text-gray-600 hover:text-gray-900 transition">Benefícios</a>
            <a href="#comparativo" className="text-sm text-gray-600 hover:text-gray-900 transition">Por que não Planilha?</a>
            <a href="#nichos" className="text-sm text-gray-600 hover:text-gray-900 transition">Para Quem</a>
            <a href="#precos" className="text-sm text-gray-600 hover:text-gray-900 transition">Planos</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/select-user">
              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-gray-900">Ver Demo</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-md">Começar Grátis</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-blue-100 border border-blue-200 mb-6">
            <span className="text-sm font-semibold text-blue-700">✨ CRM feito para quem vende de verdade</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Não é apenas um CRM.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
              É Prospecta&Vende.
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Organize leads, automatize atividades e bata metas. Deixe as planilhas para trás e domine suas vendas em um único lugar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/select-user">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto px-8">
                Ver Demo Agora
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="border-2 border-gray-300 text-gray-900 hover:border-gray-400 rounded-lg w-full sm:w-auto px-8">
                Começar Gratuitamente
              </Button>
            </Link>
          </div>
          
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-6 py-8 border-y border-gray-200">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">600+</div>
              <div className="text-sm text-gray-600 mt-1">Empresas ativas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">50k+</div>
              <div className="text-sm text-gray-600 mt-1">Leads gerenciados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">4.9★</div>
              <div className="text-sm text-gray-600 mt-1">Satisfação</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Benefits */}
      <section id="beneficios" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tudo que você precisa para vender mais</h2>
            <p className="text-lg text-gray-600">Uma plataforma completa, integrada e fácil de usar</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { 
                icon: "📊",
                title: "Dashboard Inteligente",
                desc: "Visualize seus indicadores em tempo real. KPIs, funil, conversão - tudo que importa em um só lugar."
              },
              { 
                icon: "📋",
                title: "Leads & Kanban Visual",
                desc: "Organize seus leads com visualização em tabela ou Kanban. Acompanhe cada etapa do seu processo."
              },
              { 
                icon: "⚡",
                title: "Atividades Automáticas",
                desc: "Defina tarefas recorrentes, automatize follow-ups e nunca mais perca uma oportunidade."
              },
              { 
                icon: "📈",
                title: "Relatórios em Tempo Real",
                desc: "Acompanhe performance, taxas de conversão, tempo médio de ciclo e muito mais com dados precisos."
              },
            ].map((benefit, i) => (
              <div key={i} className="p-8 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Como Funciona</h2>
            <p className="text-lg text-gray-600">Simples, intuitivo e poderoso</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { 
                step: "1",
                title: "Cadastre",
                desc: "Importe seus leads de Excel, integre com sua base de dados ou crie manualmente."
              },
              { 
                step: "2",
                title: "Organize",
                desc: "Customize seu funil de vendas. Defina etapas, segmente por tipo de negócio."
              },
              { 
                step: "3",
                title: "Acompanhe",
                desc: "Configure atividades automáticas, receba notificações e saiba o que fazer a cada dia."
              },
              { 
                step: "4",
                title: "Venda Mais",
                desc: "Analise resultados, refine processos e aumente suas conversões consistentemente."
              },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="comparativo" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Enquanto você usa Planilhas...</h2>
            <p className="text-lg text-gray-600">A gente oferece muito mais</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-red-50 rounded-xl border border-red-200">
              <h3 className="text-2xl font-bold text-red-600 mb-6">❌ Planilhas (O que você tinha)</h3>
              <ul className="space-y-4">
                {[
                  "Dados desorganizados e confusos",
                  "Sem histórico de interações",
                  "Múltiplas abas e fórmulas quebradas",
                  "Impossível trabalhar em equipe",
                  "Sem automações possíveis",
                  "Risco de perder informações"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <span className="text-red-500 font-bold">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 bg-green-50 rounded-xl border border-green-300 shadow-xl">
              <h3 className="text-2xl font-bold text-green-600 mb-6">✓ Prospecta&Vende (O futuro)</h3>
              <ul className="space-y-4">
                {[
                  "Funil visual e organizado",
                  "Timeline completa de cada interação",
                  "Interface intuitiva e profissional",
                  "Colaboração em tempo real com o time",
                  "Automações que trabalham para você",
                  "Dados seguros na nuvem"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <span className="text-green-600 font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases / Nichos */}
      <section id="nichos" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Feito para vários tipos de negócio</h2>
            <p className="text-lg text-gray-600">Se você vende, o Prospecta&Vende é para você</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: "🛍️",
                nicho: "E-commerce & Varejo",
                desc: "Acompanhe frequência de compra, envie ofertas personalizadas e conecte clientes por múltiplos canais."
              },
              {
                icon: "🎓",
                nicho: "Infoprodutores & Cursos",
                desc: "Automatize CPLs, agendamentos e vendas via WhatsApp. Organize aulas e atendimento em um lugar."
              },
              {
                icon: "🏢",
                nicho: "Agências & Serviços",
                desc: "Gerencie múltiplos projetos, funis independentes e acompanhe progresso com precisão."
              },
              {
                icon: "📱",
                nicho: "Negócios Locais",
                desc: "Controle sua prospecção local, agende consultas e acompanhe sua reputação."
              },
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white rounded-xl border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.nicho}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">O que dizem nossos usuários</h2>
            <p className="text-lg text-gray-600">Empresas que já transformaram suas vendas</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                feedback: "Aumentei minha produtividade em 300%. A interface é tão intuitiva que meu time aprendeu em 1 dia.",
                name: "Fernanda Silva",
                role: "SDR",
                company: "Tech Company"
              },
              { 
                feedback: "Finalmente consigo visualizar tudo que minha equipe de vendas está fazendo. Totalmente transparente.",
                name: "Roberto Santos",
                role: "Gestor de Vendas",
                company: "B2B Solutions"
              },
              { 
                feedback: "Antes eram planilhas infinitas, agora é tudo organizado em um lugar. Recomendo demais!",
                name: "Juliana Costa",
                role: "Gerente de Prospecção",
                company: "E-commerce"
              },
            ].map((t, i) => (
              <div key={i} className="p-8 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">"{t.feedback}"</p>
                <div className="pt-6 border-t">
                  <div className="font-bold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-600">{t.role} • {t.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Stats */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Quem já usa Prospecta&Vende não volta atrás</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: "600+", label: "Empresas ativas" },
              { num: "+100", label: "Novos clientes/mês" },
              { num: "1,600+", label: "Usuários ativos/dia" },
              { num: "4.9★", label: "Nota média" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-bold text-white mb-2">{stat.num}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="precos" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Planos para todo tamanho de negócio</h2>
            <p className="text-lg text-gray-600">Começe grátis, escale com confiança</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: "Starter",
                price: "R$ 49",
                desc: "Perfeito para começar",
                features: ["1 usuário", "100 leads/mês", "Dashboard básico", "Suporte por email"],
                highlight: false
              },
              { 
                name: "Pro",
                price: "R$ 129",
                desc: "Mais vendas, mais poder",
                features: ["Até 5 usuários", "Leads ilimitados", "Automações avançadas", "Suporte prioritário", "Integrações"],
                highlight: true
              },
              { 
                name: "Equipe",
                price: "R$ 297",
                desc: "Para times que vendem muito",
                features: ["Usuários ilimitados", "Leads ilimitados", "API completa", "Suporte 24/7", "Consultoria"],
                highlight: false
              },
            ].map((p, i) => (
              <div
                key={i}
                className={`p-8 rounded-2xl border transition-all ${
                  p.highlight
                    ? "border-blue-300 bg-gradient-to-b from-blue-50 to-white shadow-2xl scale-105"
                    : "border-gray-200 bg-white hover:shadow-lg"
                }`}
              >
                {p.highlight && (
                  <div className="mb-4 inline-block">
                    <span className="text-xs font-bold text-blue-600 bg-blue-100 px-4 py-2 rounded-full">MAIS POPULAR</span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{p.name}</h3>
                <p className="text-gray-600 text-sm mb-6">{p.desc}</p>
                <div className="mb-8">
                  <span className="text-5xl font-bold text-gray-900">{p.price}</span>
                  <span className="text-gray-600 ml-2">/mês</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-gray-700">
                      <span className="text-blue-600 font-bold">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/signup" className="block">
                  <Button className={`w-full py-6 rounded-lg font-semibold transition-all ${
                    p.highlight 
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                      : "border-2 border-gray-300 text-gray-900 hover:border-gray-400 bg-white"
                  }`}>
                    Começar Agora
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Dúvidas frequentes</h2>
            <p className="text-lg text-gray-600">Respondemos as questões mais comuns</p>
          </div>
          <div className="space-y-4">
            {[
              { 
                q: "Preciso saber usar CRM?",
                a: "Não! A interface foi desenhada para ser intuitiva. Se você usa email e planilha, você consegue usar Prospecta&Vende em 5 minutos."
              },
              { 
                q: "Posso importar meus dados atuais?",
                a: "Sim! Oferecemos importação fácil de dados via Excel/CSV. Basta enviar o arquivo e nossa equipe processa tudo para você."
              },
              { 
                q: "Como funciona a colaboração com equipe?",
                a: "Você cria quantos usuários quiser (conforme seu plano) e todos trabalham em tempo real. Qualquer mudança é atualizada para todo mundo instantaneamente."
              },
              { 
                q: "E se precisar de ajuda?",
                a: "Nossa equipe de suporte está disponível! Planos Pro e Equipe recebem suporte prioritário. Você também tem acesso à nossa comunidade com outros usuários."
              },
              { 
                q: "Posso cancelar quando quiser?",
                a: "Sim, sem taxas ocultas ou contratos de longa duração. Você pode cancelar quando desejar. Sem multas, sem complicações."
              },
            ].map((f, i) => (
              <div
                key={i}
                className="p-6 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md hover:border-blue-200 transition-all"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 text-lg">{f.q}</h3>
                  <span className={`text-blue-600 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}>
                    ▼
                  </span>
                </div>
                {openFaq === i && (
                  <p className="text-gray-600 mt-4 pt-4 border-t leading-relaxed">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Comece a vender mais hoje mesmo
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Sem cartão de crédito. Sem compromisso. Apenas 2 minutos para começar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 rounded-lg shadow-lg px-10 font-semibold">
                Começar Gratuitamente
              </Button>
            </Link>
            <Link to="/select-user">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 rounded-lg px-10 font-semibold">
                Ver Demo
              </Button>
            </Link>
          </div>
          <p className="text-blue-100 mt-8 text-sm">
            ✨ Sem cartão de crédito • 🚀 2 minutos de setup • 📞 Suporte humanizado
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-gray-900 text-gray-300">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">PV</div>
                Prospecta&Vende
              </h4>
              <p className="text-sm text-gray-400">A plataforma definitiva para prospecção e vendas.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Produto</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#beneficios" className="hover:text-white transition">Benefícios</a></li>
                <li><a href="#comparativo" className="hover:text-white transition">Comparação</a></li>
                <li><a href="#nichos" className="hover:text-white transition">Para Quem</a></li>
                <li><a href="#precos" className="hover:text-white transition">Planos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Comunidade</a></li>
                <li><a href="#" className="hover:text-white transition">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white transition">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
              <div>© 2025 Prospecta&Vende. Todos os direitos reservados.</div>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white transition">LinkedIn</a>
                <a href="#" className="hover:text-white transition">Instagram</a>
                <a href="#" className="hover:text-white transition">YouTube</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
