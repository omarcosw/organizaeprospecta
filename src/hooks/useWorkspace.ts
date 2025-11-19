/**
 * Hook customizado para gerenciar workspace atual
 * 
 * Centraliza a lógica de workspace, pipeline e etapas,
 * facilitando o acesso em qualquer componente.
 */

import { useState, useEffect } from "react";
import { Workspace, Pipeline, PipelineStage } from "@/types";
import { mockCurrentUser, mockWorkspace, mockPipeline, mockStages } from "@/mockData";

interface UseWorkspaceReturn {
  workspace: Workspace | null;
  pipeline: Pipeline | null;
  stages: PipelineStage[];
  firstStage: PipelineStage | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

/**
 * Hook que gerencia o workspace atual do usuário
 * Usa mock data na fase de front-end
 */
export const useWorkspace = (): UseWorkspaceReturn => {
  const [workspace] = useState<Workspace | null>(mockWorkspace);
  const [pipeline] = useState<Pipeline | null>(mockPipeline);
  const [stages] = useState<PipelineStage[]>(mockStages);
  const [loading] = useState(false);

  const refresh = async () => {
    // Mock refresh - no-op
  };

  const firstStage = stages.length > 0 ? stages[0] : null;

  return {
    workspace,
    pipeline,
    stages,
    firstStage,
    loading,
    refresh,
  };
};
