/**
 * MOCK DATA CENTRALIZADO - Prospecta&Vende
 *
 * Este arquivo centraliza todos os dados mockados do sistema:
 * - Usuários com papéis (SDR, BDR, Closer, Gestor)
 * - Times de vendas
 * - Leads com jornada (SDR → BDR → Closer)
 * - Atividades
 * - Metas
 *
 * IMPORTANTE: Este é apenas front-end mock. Não há backend real ainda.
 */

// ============= TIPOS =============

export type UserRole = "sdr" | "bdr" | "closer" | "gestor";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  teamId: string;
  avatar?: string;
  phone?: string;
}

export interface Team {
  id: string;
  name: string;
  members: string[]; // IDs dos usuários
  createdAt: string;
}

// Status do lead na jornada
export type LeadJourneyStatus =
  | "novo"                    // Lead acabou de entrar (SDR precisa prospectar)
  | "em_prospeccao"           // SDR está prospectando
  | "qualificado_para_bdr"    // SDR marcou como qualificado, BDR precisa pegar
  | "em_qualificacao"         // BDR está qualificando
  | "reuniao_agendada"        // BDR agendou reunião para Closer
  | "em_negociacao"           // Closer está negociando
  | "proposta_enviada"        // Closer enviou proposta
  | "ganho"                   // Deal fechado (ganho)
  | "perdido";                // Deal perdido

// Etapa da jornada (quem é responsável no momento)
export type LeadStage = "sdr" | "bdr" | "closer" | "finalizado";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position?: string;
  source: string; // "LinkedIn", "Instagram", "Indicação", etc
  serviceInterest: string;
  estimatedValue: number;

  // Jornada e responsabilidades
  status: LeadJourneyStatus;
  stage: LeadStage;
  currentOwnerId: string; // ID do usuário responsável atual
  sdrId?: string;         // Quem prospectou
  bdrId?: string;         // Quem qualificou
  closerId?: string;      // Quem está fechando

  // Datas importantes
  createdAt: string;
  lastActivityAt?: string;
  closedAt?: string;

  // Próximo passo
  nextStep?: string;
  nextStepDate?: string;

  // Notas e histórico
  notes?: string;
}

export type ActivityType =
  | "ligacao"
  | "whatsapp"
  | "email"
  | "reuniao"
  | "nota"
  | "lead_criado"
  | "mudanca_status"
  | "transferencia"; // Quando passa SDR → BDR → Closer

export type ActivityStatus = "pendente" | "concluida" | "cancelada";

export interface Activity {
  id: string;
  leadId: string;
  userId: string; // Quem criou/executou
  type: ActivityType;
  title: string;
  description?: string;
  status: ActivityStatus;
  scheduledFor?: string;
  completedAt?: string;
  createdAt: string;

  // Metadata específica
  result?: string; // "atendeu", "não atendeu", "sem interesse", etc
  metadata?: Record<string, any>; // Para dados extras (ex: duração da ligação, link da reunião)
}

export type GoalType =
  | "leads_criados_dia"
  | "leads_qualificados_dia"
  | "reunioes_agendadas_semana"
  | "deals_fechados_mes"
  | "receita_mes";

export type GoalPeriod = "daily" | "weekly" | "monthly";

export interface Goal {
  id: string;
  userId?: string; // null = meta do time
  teamId?: string;
  type: GoalType;
  targetValue: number;
  period: GoalPeriod;
  createdAt: string;
}

export interface GoalWithProgress extends Goal {
  currentValue: number;
  progressPercentage: number;
}

// ============= MOCK DATA =============

