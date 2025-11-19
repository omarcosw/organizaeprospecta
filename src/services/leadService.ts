/**
 * Lead Service
 * 
 * Gerencia todas as operações relacionadas a leads (prospects).
 * Inclui criação, atualização, listagem e filtros.
 */

import { supabase } from "@/integrations/supabase/client";
import { Lead, LeadWithRelations, LeadFilters } from "@/types";

/**
 * Busca todos os leads de um workspace com dados relacionados
 * Inclui informações de etapa do funil e dono do lead
 */
export const getLeads = async (
  workspaceId: string,
  filters?: LeadFilters
): Promise<LeadWithRelations[]> => {
  try {
    let query = supabase
      .from("leads")
      .select(`
        *,
        pipeline_stages (id, name, order_index),
        profiles (id, name, email)
      `)
      .eq("workspace_id", workspaceId);

    // Aplicar filtros opcionais
    if (filters?.stage_id) {
      query = query.eq("pipeline_stage_id", filters.stage_id);
    }
    if (filters?.owner_id) {
      query = query.eq("owner_id", filters.owner_id);
    }
    if (filters?.source_channel) {
      query = query.eq("source_channel", filters.source_channel);
    }
    if (filters?.date_from) {
      query = query.gte("created_at", filters.date_from);
    }
    if (filters?.date_to) {
      query = query.lte("created_at", filters.date_to);
    }

    query = query.order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error("Erro ao buscar leads:", error);
      return [];
    }

    return (data || []) as LeadWithRelations[];
  } catch (error) {
    console.error("Erro ao buscar leads:", error);
    return [];
  }
};

/**
 * Busca um lead específico por ID com todas as relações
 */
export const getLeadById = async (leadId: string): Promise<LeadWithRelations | null> => {
  try {
    const { data, error } = await supabase
      .from("leads")
      .select(`
        *,
        pipeline_stages (id, name, order_index),
        profiles (id, name, email)
      `)
      .eq("id", leadId)
      .single();

    if (error || !data) {
      console.error("Erro ao buscar lead:", error);
      return null;
    }

    return data as unknown as LeadWithRelations;
  } catch (error) {
    console.error("Erro ao buscar lead:", error);
    return null;
  }
};

/**
 * Cria um novo lead
 */
export const createLead = async (
  leadData: Omit<Lead, "id" | "created_at" | "updated_at" | "closed_at" | "closed_status">
): Promise<Lead | null> => {
  try {
    const { data, error } = await supabase
      .from("leads")
      .insert(leadData as any)
      .select()
      .single();

    if (error || !data) {
      console.error("Erro ao criar lead:", error);
      return null;
    }

    return data as Lead;
  } catch (error) {
    console.error("Erro ao criar lead:", error);
    return null;
  }
};

/**
 * Atualiza um lead existente
 */
export const updateLead = async (
  leadId: string,
  updates: Partial<Lead>
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("leads")
      .update(updates)
      .eq("id", leadId);

    if (error) {
      console.error("Erro ao atualizar lead:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro ao atualizar lead:", error);
    return false;
  }
};

/**
 * Move um lead para outra etapa do funil
 */
export const moveLeadToStage = async (
  leadId: string,
  newStageId: string
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("leads")
      .update({ pipeline_stage_id: newStageId })
      .eq("id", leadId);

    if (error) {
      console.error("Erro ao mover lead:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro ao mover lead:", error);
    return false;
  }
};

/**
 * Marca um lead como ganho ou perdido
 */
export const closeLead = async (
  leadId: string,
  status: "ganho" | "perdido"
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("leads")
      .update({
        closed_status: status,
        closed_at: new Date().toISOString(),
      })
      .eq("id", leadId);

    if (error) {
      console.error("Erro ao fechar lead:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro ao fechar lead:", error);
    return false;
  }
};

/**
 * Deleta um lead
 */
export const deleteLead = async (leadId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("leads")
      .delete()
      .eq("id", leadId);

    if (error) {
      console.error("Erro ao deletar lead:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro ao deletar lead:", error);
    return false;
  }
};

/**
 * Busca estatísticas agregadas de leads para o dashboard
 */
export const getLeadStats = async (workspaceId: string) => {
  try {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const inicioSemana = new Date();
    inicioSemana.setDate(hoje.getDate() - hoje.getDay());
    inicioSemana.setHours(0, 0, 0, 0);

    const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);

    // Buscar todos os leads do workspace
    const { data: leads } = await supabase
      .from("leads")
      .select("*")
      .eq("workspace_id", workspaceId);

    if (!leads) return null;

    // Calcular estatísticas
    const novosHoje = leads.filter(
      (l) => new Date(l.created_at) >= hoje
    ).length;

    const ativos = leads.filter((l) => !l.closed_status).length;

    const fechadosMes = leads.filter(
      (l) =>
        l.closed_status === "ganho" &&
        l.closed_at &&
        new Date(l.closed_at) >= inicioMes
    ).length;

    const receitaMes = leads
      .filter(
        (l) =>
          l.closed_status === "ganho" &&
          l.closed_at &&
          new Date(l.closed_at) >= inicioMes
      )
      .reduce((sum, l) => sum + (l.estimated_value || 0), 0);

    return {
      novosHoje,
      ativos,
      fechadosMes,
      receitaMes,
    };
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);
    return null;
  }
};
