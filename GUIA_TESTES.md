# 🧪 Guia de Testes - Prospecta&Vende

## 📋 Pré-requisitos
- ✅ Dev server rodando em http://localhost:8081
- ✅ npm packages instalados
- ✅ localStorage habilitado

---

## 🧪 TESTE 1: Landing Page & Navegação
**Objetivo**: Verificar design light theme e botões

### Passos:
1. Acesse http://localhost:8081
2. **Verifica Visual**:
   - [ ] Fundo branco (não dark)
   - [ ] Logo com gradient azul
   - [ ] Header com botões azuis
   - [ ] Hero section com tipografia grande
   - [ ] Cards de features com ícones
   - [ ] Comparação Planilhas vs Prospecta
   - [ ] Testimonials com 5 stars
   - [ ] 3 cards de pricing (Starter/Pro/Equipe)
   - [ ] FAQ com accordion
   - [ ] Footer com links

3. **Testa "Ver Demo"**:
   - [ ] Clica "Ver Demo" (header)
   - [ ] Deve ir para `/select-user`
   - [ ] Ver grid de usuários

4. **Testa "Ver Demo Completa"**:
   - [ ] Clica "Ver Demo Completa" (hero section)
   - [ ] Deve ir para `/select-user`
   - [ ] Ver grid de usuários

---

## 🧪 TESTE 2: Select User
**Objetivo**: Verificar seleção de usuário e localStorage

### Passos:
1. Na página `/select-user`, você verá 7 usuários em 2 times
2. **Testa Time Alpha - SDR**:
   - [ ] Clica em "João Silva" (SDR)
   - [ ] Vê animação/transição
   - [ ] Vai para `/app/dashboard`
   - [ ] Nome "João Silva" aparece no header

3. **Testa localStorage**:
   - [ ] Abre DevTools (F12)
   - [ ] Vai em Application → Local Storage
   - [ ] Verifica `mockCurrentUser` com dados do João
   - [ ] Recarrega a página (F5)
   - [ ] Continua no Dashboard com João logado ✅

4. **Testa Trocar Usuário**:
   - [ ] Clica avatar (header direito)
   - [ ] Dropdown aparece com email
   - [ ] Clica "Trocar Usuário"
   - [ ] Volta para `/select-user`
   - [ ] Seleciona outro usuário (ex: Maria - BDR)
   - [ ] localStorage atualiza para Maria ✅

---

## 🧪 TESTE 3: Dashboard
**Objetivo**: Verificar exibição correta de dados e navegação

### Passos:
1. Estando no Dashboard como João (SDR)
2. **Verifica Stats**:
   - [ ] Card "Leads Ativos" mostra número
   - [ ] Card "Taxa Conversão" mostra %
   - [ ] Card "Valor Médio Deal" mostra R$
   - [ ] Card "Atividades" mostra número

3. **Verifica Metas**:
   - [ ] "Leads Criados por Dia" com progress bar
   - [ ] Valores "Atual" vs "Meta"
   - [ ] Se atingida 100%, tem badge verde

4. **Verifica Team**:
   - [ ] Card mostra "Time Alpha"
   - [ ] Lista usuários do time com avatares
   - [ ] Badges de role (SDR/BDR/Closer)

5. **Verifica Funil**:
   - [ ] Visualização de leads por stage
   - [ ] Cores diferentes por estágio
   - [ ] Contadores corretos

---

## 🧪 TESTE 4: Leads Page & Tabs
**Objetivo**: Verificar filtros, tabs e dialog de novo lead

### Passos:
1. Clica "Leads" no sidebar
2. **Verifica Search**:
   - [ ] Input com ícone de search
   - [ ] Digita nome de lead (ex: "Acme")
   - [ ] Filtra leads em tempo real
   - [ ] Limpa e restaura lista completa

3. **Verifica Tabs**:
   - [ ] Tab "Prospecção (SDR)" - com contador
   - [ ] Tab "Qualificação (BDR)" - com contador
   - [ ] Tab "Fechamento (Closer)" - com contador
   - [ ] Tab "Finalizados" - com contador
   - [ ] Clica cada tab e ve leads agrupados corretamente

