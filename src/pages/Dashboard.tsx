/**
 * Dashboard Principal
 * Visão geral de métricas, funil e progresso de metas
 * MODO FRONT-END: Usando mock data centralizado
 */

import { StatsCard } from "@/components/dashboard/StatsCard";
import { GoalProgress } from "@/components/dashboard/GoalProgress";
import { TeamMembersCard } from "@/components/common/TeamMembersCard";
import {
  mockCurrentUser,
  getStats,
  getGoalsByUser,
  getTeamById,
  mockLeads,
} from "@/mock/mockData";
import { GoalWithProgress } from "@/types";
import {
  Target,
  TrendingUp,
  Calendar,
  CheckCircle,
  DollarSign,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRoleBadge } from "@/components/common/UserRoleBadge";

export default function Dashboard() {
  // Dados do usuário atual
  const currentUser = mockCurrentUser;
  const stats = getStats(currentUser.id);
  const userTeam = getTeamById(currentUser.teamId);

  // Metas do usuário
  const goals = getGoalsByUser(currentUser.id);
  const goalsWithProgress: GoalWithProgress[] = goals.map(goal => {
    let currentValue = 0;

    // Calcular progresso baseado no tipo de meta
    switch (goal.type) {
      case "leads_criados_dia":
        currentValue = mockLeads.filter(l =>
          l.sdrId === currentUser.id &&
          new Date(l.createdAt).toDateString() === new Date().toDateString()
        ).length;
        break;
      case "leads_qualificados_dia":
        currentValue = mockLeads.filter(l =>
          l.bdrId === currentUser.id &&
          l.status === "qualificado_para_bdr"
        ).length;
        break;
      case "reunioes_agendadas_semana":
        currentValue = mockLeads.filter(l =>
          l.closerId === currentUser.id &&
          l.status === "reuniao_agendada"
        ).length;
        break;
      case "deals_fechados_mes":
        currentValue = mockLeads.filter(l =>
          l.closerId === currentUser.id &&
          l.status === "ganho" &&
          l.closedAt &&
          new Date(l.closedAt).getMonth() === new Date().getMonth()
        ).length;
        break;
      case "receita_mes":
        currentValue = mockLeads
          .filter(l =>
            l.closerId === currentUser.id &&
            l.status === "ganho" &&
            l.closedAt &&
            new Date(l.closedAt).getMonth() === new Date().getMonth()
          )
          .reduce((sum, l) => sum + l.estimatedValue, 0);
        break;
    }

    return {
      ...goal,
      currentValue,
      progressPercentage: Math.round((currentValue / goal.targetValue) * 100),
    };
  });

  // Estatísticas de leads por stage
  const leadsByStage = {
    sdr: mockLeads.filter(l => l.stage === "sdr").length,
    bdr: mockLeads.filter(l => l.stage === "bdr").length,
    closer: mockLeads.filter(l => l.stage === "closer").length,
    ganho: mockLeads.filter(l => l.status === "ganho").length,
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header com info do usuário */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Bem-vindo, {currentUser.name}
          </p>
        </div>
        <UserRoleBadge role={currentUser.role} size="lg" />
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatsCard
          title="Meus Leads"
          value={stats.totalLeads}
          icon={Target}
          iconColor="text-primary"
        />
        <StatsCard
          title="Leads Ativos"
          value={stats.activeLeads}
          icon={TrendingUp}
          iconColor="text-blue-500"
        />
        <StatsCard
          title="Atividades Pendentes"
          value={stats.pendingActivities}
          icon={Calendar}
          iconColor="text-orange-500"
        />
        <StatsCard
          title="Ganhos no Mês"
          value={stats.leadsWonThisMonth}
          description="Este mês"
          icon={CheckCircle}
          iconColor="text-green-500"
        />
        <StatsCard
          title="Receita Fechada"
          value={`R$ ${mockLeads
            .filter(l =>
              l.closerId === currentUser.id &&
              l.status === "ganho" &&
              l.closedAt &&
              new Date(l.closedAt).getMonth() === new Date().getMonth()
            )
            .reduce((sum, l) => sum + l.estimatedValue, 0)
            .toLocaleString("pt-BR")}`}
          description="Este mês"
          icon={DollarSign}
          iconColor="text-green-600"
        />
      </div>

      {/* Grid com Metas e Time */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/* Metas */}
        <div className="xl:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Metas e Progresso</h2>
          {goalsWithProgress.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {goalsWithProgress.map((goal) => (
                <GoalProgress key={goal.id} goal={goal} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-center">
                  Nenhuma meta definida ainda.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Time */}
        {userTeam && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Meu Time</h2>
            <TeamMembersCard team={userTeam} />
          </div>
        )}
      </div>

      {/* Funil de Leads por Stage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Distribuição de Leads por Etapa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-sm font-medium text-blue-500">Prospecção (SDR)</span>
              </div>
              <p className="text-2xl font-bold">{leadsByStage.sdr}</p>
              <p className="text-xs text-muted-foreground mt-1">leads ativos</p>
            </div>

            <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="text-sm font-medium text-purple-500">Qualificação (BDR)</span>
              </div>
              <p className="text-2xl font-bold">{leadsByStage.bdr}</p>
              <p className="text-xs text-muted-foreground mt-1">leads ativos</p>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm font-medium text-green-500">Fechamento (Closer)</span>
              </div>
              <p className="text-2xl font-bold">{leadsByStage.closer}</p>
              <p className="text-xs text-muted-foreground mt-1">leads ativos</p>
            </div>

            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-sm font-medium text-emerald-500">Ganhos</span>
              </div>
              <p className="text-2xl font-bold">{leadsByStage.ganho}</p>
              <p className="text-xs text-muted-foreground mt-1">fechados</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
