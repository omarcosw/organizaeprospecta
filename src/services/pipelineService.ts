/**
 * Pipeline Service
 * 
 * Gerencia pipelines e suas etapas (stages).
 * Um pipeline representa o funil de vendas com suas etapas desde "Novo" até "Fechado".
 */

import { supabase } from "@/integrations/supabase/client";
import { Pipeline, PipelineStage } from "@/types";

/**
 * Etapas padrão do funil de vendas
 * Usadas na criação de novos pipelines
 */
export const DEFAULT_STAGES = [
  { name: "Novo", order_index: 1 },
  { name: "Contato Iniciado", order_index: 2 },
  { name: "Qualificado", order_index: 3 },
  { name: "Proposta Enviada", order_index: 4 },
  { name: "Negociação", order_index: 5 },
  { name: "Fechado", order_index: 6 },
];

/**
 * Busca o pipeline padrão do workspace
 */
export const getDefaultPipeline = async (workspaceId: string): Promise<Pipeline | null> => {
  try {
    const { data, error } = await supabase
      .from("pipelines")
      .select("*")
      .eq("workspace_id", workspaceId)
      .eq("is_default", true)
      .single();

    if (error || !data) return null;
    return data;
  } catch (error) {
    console.error("Erro ao buscar pipeline padrão:", error);
    return null;
  }
};

/**
 * Busca todas as etapas de um pipeline
 */
export const getPipelineStages = async (pipelineId: string): Promise<PipelineStage[]> => {
  try {
    const { data, error } = await supabase
      .from("pipeline_stages")
      .select("*")
      .eq("pipeline_id", pipelineId)
      .order("order_index", { ascending: true });

    if (error) {
      console.error("Erro ao buscar etapas do pipeline:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Erro ao buscar etapas:", error);
    return [];
  }
};

/**
 * Cria um novo pipeline com etapas padrão
 */
export const createPipeline = async (
  workspaceId: string,
  name: string,
  isDefault: boolean = false
): Promise<Pipeline | null> => {
  try {
    // Criar pipeline
    const { data: pipeline, error: pipelineError } = await supabase
      .from("pipelines")
      .insert({
        workspace_id: workspaceId,
        name,
        is_default: isDefault,
      })
      .select()
      .single();

    if (pipelineError || !pipeline) {
      console.error("Erro ao criar pipeline:", pipelineError);
      return null;
    }

    // Criar etapas padrão
    const stages = DEFAULT_STAGES.map((stage) => ({
      pipeline_id: pipeline.id,
      ...stage,
    }));

    const { error: stagesError } = await supabase
      .from("pipeline_stages")
      .insert(stages);

    if (stagesError) {
      console.error("Erro ao criar etapas:", stagesError);
      return null;
    }

    return pipeline;
  } catch (error) {
    console.error("Erro ao criar pipeline:", error);
    return null;
  }
};

/**
 * Busca a primeira etapa de um pipeline (para novos leads)
 */
export const getFirstStage = async (pipelineId: string): Promise<PipelineStage | null> => {
  try {
    const { data, error } = await supabase
      .from("pipeline_stages")
      .select("*")
      .eq("pipeline_id", pipelineId)
      .order("order_index", { ascending: true })
      .limit(1)
      .single();

    if (error || !data) return null;
    return data;
  } catch (error) {
    console.error("Erro ao buscar primeira etapa:", error);
    return null;
  }
};

/**
 * Atualiza a ordem das etapas (usado para reordenar colunas no Kanban)
 */
export const updateStageOrder = async (
  stageId: string,
  newOrderIndex: number
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("pipeline_stages")
      .update({ order_index: newOrderIndex })
      .eq("id", stageId);

    if (error) {
      console.error("Erro ao atualizar ordem da etapa:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro ao atualizar ordem:", error);
    return false;
  }
};