4. **Testa "Novo Lead"**:
   - [ ] Clica botão "Novo Lead" (azul, direito superior)
   - [ ] Dialog abre com título "Novo Lead"
   - [ ] Preenche campos:
     - Nome: "Empresa XYZ"
     - Email: "contato@xyz.com"
     - Telefone: "(11) 98765-4321"
     - Empresa: "XYZ LTDA"
     - Cargo: "CFO"
     - Fonte: "LinkedIn"
     - Valor: "50000"
     - Interesse: "Consultoria"
     - Notas: "Teste de novo lead"
   - [ ] Clica "Criar Lead"
   - [ ] Botão mostra "Salvando..."
   - [ ] Toast verde aparece: "Lead criado!"
   - [ ] Dialog fecha
   - [ ] Form resetou (campos vazios)

5. **Testa Cancelar**:
   - [ ] Clica "Novo Lead" novamente
   - [ ] Preenche alguns campos
   - [ ] Clica "Cancelar"
   - [ ] Dialog fecha sem salvar ✅

---

## 🧪 TESTE 5: Atividades Page & Tabs
**Objetivo**: Verificar atividades e dialog

### Passos:
1. Clica "Atividades" no sidebar
2. **Verifica Cards Resumo**:
   - [ ] Card "Pendentes" com ícone clock laranja
   - [ ] Card "Concluídas" com ícone checkmark verde
   - [ ] Card "Total" com ícone calendar azul
   - [ ] Números condizem com dados

3. **Verifica Tabs**:
   - [ ] Tab "Pendentes" com contador
   - [ ] Tab "Concluídas" com contador
   - [ ] Tab "Todas" com contador
   - [ ] Clica cada tab e ve atividades corretas

4. **Testa "Nova Atividade"**:
   - [ ] Clica "Nova Atividade"
   - [ ] Dialog abre
   - [ ] **Lead Select**:
     - [ ] Clica select
     - [ ] Dropdown mostra apenas leads do João (SDR)
     - [ ] Listas filtradas corretamente
   - [ ] **Preenche:**
     - Lead: seleciona primeira opção
     - Tipo: "Ligação"
     - Título: "Follow-up com CEO"
     - Descrição: "Abordar sobre novo pacote"
     - Agendado para: "Amanhã às 14h" (datetime-local)
   - [ ] Clica "Criar Atividade"
   - [ ] Botão mostra "Salvando..."
   - [ ] Toast verde: "Atividade criada!"
   - [ ] Dialog fecha

5. **Testa Cancelar**:
   - [ ] Clica "Nova Atividade"
   - [ ] Preenche alguns campos
   - [ ] Clica "Cancelar"
   - [ ] Dialog fecha ✅

---

## 🧪 TESTE 6: Metas Page & Tabs
**Objetivo**: Verificar metas com progress

### Passos:
1. Clica "Metas" no sidebar
2. **Verifica Cards Resumo**:
   - [ ] "Minhas Metas" com contador
   - [ ] "Atingidas" com ícone checkmark verde
   - [ ] "Metas do Time" com ícone users

3. **Verifica Tabs**:
   - [ ] Tab "Minhas Metas"
   - [ ] Tab "Metas do Time"
   - [ ] Clica e ve cards diferentes

4. **Verifica Goal Cards**:
   - [ ] Ícone + label (ex: "Leads Criados por Dia")
   - [ ] Progress bar visual
   - [ ] Percentual (0%-100%)
   - [ ] Valores "Atual" e "Meta"
   - [ ] Se 100%: Badge verde "Atingida"
   - [ ] Se <100%: Texto "Faltam X para atingir"

---

## 🧪 TESTE 7: Relatórios & Gráficos
**Objetivo**: Verificar gráficos e abas

### Passos:
1. Clica "Relatórios" no sidebar
2. **Verifica Cards**:
   - [ ] "Total de Leads" com ícone target
   - [ ] "Deals Fechados" com ícone trophy
   - [ ] "Receita Total" com R$ e ícone dólar
   - [ ] "Taxa Conversão" com %