// --- USUÁRIOS ---
export const mockUsers: User[] = [
  // Time Alpha
  {
    id: "user-sdr-1",
    name: "João Silva",
    email: "joao.silva@prospectavende.com",
    role: "sdr",
    teamId: "team-alpha",
    phone: "(11) 98765-4321",
  },
  {
    id: "user-bdr-1",
    name: "Maria Santos",
    email: "maria.santos@prospectavende.com",
    role: "bdr",
    teamId: "team-alpha",
    phone: "(11) 97654-3210",
  },
  {
    id: "user-closer-1",
    name: "Carlos Oliveira",
    email: "carlos.oliveira@prospectavende.com",
    role: "closer",
    teamId: "team-alpha",
    phone: "(11) 96543-2109",
  },

  // Time Beta
  {
    id: "user-sdr-2",
    name: "Ana Paula Costa",
    email: "ana.costa@prospectavende.com",
    role: "sdr",
    teamId: "team-beta",
    phone: "(21) 98765-1234",
  },
  {
    id: "user-bdr-2",
    name: "Pedro Almeida",
    email: "pedro.almeida@prospectavende.com",
    role: "bdr",
    teamId: "team-beta",
    phone: "(21) 97654-4321",
  },
  {
    id: "user-closer-2",
    name: "Juliana Ferreira",
    email: "juliana.ferreira@prospectavende.com",
    role: "closer",
    teamId: "team-beta",
    phone: "(21) 96543-5678",
  },

  // Gestor
  {
    id: "user-gestor-1",
    name: "Roberto Mendes",
    email: "roberto.mendes@prospectavende.com",
    role: "gestor",
    teamId: "team-alpha", // Gestor do time Alpha
    phone: "(11) 95432-1098",
  },
];

// --- TIMES ---
export const mockTeams: Team[] = [
  {
    id: "team-alpha",
    name: "Time Alpha",
    members: ["user-sdr-1", "user-bdr-1", "user-closer-1", "user-gestor-1"],
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "team-beta",
    name: "Time Beta",
    members: ["user-sdr-2", "user-bdr-2", "user-closer-2"],
    createdAt: "2024-01-15T10:00:00Z",
  },
];

