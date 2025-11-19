/**
 * Goal Service
 * 
 * Gerencia metas de prospecção (diárias e mensais).
 * Calcula progresso baseado em dados reais de leads e atividades.
 */

import { supabase } from "@/integrations/supabase/client";
import { Goal, GoalWithProgress, GoalType, GoalPeriod } from "@/types";

/**
 * Busca todas as metas de um workspace
 */
export const getGoals = async (
  workspaceId: string,
  userId?: string
): Promise<Goal[]> => {
  try {
    let query = supabase
      .from("goals")
      .select("*")
      .eq("workspace_id", workspaceId);

    // Se userId fornecido, buscar metas pessoais + metas da equipe (user_id null)
    if (userId) {
      query = query.or(`user_id.eq.${userId},user_id.is.null`);
    }

    query = query.order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error("Erro ao buscar metas:", error);
      return [];
    }

    return (data || []) as Goal[];
  } catch (error) {
    console.error("Erro ao buscar metas:", error);
    return [];
  }
};

/**
 * Busca metas com progresso calculado
 */
export const getGoalsWithProgress = async (
  workspaceId: string,
  userId?: string
): Promise<GoalWithProgress[]> => {
  try {
    const goals = await getGoals(workspaceId, userId);
    const goalsWithProgress: GoalWithProgress[] = [];

    for (const goal of goals) {
      const currentValue = await calculateGoalProgress(goal, workspaceId, userId);
      const progressPercentage = goal.target_value > 0 
        ? Math.round((currentValue / goal.target_value) * 100) 
        : 0;

      goalsWithProgress.push({
        ...goal,
        current_value: currentValue,
        progress_percentage: Math.min(progressPercentage, 100), // Cap at 100%
      });
    }

    return goalsWithProgress;
  } catch (error) {
    console.error("Erro ao buscar metas com progresso:", error);
    return [];
  }
};

/**
 * Calcula o progresso atual de uma meta baseado no período e tipo
 */
const calculateGoalProgress = async (
  goal: Goal,
  workspaceId: string,
  userId?: string
): Promise<number> => {
  try {
    const now = new Date();
    let startDate: Date;

    // Definir período de cálculo
    if (goal.period === "daily") {
      startDate = new Date(now);
      startDate.setHours(0, 0, 0, 0);
    } else {
      // monthly
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    // Calcular baseado no tipo de meta
    switch (goal.type) {
      case "leads_por_dia":
      case "negocios_por_mes": {
        let query = supabase
          .from("leads")
          .select("*", { count: "exact", head: true })
          .eq("workspace_id", workspaceId)
          .gte("created_at", startDate.toISOString());

        // Se meta pessoal, filtrar por owner
        if (goal.user_id && userId) {
          query = query.eq("owner_id", userId);
        }

        // Para negócios fechados, filtrar status
        if (goal.type === "negocios_por_mes") {
          query = query.eq("closed_status", "ganho");
        }

        const { count } = await query;
        return count || 0;
      }

      case "atividades_por_dia": {
        let query = supabase
          .from("activities")
          .select("*", { count: "exact", head: true })
          .eq("workspace_id", workspaceId)
          .eq("status", "concluida")
          .gte("completed_at", startDate.toISOString());

        // Se meta pessoal, filtrar por user
        if (goal.user_id && userId) {
          query = query.eq("user_id", userId);
        }

        const { count } = await query;
        return count || 0;
      }

      case "receita_por_mes": {
        let query = supabase
          .from("leads")
          .select("estimated_value")
          .eq("workspace_id", workspaceId)
          .eq("closed_status", "ganho")
          .gte("closed_at", startDate.toISOString());

        // Se meta pessoal, filtrar por owner
        if (goal.user_id && userId) {
          query = query.eq("owner_id", userId);
        }

        const { data } = await query;
        return data?.reduce((sum, lead) => sum + (lead.estimated_value || 0), 0) || 0;
      }

      default:
        return 0;
    }
  } catch (error) {
    console.error("Erro ao calcular progresso da meta:", error);
    return 0;
  }
};

/**
 * Cria uma nova meta
 */
export const createGoal = async (
  goalData: Omit<Goal, "id" | "created_at">
): Promise<Goal | null> => {
  try {
    const { data, error } = await supabase
      .from("goals")
      .insert(goalData as any)
      .select()
      .single();

    if (error || !data) {
      console.error("Erro ao criar meta:", error);
      return null;
    }

    return data as Goal;
  } catch (error) {
    console.error("Erro ao criar meta:", error);
    return null;
  }
};

/**
 * Atualiza uma meta existente
 */
export const updateGoal = async (
  goalId: string,
  updates: Partial<Goal>
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("goals")
      .update(updates)
      .eq("id", goalId);

    if (error) {
      console.error("Erro ao atualizar meta:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro ao atualizar meta:", error);
    return false;
  }
};

/**
 * Deleta uma meta
 */
export const deleteGoal = async (goalId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("goals")
      .delete()
      .eq("id", goalId);

    if (error) {
      console.error("Erro ao deletar meta:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro ao deletar meta:", error);
    return false;
  }
};

/**
 * Helper para obter label amigável do tipo de meta
 */
export const getGoalTypeLabel = (type: GoalType): string => {
  const labels: Record<GoalType, string> = {
    leads_por_dia: "Novos Leads por Dia",
    atividades_por_dia: "Atividades por Dia",
    negocios_por_mes: "Negócios Fechados por Mês",
    receita_por_mes: "Receita por Mês",
  };
  return labels[type];
};

/**
 * Helper para obter label amigável do período
 */
export const getGoalPeriodLabel = (period: GoalPeriod): string => {
  return period === "daily" ? "Diária" : "Mensal";
};
