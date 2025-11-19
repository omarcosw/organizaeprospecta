/**
 * Workspace Service
 * 
 * Gerencia operações relacionadas a workspaces (empresas/organizações).
 * Cada usuário pode pertencer a um ou mais workspaces.
 */

import { supabase } from "@/integrations/supabase/client";
import { Workspace, WorkspaceUser } from "@/types";

/**
 * Busca o workspace atual do usuário logado
 * Retorna o primeiro workspace encontrado (usuários podem ter múltiplos workspaces no futuro)
 */
export const getCurrentWorkspace = async (userId: string): Promise<Workspace | null> => {
  try {
    const { data: workspaceUser, error } = await supabase
      .from("workspace_users")
      .select(`
        workspace_id,
        workspaces (*)
      `)
      .eq("user_id", userId)
      .single();

    if (error || !workspaceUser) return null;

    return (workspaceUser as any).workspaces as Workspace;
  } catch (error) {
    console.error("Erro ao buscar workspace:", error);
    return null;
  }
};

/**
 * Cria um novo workspace e adiciona o usuário como admin
 */
export const createWorkspace = async (
  userId: string,
  workspaceData: Pick<Workspace, "name" | "main_service" | "average_ticket">
): Promise<Workspace | null> => {
  try {
    // Criar workspace
    const { data: workspace, error: workspaceError } = await supabase
      .from("workspaces")
      .insert(workspaceData)
      .select()
      .single();

    if (workspaceError || !workspace) {
      console.error("Erro ao criar workspace:", workspaceError);
      return null;
    }

    // Adicionar usuário como admin do workspace
    const { error: userError } = await supabase
      .from("workspace_users")
      .insert({
        workspace_id: workspace.id,
        user_id: userId,
        role: "admin",
      });

    if (userError) {
      console.error("Erro ao adicionar usuário ao workspace:", userError);
      return null;
    }

    return workspace;
  } catch (error) {
    console.error("Erro ao criar workspace:", error);
    return null;
  }
};

/**
 * Busca todos os usuários de um workspace
 */
export const getWorkspaceUsers = async (workspaceId: string): Promise<WorkspaceUser[]> => {
  try {
    const { data, error } = await supabase
      .from("workspace_users")
      .select(`
        *,
        profiles (name, email)
      `)
      .eq("workspace_id", workspaceId);

    if (error) {
      console.error("Erro ao buscar usuários do workspace:", error);
      return [];
    }

    return (data || []) as WorkspaceUser[];
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return [];
  }
};

/**
 * Atualiza dados do workspace
 */
export const updateWorkspace = async (
  workspaceId: string,
  updates: Partial<Workspace>
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("workspaces")
      .update(updates)
      .eq("id", workspaceId);

    if (error) {
      console.error("Erro ao atualizar workspace:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro ao atualizar workspace:", error);
    return false;
  }
};