// --- LEADS ---
export const mockLeads: Lead[] = [
  // Lead novo (ainda com SDR)
  {
    id: "lead-1",
    name: "Ricardo Souza",
    email: "ricardo@techstartup.com",
    phone: "(11) 99876-5432",
    company: "Tech Startup LTDA",
    position: "CEO",
    source: "LinkedIn",
    serviceInterest: "Consultoria de Vendas",
    estimatedValue: 15000,

    status: "novo",
    stage: "sdr",
    currentOwnerId: "user-sdr-1",
    sdrId: "user-sdr-1",

    createdAt: "2024-11-18T14:30:00Z",
    lastActivityAt: "2024-11-18T14:30:00Z",
    nextStep: "Fazer primeira ligação de contato",
    nextStepDate: "2024-11-19T10:00:00Z",

    notes: "Lead veio do LinkedIn, interessado em melhorar processo comercial.",
  },

  // Lead em prospecção (SDR trabalhando)
  {
    id: "lead-2",
    name: "Fernanda Lima",
    email: "fernanda@agenciacriativa.com",
    phone: "(21) 98765-1234",
    company: "Agência Criativa",
    position: "Diretora Comercial",
    source: "Instagram",
    serviceInterest: "Treinamento de Equipe",
    estimatedValue: 25000,

    status: "em_prospeccao",
    stage: "sdr",
    currentOwnerId: "user-sdr-1",
    sdrId: "user-sdr-1",

    createdAt: "2024-11-16T09:00:00Z",
    lastActivityAt: "2024-11-18T16:00:00Z",
    nextStep: "Enviar WhatsApp com material sobre o serviço",
    nextStepDate: "2024-11-19T14:00:00Z",

    notes: "Já conversamos 2x, ela gostou da proposta inicial. Próximo passo: enviar case.",
  },

  // Lead qualificado, esperando BDR pegar
  {
    id: "lead-3",
    name: "Marcos Pereira",
    email: "marcos@consultoria.com.br",
    phone: "(31) 97654-3210",
    company: "Consultoria Estratégica",
    position: "Sócio-Fundador",
    source: "Indicação",
    serviceInterest: "Implantação de CRM",
    estimatedValue: 40000,

    status: "qualificado_para_bdr",
    stage: "bdr",
    currentOwnerId: "user-bdr-1",
    sdrId: "user-sdr-1",
    bdrId: "user-bdr-1",

    createdAt: "2024-11-14T11:00:00Z",
    lastActivityAt: "2024-11-17T18:00:00Z",
    nextStep: "BDR fazer ligação de qualificação",
    nextStepDate: "2024-11-19T11:00:00Z",

    notes: "SDR: Lead muito quente! Budget aprovado, decisor confirmado. BDR pode ligar direto.",
  },

  // Lead em qualificação (BDR trabalhando)
  {
    id: "lead-4",
    name: "Patrícia Rocha",
    email: "patricia@ecommerce.com",
    phone: "(41) 96543-2109",
    company: "E-commerce Fashion",
    position: "Head de Vendas",
    source: "Tráfego Pago",
    serviceInterest: "Automação de Vendas",
    estimatedValue: 35000,

    status: "em_qualificacao",
    stage: "bdr",
    currentOwnerId: "user-bdr-1",
    sdrId: "user-sdr-1",
    bdrId: "user-bdr-1",

    createdAt: "2024-11-12T08:00:00Z",
    lastActivityAt: "2024-11-18T10:30:00Z",
    nextStep: "Agendar reunião de diagnóstico",
    nextStepDate: "2024-11-20T15:00:00Z",

    notes: "BDR: Conversei com ela hoje. Fit perfeito! Vou agendar reunião com o Closer para sexta.",
  },

  // Lead com reunião agendada (vai para Closer)
  {
    id: "lead-5",
    name: "Bruno Martins",
    email: "bruno@industria.com.br",
    phone: "(51) 95432-1098",
    company: "Indústria Metálica",
    position: "Gerente de Vendas",
    source: "LinkedIn",
    serviceInterest: "Consultoria Comercial Completa",
    estimatedValue: 60000,

    status: "reuniao_agendada",
    stage: "closer",
    currentOwnerId: "user-closer-1",
    sdrId: "user-sdr-1",
    bdrId: "user-bdr-1",
    closerId: "user-closer-1",

    createdAt: "2024-11-08T10:00:00Z",
    lastActivityAt: "2024-11-18T14:00:00Z",
    nextStep: "Reunião de diagnóstico com Closer",
    nextStepDate: "2024-11-20T10:00:00Z",

    notes: "BDR: Lead qualificado! Budget: R$ 60k. Decisor: Bruno + CEO. Reunião: 20/11 às 10h (Google Meet).",
  },

  // Lead em negociação (Closer trabalhando)
  {
    id: "lead-6",
    name: "Camila Barbosa",
    email: "camila@saas.com.br",
    phone: "(11) 94321-0987",
    company: "SaaS Educacional",
    position: "COO",
    source: "Indicação",
    serviceInterest: "Estruturação de Time Comercial",
    estimatedValue: 80000,

    status: "em_negociacao",
    stage: "closer",
    currentOwnerId: "user-closer-1",
    sdrId: "user-sdr-2",
    bdrId: "user-bdr-2",
    closerId: "user-closer-1",

    createdAt: "2024-11-01T09:00:00Z",
    lastActivityAt: "2024-11-18T11:00:00Z",
    nextStep: "Enviar proposta comercial customizada",
    nextStepDate: "2024-11-19T09:00:00Z",

    notes: "Closer: Reunião foi ótima! Ela quer fechar. Ajustar proposta com desconto de 10% para pagamento à vista.",
  },

  // Lead com proposta enviada
  {
    id: "lead-7",
    name: "Eduardo Campos",
    email: "eduardo@holding.com.br",
    phone: "(21) 93210-9876",
    company: "Holding Empresarial",
    position: "CEO",
    source: "LinkedIn",
    serviceInterest: "Consultoria + Treinamento",
    estimatedValue: 120000,

    status: "proposta_enviada",
    stage: "closer",
    currentOwnerId: "user-closer-1",
    sdrId: "user-sdr-1",
    bdrId: "user-bdr-1",
    closerId: "user-closer-1",

    createdAt: "2024-10-28T14:00:00Z",
    lastActivityAt: "2024-11-17T16:00:00Z",
    nextStep: "Follow-up da proposta",
    nextStepDate: "2024-11-19T15:00:00Z",

    notes: "Closer: Proposta enviada dia 17/11. Prazo de resposta: até 22/11. Alto potencial de fechar!",
  },

  // Lead ganho
  {
    id: "lead-8",
    name: "Larissa Mendes",
    email: "larissa@consultoria.com.br",
    phone: "(31) 92109-8765",
    company: "Consultoria RH",
    position: "Sócia",
    source: "Indicação",
    serviceInterest: "CRM + Automação",
    estimatedValue: 45000,

    status: "ganho",
    stage: "finalizado",
    currentOwnerId: "user-closer-1",
    sdrId: "user-sdr-1",
    bdrId: "user-bdr-1",
    closerId: "user-closer-1",

    createdAt: "2024-10-20T10:00:00Z",
    lastActivityAt: "2024-11-15T14:30:00Z",
    closedAt: "2024-11-15T14:30:00Z",

    notes: "GANHO! Contrato assinado. Início: 01/12. Pagamento: 50% entrada + 50% em 30 dias.",
  },

  // Lead perdido
  {
    id: "lead-9",
    name: "Rafael Costa",
    email: "rafael@startup.com",
    phone: "(11) 91098-7654",
    company: "Startup Tech",
    position: "CEO",
    source: "Tráfego Pago",
    serviceInterest: "Consultoria",
    estimatedValue: 20000,

    status: "perdido",
    stage: "finalizado",
    currentOwnerId: "user-closer-1",
    sdrId: "user-sdr-2",
    bdrId: "user-bdr-2",
    closerId: "user-closer-1",

    createdAt: "2024-10-15T11:00:00Z",
    lastActivityAt: "2024-11-10T10:00:00Z",
    closedAt: "2024-11-10T10:00:00Z",

    notes: "PERDIDO. Motivo: Optaram por solução interna. Manter contato para futuras oportunidades.",
  },
];

