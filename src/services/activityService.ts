/**
 * Activity Service
 * 
 * Gerencia atividades de prospecção (ligações, emails, reuniões, etc).
 * Atividades podem estar vinculadas a um lead específico ou serem gerais.
 */

import { supabase } from "@/integrations/supabase/client";
import { Activity, ActivityWithRelations, ActivityType } from "@/types";

/**
 * Busca todas as atividades de um workspace
 */
export const getActivities = async (
  workspaceId: string,
  options?: {
    status?: "pendente" | "concluida";
    userId?: string;
    leadId?: string;
    dateFrom?: string;
    dateTo?: string;
  }
): Promise<ActivityWithRelations[]> => {
  try {
    let query = supabase
      .from("activities")
      .select(`
        *,
        leads (id, name, company),
        profiles (id, name, email)
      `)
      .eq("workspace_id", workspaceId);

    // Aplicar filtros opcionais
    if (options?.status) {
      query = query.eq("status", options.status);
    }
    if (options?.userId) {
      query = query.eq("user_id", options.userId);
    }
    if (options?.leadId) {
      query = query.eq("lead_id", options.leadId);
    }
    if (options?.dateFrom) {
      query = query.gte("scheduled_for", options.dateFrom);
    }
    if (options?.dateTo) {
      query = query.lte("scheduled_for", options.dateTo);
    }

    query = query.order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error("Erro ao buscar atividades:", error);
      return [];
    }

    return (data || []) as ActivityWithRelations[];
  } catch (error) {
    console.error("Erro ao buscar atividades:", error);
    return [];
  }
};

/**
 * Busca atividades pendentes para hoje do usuário
 */
export const getTodayActivities = async (
  workspaceId: string,
  userId: string
): Promise<ActivityWithRelations[]> => {
  try {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    const amanha = new Date(hoje);
    amanha.setDate(amanha.getDate() + 1);

    const { data, error } = await supabase
      .from("activities")
      .select(`
        *,
        leads (id, name, company, phone, email),
        profiles (id, name)
      `)
      .eq("workspace_id", workspaceId)
      .eq("user_id", userId)
      .eq("status", "pendente")
      .gte("scheduled_for", hoje.toISOString())
      .lt("scheduled_for", amanha.toISOString())
      .order("scheduled_for", { ascending: true });

    if (error) {
      console.error("Erro ao buscar atividades de hoje:", error);
      return [];
    }

    return (data || []) as ActivityWithRelations[];
  } catch (error) {
    console.error("Erro ao buscar atividades:", error);
    return [];
  }
};

/**
 * Busca atividades atrasadas (pendentes com data anterior a hoje)
 */
export const getOverdueActivities = async (
  workspaceId: string,
  userId: string
): Promise<ActivityWithRelations[]> => {
  try {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const { data, error } = await supabase
      .from("activities")
      .select(`
        *,
        leads (id, name, company, phone, email),
        profiles (id, name)
      `)
      .eq("workspace_id", workspaceId)
      .eq("user_id", userId)
      .eq("status", "pendente")
      .lt("scheduled_for", hoje.toISOString())
      .order("scheduled_for", { ascending: true });

    if (error) {
      console.error("Erro ao buscar atividades atrasadas:", error);
      return [];
    }

    return (data || []) as ActivityWithRelations[];
  } catch (error) {
    console.error("Erro ao buscar atividades:", error);
    return [];
  }
};

/**
 * Busca histórico de atividades de um lead específico
 */
export const getLeadActivities = async (leadId: string): Promise<ActivityWithRelations[]> => {
  try {
    const { data, error } = await supabase
      .from("activities")
      .select(`
        *,
        profiles (id, name)
      `)
      .eq("lead_id", leadId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao buscar atividades do lead:", error);
      return [];
    }

    return (data || []) as ActivityWithRelations[];
  } catch (error) {
    console.error("Erro ao buscar atividades:", error);
    return [];
  }
};

/**
 * Cria uma nova atividade
 */
export const createActivity = async (
  activityData: Omit<Activity, "id" | "created_at">
): Promise<Activity | null> => {
  try {
    const { data, error } = await supabase
      .from("activities")
      .insert(activityData as any)
      .select()
      .single();

    if (error || !data) {
      console.error("Erro ao criar atividade:", error);
      return null;
    }

    return data as Activity;
  } catch (error) {
    console.error("Erro ao criar atividade:", error);
    return null;
  }
};

/**
 * Marca uma atividade como concluída
 */
export const completeActivity = async (
  activityId: string,
  result?: string
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("activities")
      .update({
        status: "concluida",
        completed_at: new Date().toISOString(),
        result: result || null,
      })
      .eq("id", activityId);

    if (error) {
      console.error("Erro ao completar atividade:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro ao completar atividade:", error);
    return false;
  }
};

/**
 * Atualiza uma atividade existente
 */
export const updateActivity = async (
  activityId: string,
  updates: Partial<Activity>
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("activities")
      .update(updates)
      .eq("id", activityId);

    if (error) {
      console.error("Erro ao atualizar atividade:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro ao atualizar atividade:", error);
    return false;
  }
};

/**
 * Deleta uma atividade
 */
export const deleteActivity = async (activityId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("activities")
      .delete()
      .eq("id", activityId);

    if (error) {
      console.error("Erro ao deletar atividade:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro ao deletar atividade:", error);
    return false;
  }
};

/**
 * Registra automaticamente uma atividade quando algo acontece
 * (ex: lead criado, lead mudou de etapa, etc)
 */
export const logActivity = async (
  workspaceId: string,
  userId: string,
  leadId: string | null,
  type: ActivityType,
  title: string,
  description?: string
): Promise<void> => {
  try {
    await createActivity({
      workspace_id: workspaceId,
      user_id: userId,
      lead_id: leadId,
      type,
      title,
      description: description || null,
      status: "concluida",
      result: null,
      scheduled_for: null,
      completed_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Erro ao registrar atividade:", error);
  }
};
