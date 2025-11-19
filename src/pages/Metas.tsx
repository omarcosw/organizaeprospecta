/**
 * Página de Metas
 * Visualização e gestão de metas individuais e da equipe
 * MODO FRONT-END: Usando mock data centralizado
 */

import {
  mockCurrentUser,
  getGoalsByUser,
  getGoalsByTeam,
  mockLeads,
  mockActivities,
  GoalWithProgress,
} from "@/mock/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Target,
  TrendingUp,
  Calendar,
  DollarSign,
  CheckCircle2,
  Plus,
  Trophy,
  Users,
} from "lucide-react";

export default function Metas() {
  const currentUser = mockCurrentUser;
  const userGoals = getGoalsByUser(currentUser.id);
  const teamGoals = getGoalsByTeam(currentUser.teamId);

  // Calcular progresso das metas individuais
  const userGoalsWithProgress: GoalWithProgress[] = userGoals.map(goal => {
    let currentValue = 0;

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
          l.status === "qualificado_para_bdr" &&
          new Date(l.lastActivityAt || l.createdAt).toDateString() === new Date().toDateString()
        ).length;
        break;
      case "reunioes_agendadas_semana":
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        currentValue = mockLeads.filter(l =>
          l.closerId === currentUser.id &&
          l.status === "reuniao_agendada" &&
          new Date(l.lastActivityAt || l.createdAt) >= weekStart
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
      progressPercentage: Math.min(Math.round((currentValue / goal.targetValue) * 100), 100),
    };
  });

  // Calcular progresso das metas do time
  const teamGoalsWithProgress: GoalWithProgress[] = teamGoals.map(goal => {
    let currentValue = 0;

    switch (goal.type) {
      case "receita_mes":
        currentValue = mockLeads
          .filter(l =>
            l.status === "ganho" &&
            l.closedAt &&
            new Date(l.closedAt).getMonth() === new Date().getMonth()
          )
          .reduce((sum, l) => sum + l.estimatedValue, 0);
        break;
      case "deals_fechados_mes":
        currentValue = mockLeads.filter(l =>
          l.status === "ganho" &&
          l.closedAt &&
          new Date(l.closedAt).getMonth() === new Date().getMonth()
        ).length;
        break;
    }

    return {
      ...goal,
      currentValue,
      progressPercentage: Math.min(Math.round((currentValue / goal.targetValue) * 100), 100),
    };
  });

  const getGoalIcon = (type: string) => {
    switch (type) {
      case "leads_criados_dia":
        return Target;
      case "leads_qualificados_dia":
        return CheckCircle2;
      case "reunioes_agendadas_semana":
        return Calendar;
      case "deals_fechados_mes":
        return Trophy;
      case "receita_mes":
        return DollarSign;
      default:
        return TrendingUp;
    }
  };

  const getGoalLabel = (type: string) => {
    const labels = {
      leads_criados_dia: "Leads Criados por Dia",
      leads_qualificados_dia: "Leads Qualificados por Dia",
      reunioes_agendadas_semana: "Reuniões Agendadas por Semana",
      deals_fechados_mes: "Deals Fechados por Mês",
      receita_mes: "Receita por Mês",
    };
    return labels[type as keyof typeof labels] || type;
  };

  const formatValue = (type: string, value: number) => {
    if (type === "receita_mes") {
      return `R$ ${value.toLocaleString("pt-BR")}`;
    }
    return value.toString();
  };

  const GoalCard = ({ goal }: { goal: GoalWithProgress }) => {
    const Icon = getGoalIcon(goal.type);
    const isCompleted = goal.progressPercentage >= 100;
    const isWarning = goal.progressPercentage >= 50 && goal.progressPercentage < 100;

    return (
      <Card className={isCompleted ? "border-green-500/50" : ""}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                isCompleted ? "bg-green-500/10" :
                isWarning ? "bg-orange-500/10" :
                "bg-primary/10"
              }`}>
                <Icon className={`w-5 h-5 ${
                  isCompleted ? "text-green-500" :
                  isWarning ? "text-orange-500" :
                  "text-primary"
                }`} />
              </div>
              <div>
                <CardTitle className="text-sm font-medium">
                  {getGoalLabel(goal.type)}
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1">
                  {goal.period === "daily" ? "Diário" :
                   goal.period === "weekly" ? "Semanal" :
                   "Mensal"}
                </p>
              </div>
            </div>
            {isCompleted && (
              <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Atingida
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Progresso */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progresso</span>
              <span className="font-medium">{goal.progressPercentage}%</span>
            </div>
            <Progress
              value={goal.progressPercentage}
              className="h-2"
            />
          </div>

          {/* Valores */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Atual</p>
              <p className="text-xl font-bold">{formatValue(goal.type, goal.currentValue)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Meta</p>
              <p className="text-xl font-bold text-muted-foreground/70">
                {formatValue(goal.type, goal.targetValue)}
              </p>
            </div>
          </div>

          {/* Falta */}
          {!isCompleted && (
            <div className="pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Faltam {formatValue(goal.type, goal.targetValue - goal.currentValue)} para atingir a meta
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Metas</h1>
          <p className="text-muted-foreground mt-1">
            Acompanhe o progresso das suas metas e do time
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Meta
        </Button>
      </div>

      {/* Cards de resumo */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{userGoalsWithProgress.length}</p>
                <p className="text-xs text-muted-foreground">Minhas Metas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-green-500/10">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {userGoalsWithProgress.filter(g => g.progressPercentage >= 100).length}
                </p>
                <p className="text-xs text-muted-foreground">Atingidas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-blue-500/10">
                <Users className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{teamGoalsWithProgress.length}</p>
                <p className="text-xs text-muted-foreground">Metas do Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Minhas Metas ({userGoalsWithProgress.length})
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Metas do Time ({teamGoalsWithProgress.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-6">
          {userGoalsWithProgress.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {userGoalsWithProgress.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <Target className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Nenhuma meta configurada</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Configure suas metas para acompanhar o progresso
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="team" className="mt-6">
          {teamGoalsWithProgress.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {teamGoalsWithProgress.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Nenhuma meta de time configurada</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
