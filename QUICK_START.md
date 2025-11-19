# ⚡ QUICK START - Prospecta&Vende v2.0

## 🚀 Iniciar Aplicação (30 segundos)

```bash
# Terminal 1: Ir para o diretório
cd /Users/marcosvinicius/Desktop/AuthLike\ Develop/Prospecta\&Vende

# Terminal 1: Iniciar dev server
npm run dev

# Aguarde: "VITE ready in XXms"
# Abra navegador em: http://localhost:8081
```

---

## 📋 Fluxo de Teste Rápido (5 minutos)

### 1. Landing Page
```
✓ Abra http://localhost:8081
✓ Verifica tema light (branco)
✓ Clica "Ver Demo"
→ Vai para /select-user
```

### 2. Select User
```
✓ Clica em qualquer usuário (ex: "João Silva")
✓ Vai para Dashboard
✓ Nome aparece no header (direito superior)
```

### 3. Dashboard
```
✓ Verifica dados (Stats, Goals, Team)
✓ Clica "Leads" no sidebar
```

### 4. Leads Page
```
✓ Clica tab "Qualificação" - muda leads
✓ Clica "Novo Lead"
✓ Dialog abre
✓ Preenche: Nome, Email, Telefone, Empresa
✓ Clica "Criar Lead"
✓ Toast verde aparece: "Lead criado!"
✓ Dialog fecha
```

### 5. User Logout
```
✓ Clica avatar (header direito)
✓ Clica "Sair"
✓ Volta para Landing
✓ Clica "Ver Demo" novamente
```

---

## 🎨 Verificações Visuais

