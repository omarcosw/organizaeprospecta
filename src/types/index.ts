/**
 * Tipos TypeScript centralizados do Organiza&Prospecta
 * 
 * Estes tipos espelham a estrutura do banco de dados Supabase
 * e são usados em toda a aplicação para garantir type safety.
 */

// ============= CORE TYPES =============

export interface User {
  id: string;
  email: string;
  name?: string;
  created_at?: string;
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

// ============= WORKSPACE TYPES =============

export interface Workspace {
  id: string;
  name: string;
  main_service: string | null;
  average_ticket: number | null;
  created_at: string;
}

export interface WorkspaceUser {
  id: string;
  workspace_id: string;
  user_id: string;
  role: 'sdr' | 'gestor' | 'admin';
  created_at: string;
}

// ============= PIPELINE TYPES =============

export interface Pipeline {
  id: string;
  workspace_id: string;
  name: string;
  is_default: boolean;
  created_at: string;
}

export interface PipelineStage {
  id: string;
  pipeline_id: string;
  name: string;
  order_index: number;
  created_at: string;
}

// ============= LEAD TYPES =============

export interface Lead {
  id: string;
  workspace_id: string;
  pipeline_id: string;
  pipeline_stage_id: string;
  owner_id: string;
  name: string;
  company: string | null;
  email: string | null;
  phone: string | null;
  source_channel: string | null;
  service_interest: string | null;
  estimated_value: number | null;
  next_step: string | null;
  next_step_date: string | null;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  closed_status: 'ganho' | 'perdido' | null;
}

// Lead com dados relacionados (joins)
export interface LeadWithRelations extends Lead {
  pipeline_stages?: Partial<PipelineStage>;
  profiles?: Partial<Profile>;
  last_activity?: Activity;
}

// ============= ACTIVITY TYPES =============

export type ActivityType = 
  | 'ligacao' 
  | 'whatsapp' 
  | 'email' 
  | 'reuniao' 
  | 'nota' 
  | 'lead_criado' 
  | 'mudanca_etapa';

export type ActivityStatus = 'pendente' | 'concluida';

export type ActivityResult = 
  | 'atendeu' 
  | 'nao_atendeu' 
  | 'sem_resposta' 
  | 'sem_interesse' 
  | 'em_negociacao'
  | null;

export interface Activity {
  id: string;
  workspace_id: string;
  lead_id: string | null;
  user_id: string;
  type: ActivityType;
  title: string;
  description: string | null;
  status: ActivityStatus;
  result: ActivityResult;
  scheduled_for: string | null;
  completed_at: string | null;
  created_at: string;
}

// Activity com dados relacionados
export interface ActivityWithRelations extends Activity {
  leads?: Partial<Lead>;
  profiles?: Partial<Profile>;
}

// ============= GOAL TYPES =============

export type GoalType = 
  | 'leads_por_dia' 
  | 'atividades_por_dia' 
  | 'negocios_por_mes' 
  | 'receita_por_mes';

export type GoalPeriod = 'daily' | 'monthly';

export interface Goal {
  id: string;
  workspace_id: string;
  user_id: string | null; // null = meta da equipe
  type: GoalType;
  target_value: number;
  period: GoalPeriod;
  created_at: string;
}

// Goal com progresso calculado
export interface GoalWithProgress extends Goal {
  current_value: number;
  progress_percentage: number;
}

// ============= DASHBOARD TYPES =============

export interface DashboardStats {
  novosLeadsHoje: number;
  leadsAtivos: number;
  reunioesEstaSemana: number;
  negociosFechadosMes: number;
  receitaMes: number;
}

export interface FunnelStageData {
  stage_name: string;
  count: number;
  percentage: number;
}

// ============= FORM TYPES =============

export interface LeadFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  source_channel: string;
  service_interest: string;
  estimated_value: string;
}

export interface ActivityFormData {
  type: ActivityType;
  title: string;
  description: string;
  scheduled_for: string | null;
  lead_id: string | null;
}

// ============= FILTER TYPES =============

export interface LeadFilters {
  stage_id?: string;
  owner_id?: string;
  source_channel?: string;
  date_from?: string;
  date_to?: string;
}

export interface DateRange {
  from: Date;
  to: Date;
}
