# 🎯 COMO USAR O PROSPECTA&VENDE

## 🚀 ACESSO RÁPIDO

### Opção 1: Tela de Seleção de Usuário (RECOMENDADO)

```
http://localhost:8080/select-user
```

**O que você vai ver:**
- Grid com todos os usuários disponíveis
- Organizado por times (Time Alpha e Time Beta)
- Badges coloridos mostrando o papel de cada um
- Clique em qualquer usuário para entrar como ele

**Usuários disponíveis:**

#### 🟦 Time Alpha
1. **João Silva** - SDR (azul)
   - Vê leads em prospecção
   - Pode criar leads
   - Meta: 5 leads/dia

2. **Maria Santos** - BDR (roxo)
   - Vê leads para qualificar
   - Pode agendar reuniões
   - Meta: 3 leads qualificados/dia

3. **Carlos Oliveira** - Closer (verde)
   - Vê leads em negociação
   - Pode fechar deals
   - Meta: 8 deals/mês

4. **Roberto Mendes** - Gestor (laranja)
   - Vê tudo do time
   - Dashboard completo
   - Relatórios

#### 🟦 Time Beta
5. **Ana Paula Costa** - SDR
6. **Pedro Almeida** - BDR
7. **Juliana Ferreira** - Closer

---

### Opção 2: Login Normal

```
http://localhost:8080/login
```

**Credenciais:** Qualquer email/senha (é mock!)

Após o login, você será redirecionado para a **tela de seleção de usuário**.

---

## 📱 NAVEGAÇÃO

Depois de selecionar um usuário, você terá acesso a:

### 1. **Dashboard** (`/app/dashboard`)
- Métricas do usuário
- Progresso de metas
- Card do seu time
- Funil de vendas por etapa

### 2. **Leads** (`/app/leads`)
- **4 Tabs** por etapa:
  - Prospecção (SDR)
  - Qualificação (BDR)
  - Fechamento (Closer)
  - Finalizados
- **Busca** por nome/empresa/email
- **Clique em um lead** para ver:
  - Jornada visual completa (SDR → BDR → Closer)
  - Quem prospectou, qualificou e está fechando
  - Informações completas
  - Próximos passos
- **Botão "Novo Lead"** - Formulário completo

### 3. **Atividades** (`/app/activities`)
- **3 Tabs**:
  - Pendentes
  - Concluídas
  - Todas
- Lead relacionado em cada atividade
- Indicador de atividades atrasadas
- **Botão "Nova Atividade"** - Formulário com:
  - Select de lead
  - Tipo (Ligação, WhatsApp, Email, Reunião, Nota)
  - Data/hora de agendamento

### 4. **Metas** (`/app/goals`)
- **Tab "Minhas Metas"**:
  - Progresso visual
  - Cálculo automático
  - Indicador de quanto falta
- **Tab "Metas do Time"**:
  - Metas coletivas
  - Performance do time

### 5. **Relatórios** (`/app/reports`)
- **4 Tabs com gráficos**:
  1. **Funil de Conversão**
     - Gráfico de barras por etapa
     - Taxas de conversão (SDR→BDR, BDR→Closer, Closer→Ganho)

  2. **Performance por Vendedor**
     - Gráfico comparativo (SDR/BDR/Closer)
     - Tabela com leads, atividades, deals e receita

  3. **Performance por Canal**
     - Gráfico de canais de aquisição
     - Tabela com taxa de conversão e receita

  4. **Distribuição por Status**
     - Gráfico de pizza
     - Legenda com valores absolutos

---

## 🎮 TESTANDO DIFERENTES PAPÉIS

### Como SDR (João Silva ou Ana Paula):
1. Acesse `/select-user`
2. Clique em **João Silva** (Time Alpha)
3. Você verá:
   - Dashboard com **2 leads** em prospecção
   - Meta de **5 leads/dia**
   - Atividades de prospecção (ligações, whatsapp)
   - Pode criar novos leads

### Como BDR (Maria Santos ou Pedro Almeida):
1. Acesse `/select-user`
2. Clique em **Maria Santos** (Time Alpha)
3. Você verá:
   - Dashboard com **2 leads** para qualificar
   - Meta de **3 leads qualificados/dia**
   - Atividades de qualificação (reuniões, emails)
   - Leads que vieram do SDR

### Como Closer (Carlos Oliveira ou Juliana Ferreira):
1. Acesse `/select-user`
2. Clique em **Carlos Oliveira** (Time Alpha)
3. Você verá:
   - Dashboard com **3 leads** em negociação
   - Meta de **8 deals/mês**
   - Atividades de fechamento (reuniões, propostas)
   - Leads com reunião agendada

### Como Gestor (Roberto Mendes):
1. Acesse `/select-user`
2. Clique em **Roberto Mendes** (Time Alpha)
3. Você verá:
   - Dashboard completo do **Time Alpha**
   - Todas as metas do time
   - Relatórios detalhados
   - Performance de todos os vendedores