// --- ATIVIDADES ---
export const mockActivities: Activity[] = [
  // Atividades do lead-1 (novo)
  {
    id: "activity-1",
    leadId: "lead-1",
    userId: "user-sdr-1",
    type: "lead_criado",
    title: "Lead criado",
    description: "Lead importado do LinkedIn",
    status: "concluida",
    completedAt: "2024-11-18T14:30:00Z",
    createdAt: "2024-11-18T14:30:00Z",
  },
  {
    id: "activity-2",
    leadId: "lead-1",
    userId: "user-sdr-1",
    type: "ligacao",
    title: "Primeira ligação de contato",
    description: "Ligar para fazer apresentação inicial",
    status: "pendente",
    scheduledFor: "2024-11-19T10:00:00Z",
    createdAt: "2024-11-18T14:35:00Z",
  },

  // Atividades do lead-2 (em prospecção)
  {
    id: "activity-3",
    leadId: "lead-2",
    userId: "user-sdr-1",
    type: "ligacao",
    title: "Ligação inicial",
    description: "Primeira conversa - apresentação",
    status: "concluida",
    result: "atendeu",
    completedAt: "2024-11-16T10:30:00Z",
    createdAt: "2024-11-16T10:00:00Z",
  },
  {
    id: "activity-4",
    leadId: "lead-2",
    userId: "user-sdr-1",
    type: "whatsapp",
    title: "Enviar material institucional",
    description: "Enviar PDF com cases de sucesso",
    status: "pendente",
    scheduledFor: "2024-11-19T14:00:00Z",
    createdAt: "2024-11-18T16:00:00Z",
  },

  // Atividades do lead-3 (qualificado para BDR)
  {
    id: "activity-5",
    leadId: "lead-3",
    userId: "user-sdr-1",
    type: "transferencia",
    title: "Lead transferido para BDR",
    description: "Lead qualificado e passado para Maria (BDR)",
    status: "concluida",
    completedAt: "2024-11-17T18:00:00Z",
    createdAt: "2024-11-17T18:00:00Z",
    metadata: {
      from: "user-sdr-1",
      to: "user-bdr-1",
      fromRole: "sdr",
      toRole: "bdr",
    },
  },
  {
    id: "activity-6",
    leadId: "lead-3",
    userId: "user-bdr-1",
    type: "ligacao",
    title: "Ligação de qualificação",
    description: "Aprofundar necessidades e validar fit",
    status: "pendente",
    scheduledFor: "2024-11-19T11:00:00Z",
    createdAt: "2024-11-17T18:05:00Z",
  },

  // Atividades do lead-5 (reunião agendada)
  {
    id: "activity-7",
    leadId: "lead-5",
    userId: "user-bdr-1",
    type: "transferencia",
    title: "Lead transferido para Closer",
    description: "Reunião agendada com Carlos (Closer)",
    status: "concluida",
    completedAt: "2024-11-18T14:00:00Z",
    createdAt: "2024-11-18T14:00:00Z",
    metadata: {
      from: "user-bdr-1",
      to: "user-closer-1",
      fromRole: "bdr",
      toRole: "closer",
    },
  },
  {
    id: "activity-8",
    leadId: "lead-5",
    userId: "user-closer-1",
    type: "reuniao",
    title: "Reunião de diagnóstico",
    description: "Google Meet - Diagnóstico completo das necessidades",
    status: "pendente",
    scheduledFor: "2024-11-20T10:00:00Z",
    createdAt: "2024-11-18T14:05:00Z",
    metadata: {
      meetingLink: "https://meet.google.com/abc-defg-hij",
    },
  },

  // Atividades do lead-6 (em negociação)
  {
    id: "activity-9",
    leadId: "lead-6",
    userId: "user-closer-1",
    type: "reuniao",
    title: "Reunião de apresentação",
    description: "Apresentação da solução",
    status: "concluida",
    result: "interesse confirmado",
    completedAt: "2024-11-15T11:00:00Z",
    createdAt: "2024-11-14T10:00:00Z",
  },
  {
    id: "activity-10",
    leadId: "lead-6",
    userId: "user-closer-1",
    type: "email",
    title: "Enviar proposta customizada",
    description: "Proposta com desconto de 10% para pagamento à vista",
    status: "pendente",
    scheduledFor: "2024-11-19T09:00:00Z",
    createdAt: "2024-11-18T11:00:00Z",
  },
];