- [ ] **Fundo**: Branco (não preto/dark)
- [ ] **Botões**: Azul (#3b82f6) primário
- [ ] **Headers**: Tema light aplicado
- [ ] **Cards**: Branco com borda cinza
- [ ] **Badges**: Coloridas (azul/roxo/verde)
- [ ] **Icons**: Visíveis e coloridos

---

## ✅ Checklist Rápido

| Item | Status | Como Verificar |
|------|--------|----------------|
| Tema Light | ✅ | Abra landing, deve ser branco |
| Landing Page | ✅ | Vê 10+ seções |
| Login Flow | ✅ | Email/senha validam |
| SelectUser | ✅ | Vê 7 usuários |
| Dashboard | ✅ | Stats + goals + funil |
| Leads Tabs | ✅ | Clica abas, mudam leads |
| Novo Lead Dialog | ✅ | Abre/fecha, valida |
| Atividades Tabs | ✅ | Clica abas, mudam |
| Nova Atividade | ✅ | Lead select filtra |
| User Dropdown | ✅ | Vê Trocar/Sair |
| Logout | ✅ | Volta para landing |
| localStorage | ✅ | F12 → Storage |

---

## 🔧 Troubleshooting Rápido

### Página em branco?
```bash
# Terminal:
npm run dev
# Aguarde VITE ready
# Recarregue navegador (F5)
```

### Dev server não inicia?
```bash
# Kill processo anterior:
killall node

# Ou específico:
lsof -i :8081
kill -9 <PID>

# Tentar novamente:
npm run dev
```

### localStorage não funciona?
```javascript
// DevTools Console (F12):
localStorage.getItem('mockCurrentUser')
// Deve mostrar: {"id":...,"name":"João"...}
```

### Build com erro?
```bash
npm run build
# Se tiver erro, veja qual arquivo
# Abra o arquivo e verifica sintaxe
```

---

## 📱 URLs Principais

| Página | URL |
|--------|-----|
| Landing | `http://localhost:8081/` |
| Login | `http://localhost:8081/login` |
| Signup | `http://localhost:8081/signup` |
| Select User | `http://localhost:8081/select-user` |
| Dashboard | `http://localhost:8081/app/dashboard` |
| Leads | `http://localhost:8081/app/leads` |
| Atividades | `http://localhost:8081/app/atividades` |
| Metas | `http://localhost:8081/app/metas` |
| Relatórios | `http://localhost:8081/app/relatorios` |
| Configurações | `http://localhost:8081/app/configuracoes` |

---

## 👥 Usuários Mock (Para Testar)

### Time Alpha
1. **João Silva** (SDR) - Azul
2. **Maria Santos** (BDR) - Roxo
3. **Carlos Costa** (Closer) - Verde

### Time Beta
1. **Ana Oliveira** (SDR) - Azul
2. **Pedro Alves** (BDR) - Roxo
3. **Lucas Mendes** (Closer) - Verde

### Admin
- **Roberto Gestor** (Gestor) - Laranja

---

## 📊 Dados Mock Disponíveis

```javascript
// Leads: 9 leads em diferentes estágios
// Atividades: 10 atividades de diferentes tipos
// Goals: 6 metas com cálculo de progresso
// Todos os dados em: src/mock/mockData.ts
```

---

## 🎯 Botões Principais

### Header
- **"Novo Lead"** → NewLeadDialog
- **Avatar** → User dropdown
- **"Trocar Usuário"** → SelectUser
- **"Sair"** → Landing

### Sidebar
- **Dashboard** → Análise geral
- **Leads** → Gerenciar leads
- **Atividades** → Tarefas
- **Metas** → Goals
- **Relatórios** → Analytics
- **Configurações** → Settings

### Pages
- **Novo Lead** → Dialog form
- **Nova Atividade** → Dialog form
- **Nova Meta** → Button (não funciona no mock)
- **Abas** → Filtram dados em tempo real

---

## 📚 Documentação

```
├── FUNCIONALIDADES_CORRIGIDAS.md  (Checklist completo)
├── GUIA_TESTES.md                 (10 testes detalhados)
├── RESUMO_EXECUTIVO.md            (Visão geral)
└── STATUS_FINAL.md                (Este arquivo)
```

---

## 🌟 Features Principais

1. **🎨 Design Light**
   - Tema branco profissional
   - Paleta azul/roxo/verde
   - Responsivo mobile

2. **📊 Dashboard**
   - Stats cards
   - Metas com progress
   - Funil visual
   - Gráficos Recharts

3. **👥 Leads**
   - 4 abas por estágio
   - Search e filter
   - Novo lead dialog
   - Jornada visual

4. **📝 Atividades**
   - 3 abas (pendentes/concluídas/todas)
   - Nova atividade com lead filter
   - Status visual
   - Timestamps

5. **🎯 Metas**
   - Progress bars
   - Cálculo automático
   - Metas pessoais e time
   - Badges de conclusão

6. **📈 Relatórios**
   - 4 gráficos diferentes
   - Tabelas com dados
   - Análise por canal
   - Distribuição por status

---

## 🚀 Deploy (Quando Pronto)

```bash
# Build para produção
npm run build

# Arquivo gerado em: dist/
# Deploy em servidor (Vercel, Netlify, etc)

# Ou servir localmente:
npm run preview
```

---

## ❓ Dúvidas Frequentes

**P: Como mudo de usuário?**
- A: Clique no avatar (header) → "Trocar Usuário" → Escolha novo usuário

**P: Como faço logout?**
- A: Clique no avatar → "Sair" → Volta para Landing

**P: Meus dados salvam?**
- A: Sim, localStorage persiste. Recarregue a página e continua logado.

**P: Como limpo dados salvos?**
- A: DevTools → Application → Local Storage → Delete mockCurrentUser

**P: Posso editar leads?**
- A: No mock atual, apenas criar. Backend virá depois.

**P: Como vejo os gráficos?**
- A: Vá em Relatórios (sidebar) → Clique abas (Funil/Performance/Canais/Status)

---

## 🎊 Pronto!

Você está pronto para:
✅ Testar todas as funcionalidades
✅ Mostrar para clientes
✅ Coletar feedback
✅ Iterar e melhorar

---

**Happy Testing! 🚀**

---

**Última atualização**: Janeiro 2025
**Versão**: 2.0 Light Theme Complete