---

## 💡 DICAS DE USO

### 1. Trocar de Usuário
A qualquer momento, acesse:
```
http://localhost:8080/select-user
```

### 2. Ver a Jornada do Lead
1. Vá em **Leads** (`/app/leads`)
2. Clique em qualquer lead
3. No dialog que abrir, role até a seção **"Jornada do Lead"**
4. Veja a timeline visual:
   - ✅ Verde: Etapas concluídas
   - 🔵 Azul pulsando: Etapa atual
   - ⚪ Cinza: Etapas futuras

### 3. Criar Novo Lead
1. Vá em **Leads** (`/app/leads`)
2. Clique em **"Novo Lead"** (canto superior direito)
3. Preencha o formulário:
   - Nome, email, telefone, empresa (obrigatórios)
   - Fonte (select com opções)
   - Valor estimado
   - Interesse no serviço
   - Notas
4. Clique em **"Criar Lead"**

### 4. Criar Nova Atividade
1. Vá em **Atividades** (`/app/activities`)
2. Clique em **"Nova Atividade"**
3. Preencha:
   - Lead (select mostra apenas leads do usuário atual)
   - Tipo (Ligação, WhatsApp, Email, Reunião, Nota)
   - Título
   - Descrição (opcional)
   - Agendar para (datetime)
4. Clique em **"Criar Atividade"**

### 5. Ver Gráficos e Relatórios
1. Vá em **Relatórios** (`/app/reports`)
2. Navegue pelas 4 tabs
3. Veja:
   - Gráficos interativos (Recharts)
   - Tabelas detalhadas
   - Métricas calculadas automaticamente

---

## 🔄 FLUXO COMPLETO DE TESTE

### Jornada do Lead (SDR → BDR → Closer):

1. **Entre como SDR** (João Silva)
   - Vá em Leads → Novo Lead
   - Crie um lead de teste
   - Veja ele aparecer na aba "Prospecção"

2. **Troque para BDR** (Maria Santos)
   - `/select-user` → Maria Santos
   - Vá em Leads → Aba "Qualificação"
   - Veja leads prontos para qualificar
   - Clique em um para ver a jornada

3. **Troque para Closer** (Carlos Oliveira)
   - `/select-user` → Carlos Oliveira
   - Vá em Leads → Aba "Fechamento"
   - Veja leads com reunião agendada
   - Clique para ver toda a jornada visual

4. **Troque para Gestor** (Roberto Mendes)
   - `/select-user` → Roberto Mendes
   - Vá em Relatórios
   - Veja performance de todo o time

---

## 🎨 ENTENDENDO OS PAPÉIS

| Papel | Cor | Responsabilidade | O que vê no sistema |
|-------|-----|------------------|---------------------|
| **SDR** | 🟦 Azul | Prospectar e fazer primeiro contato | Leads novos, atividades de prospecção |
| **BDR** | 🟪 Roxo | Qualificar leads e agendar reuniões | Leads qualificados, atividades de qualificação |
| **Closer** | 🟩 Verde | Negociar e fechar deals | Leads em negociação, reuniões, propostas |
| **Gestor** | 🟧 Laranja | Gerenciar o time | Tudo! Dashboard completo + relatórios |

---

## 📊 DADOS MOCKADOS

O sistema tem **9 leads** em diferentes estágios:
1. **Ricardo Souza** - Novo (SDR)
2. **Fernanda Lima** - Em Prospecção (SDR)
3. **Marcos Pereira** - Qualificado para BDR
4. **Patrícia Rocha** - Em Qualificação (BDR)
5. **Bruno Martins** - Reunião Agendada (Closer)
6. **Camila Barbosa** - Em Negociação (Closer)
7. **Eduardo Campos** - Proposta Enviada (Closer)
8. **Larissa Mendes** - **GANHO** ✅
9. **Rafael Costa** - Perdido ❌

**10 atividades** de exemplo
**6 metas** configuradas
**7 usuários** em 2 times

---

## 🚀 PARA COMEÇAR

```bash
# 1. Certifique-se que o servidor está rodando
npm run dev

# 2. Acesse no navegador
http://localhost:8080/select-user

# 3. Escolha um usuário e explore!
```

---

## 🎯 ROTAS DIRETAS

```
Landing Page:       http://localhost:8080/
Login:              http://localhost:8080/login
Seleção Usuário:    http://localhost:8080/select-user
Dashboard:          http://localhost:8080/app/dashboard
Leads:              http://localhost:8080/app/leads
Atividades:         http://localhost:8080/app/activities
Metas:              http://localhost:8080/app/goals
Relatórios:         http://localhost:8080/app/reports
```

---

**🎉 Divirta-se explorando o Prospecta&Vende!**
