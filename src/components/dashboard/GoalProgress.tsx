/**
 * Componente de progresso de meta
 * Exibe barra de progresso com percentual e valores
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { GoalWithProgress } from "@/types";
import { getGoalTypeLabel, getGoalPeriodLabel } from "@/services/goalService";

interface GoalProgressProps {
  goal: GoalWithProgress;
}

export const GoalProgress = ({ goal }: GoalProgressProps) => {
  const isMonetary = goal.type === "receita_por_mes";
  
  const formatValue = (value: number) => {
    if (isMonetary) {
      return `R$ ${value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
      })}`;
    }
    return value.toString();
  };

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          {getGoalTypeLabel(goal.type)}
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Meta {getGoalPeriodLabel(goal.period)}
        </p>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progresso</span>
          <span className="font-bold">{goal.progress_percentage}%</span>
        </div>
        <Progress value={goal.progress_percentage} className="h-2" />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatValue(goal.current_value)} realizado</span>
          <span>Meta: {formatValue(goal.target_value)}</span>
        </div>
      </CardContent>
    </Card>
  );
};