// --- METAS ---
export const mockGoals: Goal[] = [
  // Metas individuais do SDR
  {
    id: "goal-1",
    userId: "user-sdr-1",
    type: "leads_criados_dia",
    targetValue: 5,
    period: "daily",
    createdAt: "2024-11-01T10:00:00Z",
  },

  // Metas individuais do BDR
  {
    id: "goal-2",
    userId: "user-bdr-1",
    type: "leads_qualificados_dia",
    targetValue: 3,
    period: "daily",
    createdAt: "2024-11-01T10:00:00Z",
  },
  {
    id: "goal-3",
    userId: "user-bdr-1",
    type: "reunioes_agendadas_semana",
    targetValue: 10,
    period: "weekly",
    createdAt: "2024-11-01T10:00:00Z",
  },

  // Metas individuais do Closer
  {
    id: "goal-4",
    userId: "user-closer-1",
    type: "deals_fechados_mes",
    targetValue: 8,
    period: "monthly",
    createdAt: "2024-11-01T10:00:00Z",
  },
  {
    id: "goal-5",
    userId: "user-closer-1",
    type: "receita_mes",
    targetValue: 200000,
    period: "monthly",
    createdAt: "2024-11-01T10:00:00Z",
  },

  // Meta do time
  {
    id: "goal-6",
    teamId: "team-alpha",
    type: "receita_mes",
    targetValue: 300000,
    period: "monthly",
    createdAt: "2024-11-01T10:00:00Z",
  },
];

