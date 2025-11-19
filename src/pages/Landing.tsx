import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronRight, Zap, Users, TrendingUp, Clock, Shield, ArrowRight } from "lucide-react";

export default function Landing() {
  const [activeTab, setActiveTab] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrollPercent);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50 transition-all"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Header - Premium Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-gray-800/50 bg-black/80 backdrop-blur-xl shadow-lg">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">⚡</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Prospecta&Vende</span>
          </div>
          
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#para-sdr" className="text-sm text-gray-300 hover:text-white transition hover:text-blue-400">SDR, BDR & Closer</a>
            <a href="#features" className="text-sm text-gray-300 hover:text-white transition hover:text-blue-400">Features</a>
            <a href="#resultados" className="text-sm text-gray-300 hover:text-white transition hover:text-blue-400">Resultados</a>
            <a href="#precos" className="text-sm text-gray-300 hover:text-white transition hover:text-blue-400">Planos</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white border border-gray-700 hover:border-blue-500">
                Entrar
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-lg">
                Cadastro
              </Button>
            </Link>
            <Link to="/select-user">
              <Button size="sm" className="bg-gradient-to-r from-pink-600 to-blue-600 hover:from-pink-700 hover:to-blue-700 text-white rounded-lg">
                Demo
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Futuristic */}
      <section className="pt-40 pb-20 px-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: "1s"}} />
        </div>

        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/50 mb-8 backdrop-blur-sm">
            <span className="text-sm font-semibold text-blue-300">⚡ Prospecção sem limites</span>
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-black mb-8 leading-tight">
            <span className="block">Domine seu</span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Funil de Vendas
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            A ferramenta definitiva para <span className="text-blue-400 font-semibold">SDR, BDR e Closer</span> que querem <span className="text-purple-400 font-semibold">prospectação inteligente</span>, <span className="text-pink-400 font-semibold">qualificação rápida</span> e <span className="text-blue-400 font-semibold">fechamento consistente</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-2xl px-8 py-6 text-lg font-bold group">
                Começar Agora <ArrowRight className="ml-2 group-hover:translate-x-1 transition" size={20} />
              </Button>
            </Link>
            <Link to="/select-user">
              <Button size="lg" className="border-2 border-gray-600 text-white hover:border-blue-500 bg-transparent rounded-lg px-8 py-6 text-lg font-bold group">
                Ver Demo <ChevronRight className="ml-2 group-hover:translate-x-1 transition" size={20} />
              </Button>
            </Link>
          </div>

          {/* Live Stats Counter */}
          <div className="grid grid-cols-3 gap-6 py-12 border-y border-gray-800">
            <div className="text-center group">
              <div className="text-4xl lg:text-5xl font-black text-blue-400 group-hover:text-purple-400 transition">2.5M+</div>
              <div className="text-sm text-gray-400 mt-2">Leads Gerenciados</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl lg:text-5xl font-black text-purple-400 group-hover:text-pink-400 transition">340%</div>
              <div className="text-sm text-gray-400 mt-2">Aumento Médio em Produtividade</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl lg:text-5xl font-black text-pink-400 group-hover:text-blue-400 transition">50ms</div>
              <div className="text-sm text-gray-400 mt-2">Tempo Resposta Sistema</div>
            </div>
          </div>
        </div>
      </section>

      {/* SDR, BDR, Closer Section */}
      <section id="para-sdr" className="py-24 px-4 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl font-black text-center mb-4">Feito para quem vende de verdade</h2>
          <p className="text-center text-gray-400 mb-16 text-xl">Cada profissional de vendas tem necessidades únicas. Nós cobrimos todas.</p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                role: "SDR",
                icon: "🎯",
                pain: "Prospectação em volume",
                features: ["Importação em massa", "Segmentação inteligente", "Automação de outreach", "Lead scoring", "Templates prontos"],
                color: "blue"
              },
              {
                role: "BDR",
                icon: "📞",
                pain: "Qualificação rápida",
                features: ["Acompanhamento automático", "Histórico de interações", "Notas inteligentes", "Priorização de leads", "Alertas em tempo real"],
                color: "purple"
              },
              {
                role: "Closer",
                icon: "🤝",
                pain: "Fechamento consistente",
                features: ["Pipeline visual", "Deal stages", "Negociações em contexto", "Histórico completo", "Follow-up automático"],
                color: "pink"
              },
            ].map((item, i) => {
              const gradients = {
                blue: "from-blue-600 to-blue-500",
                purple: "from-purple-600 to-purple-500",
                pink: "from-pink-600 to-pink-500",
              };
              
              return (
                <div 
                  key={i} 
                  className="p-8 bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all cursor-pointer group hover:shadow-2xl hover:shadow-blue-500/20"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{item.role}</h3>
                  <p className="text-gray-400 mb-6 text-sm">{item.pain}</p>
                  <ul className="space-y-3">
                    {item.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-gray-300 group-hover:text-white transition">
                        <Zap size={16} className={`text-${item.color}-400 flex-shrink-0`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section id="features" className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl font-black text-center mb-16">Tecnologia que acelera vendas</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              {[
                {
                  icon: "📊",
                  title: "Dashboard Inteligente",
                  desc: "Visualize seu funil em tempo real com KPIs que importam. Previsões, gargalos, oportunidades."
                },
                {
                  icon: "🤖",
                  title: "Automação Inteligente",
                  desc: "Workflows que se adaptam ao seu processo. Leads qualificados, atividades agendadas automaticamente."
                },
                {
                  icon: "⚡",
                  title: "Performance em Nível Novo",
                  desc: "Interface ultra-responsiva. Carrega em milissegundos. Sem lag, sem delays, pura velocidade."
                },
                {
                  icon: "🎯",
                  title: "AI-Powered Insights",
                  desc: "Ia que aprende com seus dados. Recomendações para próximo passo, melhor hora para contato."
                },
              ].map((feature, i) => (
                <div 
                  key={i}
                  onClick={() => setActiveFeature(i)}
                  className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                    activeFeature === i 
                      ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20" 
                      : "border-gray-800 hover:border-gray-700 bg-gray-900/50"
                  }`}
                >
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Animated Feature Display */}
            <div className="relative h-96 rounded-2xl border border-gray-800 bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 animate-pulse" />
              <div className="relative z-10 text-center">
                <div className="text-6xl mb-4">
                  {["📊", "🤖", "⚡", "🎯"][activeFeature]}
                </div>
                <p className="text-gray-300 text-lg max-w-xs">
                  {["Dados em tempo real", "Automação completa", "Ultra rápido", "Inteligência artificial"][activeFeature]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resultados Section */}
      <section id="resultados" className="py-24 px-4 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl font-black text-center mb-16">Resultados que falam por si</h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { metric: "3.4x", label: "Aumento em produtividade", icon: TrendingUp },
              { metric: "+45%", label: "Mais leads qualificados", icon: Users },
              { metric: "-60%", label: "Tempo em tarefas manual", icon: Clock },
              { metric: "98%", label: "Taxa de uptime", icon: Shield },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="p-8 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-blue-500/50 group transition">
                  <Icon className="text-blue-400 mb-4 group-hover:text-purple-400 transition" size={32} />
                  <div className="text-4xl font-black mb-2">{item.metric}</div>
                  <p className="text-gray-400">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials com Carousel */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl font-black text-center mb-16">Vendedores que já estão vendendo mais</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Lucas Oliveira",
                role: "SDR",
                company: "TechStart",
                testimonial: "Aumentei minha prospecção de 20 para 80 leads qualificados por dia. A automação é insana.",
                avatar: "🧑‍💼"
              },
              {
                name: "Marina Silva",
                role: "BDR Manager",
                company: "SaaS Pro",
                testimonial: "Meu time inteiro consegue fechar 45% mais deals agora. Interface é tão clean que ninguém precisa de treinamento.",
                avatar: "👩‍💼"
              },
              {
                name: "Roberto Santos",
                role: "Closer",
                company: "Enterprise Co",
                testimonial: "Histórico completo de cada interação. Nunca mais perdi informação. Taxa de fechamento subiu 38%.",
                avatar: "👨‍💼"
              },
            ].map((t, i) => (
              <div key={i} className="p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-gray-800 rounded-2xl hover:border-blue-500/50 transition">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl">{t.avatar}</div>
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <div className="text-sm text-gray-400">{t.role} • {t.company}</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-300 italic">"{t.testimonial}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="precos" className="py-24 px-4 bg-gradient-to-b from-transparent to-blue-500/5">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl font-black text-center mb-8">Planos para crescer</h2>
          <p className="text-center text-gray-400 mb-16 text-xl">De SDR solo a times enterprise. Escale quando precisar.</p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Solo",
                price: "R$ 99",
                desc: "Para prospectores solo",
                features: ["1 usuário", "5k leads/mês", "Automações básicas", "Suporte email"],
                highlight: false
              },
              {
                name: "Time Pro",
                price: "R$ 299",
                desc: "Para times de vendas",
                features: ["Até 10 usuários", "Leads ilimitados", "Automações avançadas", "Suporte prioritário", "Integrações"],
                highlight: true
              },
              {
                name: "Enterprise",
                price: "Customizado",
                desc: "Para operações em escala",
                features: ["Usuários ilimitados", "API completa", "Suporte 24/7", "Consultoria dedicada", "Custom features"],
                highlight: false
              },
            ].map((p, i) => (
              <div
                key={i}
                className={`p-8 rounded-2xl border-2 transition-all ${
                  p.highlight
                    ? "border-purple-500 bg-gradient-to-br from-purple-500/20 to-blue-500/20 shadow-2xl shadow-purple-500/20 scale-105"
                    : "border-gray-800 bg-gradient-to-br from-gray-900 to-black hover:border-blue-500/50"
                }`}
              >
                {p.highlight && (
                  <div className="mb-4 inline-block">
                    <span className="text-xs font-bold text-purple-300 bg-purple-500/30 px-4 py-2 rounded-full">⚡ MAIS POPULAR</span>
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{p.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{p.desc}</p>
                <div className="mb-8">
                  <span className="text-5xl font-black">{p.price}</span>
                  {p.price !== "Customizado" && <span className="text-gray-400 ml-2">/mês</span>}
                </div>
                <ul className="space-y-4 mb-8">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-gray-300">
                      <Zap size={16} className="text-blue-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/signup" className="block">
                  <Button className={`w-full py-6 rounded-lg font-bold text-lg transition-all ${
                    p.highlight
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/50"
                      : "border-2 border-gray-700 text-white hover:border-blue-500 hover:bg-blue-500/10"
                  }`}>
                    Começar Agora
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Ultra Persuasive */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-3xl" />
        
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <h2 className="text-6xl font-black mb-8 leading-tight">
            Sua concorrência está usando.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              E você?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12">
            Não perca mais oportunidades. Não digite mais planilhas. Não perca leads por falta de automação.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-lg shadow-2xl px-12 py-7 text-lg font-black group">
                Comece grátis agora <ArrowRight className="ml-2 group-hover:translate-x-1 transition" size={24} />
              </Button>
            </Link>
            <Link to="/select-user">
              <Button size="lg" className="border-2 border-gray-500 text-white hover:border-blue-500 hover:bg-blue-500/10 rounded-lg px-12 py-7 text-lg font-bold">
                Ver demo ao vivo
              </Button>
            </Link>
          </div>

          <p className="text-gray-400 text-sm">
            ✨ Sem cartão de crédito • 🚀 Setup em 2 minutos • 📞 Suporte especializado em vendas
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">⚡</div>
                <span className="font-bold text-lg">Prospecta&Vende</span>
              </div>
              <p className="text-sm text-gray-400">Tecnologia para vendedores que vendem de verdade.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-blue-400 transition">Features</a></li>
                <li><a href="#resultados" className="hover:text-blue-400 transition">Resultados</a></li>
                <li><a href="#precos" className="hover:text-blue-400 transition">Planos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition">Sobre</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition">Termos</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Privacidade</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-900 text-center text-sm text-gray-500">
            © 2025 Prospecta&Vende. Vendedores que vendem.
          </div>
        </div>
      </footer>
    </div>
  );
}