3. **Verifica Tabs**:
   - [ ] Tab "Funil" 
     - [ ] Bar chart mostrando estágios (SDR/BDR/Closer/Ganhos)
     - [ ] Cores diferentes por estágio
     - [ ] 3 cards com % de conversão entre etapas
   
   - [ ] Tab "Performance"
     - [ ] Bar chart com Leads/Atividades/Deals por vendedor
     - [ ] Tabela com detalhamento (Nome/Papel/Leads/Atividades/Deals/Receita)
   
   - [ ] Tab "Canais"
     - [ ] Bar chart mostrando leads vs ganhos por canal
     - [ ] Tabela com Canal/Leads/Ganhos/Taxa/Receita
   
   - [ ] Tab "Status"
     - [ ] Pie chart com cores diferentes
     - [ ] Labels com nomes e percentuais
     - [ ] Grid com legenda abaixo

---

## 🧪 TESTE 8: User Dropdown & Logout
**Objetivo**: Verificar menu de usuário

### Passos:
1. No Dashboard, clica avatar (header direito)
2. **Verifica Dropdown**:
   - [ ] Mostra "Minha Conta"
   - [ ] Exibe email do usuário
   - [ ] Separador visual
   - [ ] Botão "Trocar Usuário"
   - [ ] Botão "Sair" em vermelho

3. **Testa "Trocar Usuário"**:
   - [ ] Clica "Trocar Usuário"
   - [ ] Vai para `/select-user`
   - [ ] Seleciona outro usuário
   - [ ] localStorage atualiza
   - [ ] Dashboard carrega com novo usuário ✅

4. **Testa "Sair"**:
   - [ ] Clica "Sair"
   - [ ] localStorage é limpo
   - [ ] Vai para Landing page
   - [ ] URL muda para `/`
   - [ ] Clica "Ver Demo"
   - [ ] Volta para `/select-user` (sem usuário pré-selecionado) ✅

---

## 🧪 TESTE 9: Responsividade
**Objetivo**: Verificar design em mobile

### Passos:
1. Abra DevTools (F12)
2. Ativa device emulation (Ctrl+Shift+M)
3. Seleciona "iPhone 12" (390x844)

4. **Verifica em cada página**:
   - [ ] Landing: Stack vertical, legível
   - [ ] Header: SidebarTrigger visível
   - [ ] Sidebar: Collapsa em mobile
   - [ ] Cards: Stack em 1 coluna
   - [ ] Dialogs: Cabe na tela
   - [ ] Tabs: Scrollável horizontalmente se precisar
   - [ ] Sem overflow horizontal

---

## 🧪 TESTE 10: localStorage Persistence
**Objetivo**: Verificar salvamento de estado

### Passos:
1. Loga como João (SelectUser)
2. Vai para Dashboard
3. Clica em Leads
4. Abre DevTools → Application → Local Storage
5. **Verifica**:
   - [ ] `mockCurrentUser` existe
   - [ ] Contém dados de João (id, name, email, role)
   - [ ] Recarrega página (F5)
   - [ ] Continua em Dashboard como João
   - [ ] localStorage não foi apagado

6. **Testa Logout**:
   - [ ] Clica avatar → "Sair"
   - [ ] localStorage é vazio/removido
   - [ ] Está em Landing page ✅

---

## ✅ Checklist Final

- [ ] Landing page em tema light
- [ ] Botões demo vão para select-user
- [ ] SelectUser salva em localStorage
- [ ] Dashboard exibe dados corretos
- [ ] Todas as 4 abas de Leads funcionam
- [ ] Novo Lead dialog funciona com validação
- [ ] Todas as 3 abas de Atividades funcionam
- [ ] Nova Atividade filtra leads do usuário
- [ ] Metas mostram progress visual
- [ ] Relatórios com gráficos funcionando
- [ ] User dropdown com trocar/sair
- [ ] Logout limpa localStorage
- [ ] Responsive em mobile
- [ ] Build sem erros

---

**🎉 Se todos os testes passarem = PRONTO PARA PRODUÇÃO!**

---

## 🐛 Se algo não funcionar:

1. **Erros de console**:
   - Abra DevTools (F12)
   - Clique em "Console"
   - Procure por erros vermelhos

2. **Página em branco**:
   - Recarregue (Ctrl+Shift+R - hard refresh)
   - Limpe cache do navegador

3. **localStorage não funciona**:
   - Verifique se está habilitado
   - Não está em modo privado/incognito

4. **Dev server não responde**:
   - Terminal: `npm run dev`
   - Espere "VITE ready"
   - Recarregue o navegador

---

**Dúvidas?** Contate a equipe de desenvolvimento! 🚀