// ============= FUNÇÕES AUXILIARES =============

// Usuário mockado atual (simulando login)
// Tenta pegar do localStorage, senão usa João Silva (SDR) como padrão
const getSavedUser = (): User => {
  try {
    const saved = localStorage.getItem("mockCurrentUser");
    if (saved) {
      const user = JSON.parse(saved);
      // Validar se o usuário existe na lista
      const exists = mockUsers.find(u => u.id === user.id);
      if (exists) return exists;
    }
  } catch (e) {
    console.error("Erro ao recuperar usuário salvo:", e);
  }
  return mockUsers[0]; // João Silva (SDR) como fallback
};

export const mockCurrentUser = getSavedUser();

// Buscar usuário por ID
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(u => u.id === id);
};

// Buscar usuários por papel
export const getUsersByRole = (role: UserRole): User[] => {
  return mockUsers.filter(u => u.role === role);
};

// Buscar time por ID
export const getTeamById = (id: string): Team | undefined => {
  return mockTeams.find(t => t.id === id);
};

// Buscar membros de um time
export const getTeamMembers = (teamId: string): User[] => {
  const team = getTeamById(teamId);
  if (!team) return [];
  return mockUsers.filter(u => team.members.includes(u.id));
};

// Buscar leads por responsável
export const getLeadsByOwner = (userId: string): Lead[] => {
  return mockLeads.filter(l => l.currentOwnerId === userId);
};

// Buscar leads por stage
export const getLeadsByStage = (stage: LeadStage): Lead[] => {
  return mockLeads.filter(l => l.stage === stage);
};

// Buscar atividades por lead
export const getActivitiesByLead = (leadId: string): Activity[] => {
  return mockActivities.filter(a => a.leadId === leadId);
};

// Buscar atividades pendentes de um usuário
export const getPendingActivitiesByUser = (userId: string): Activity[] => {
  return mockActivities.filter(a =>
    a.userId === userId &&
    a.status === "pendente"
  ).sort((a, b) => {
    if (!a.scheduledFor) return 1;
    if (!b.scheduledFor) return -1;
    return new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime();
  });
};

// Buscar metas de um usuário
export const getGoalsByUser = (userId: string): Goal[] => {
  return mockGoals.filter(g => g.userId === userId);
};

// Buscar metas de um time
export const getGoalsByTeam = (teamId: string): Goal[] => {
  return mockGoals.filter(g => g.teamId === teamId);
};

// Estatísticas rápidas
export const getStats = (userId: string) => {
  const myLeads = getLeadsByOwner(userId);
  const myActivities = getPendingActivitiesByUser(userId);

  return {
    totalLeads: myLeads.length,
    activeLeads: myLeads.filter(l => l.stage !== "finalizado").length,
    pendingActivities: myActivities.length,
    leadsWonThisMonth: mockLeads.filter(l =>
      l.closerId === userId &&
      l.status === "ganho" &&
      l.closedAt &&
      new Date(l.closedAt).getMonth() === new Date().getMonth()
    ).length,
  };
};

// Estatísticas do time
export const getTeamStats = (teamId: string) => {
  const teamMembers = getTeamMembers(teamId);
  const memberIds = teamMembers.map(m => m.id);

  const teamLeads = mockLeads.filter(l => memberIds.includes(l.currentOwnerId));

  return {
    totalLeads: teamLeads.length,
    activeLeads: teamLeads.filter(l => l.stage !== "finalizado").length,
    leadsWonThisMonth: teamLeads.filter(l =>
      l.status === "ganho" &&
      l.closedAt &&
      new Date(l.closedAt).getMonth() === new Date().getMonth()
    ).length,
    revenueThisMonth: teamLeads
      .filter(l =>
        l.status === "ganho" &&
        l.closedAt &&
        new Date(l.closedAt).getMonth() === new Date().getMonth()
      )
      .reduce((sum, l) => sum + l.estimatedValue, 0),
  };
};
