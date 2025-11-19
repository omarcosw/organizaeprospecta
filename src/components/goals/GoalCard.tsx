/**
 * Card de meta individual
 * Exibe meta com progresso e informações
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { GoalWithProgress } from "@/types";
import { getGoalTypeLabel, getGoalPeriodLabel } from "@/services/goalService";
import { Target, TrendingUp, TrendingDown } from "lucide-react";

interface GoalCardProps {
  goal: GoalWithProgress;
}

export const GoalCard = ({ goal }: GoalCardProps) => {
  const isMonetary = goal.type === "receita_por_mes";
  const isTeamGoal = !goal.user_id;

  const formatValue = (value: number) => {
    if (isMonetary) {
      return `R$ ${value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
      })}`;
    }
    return value.toString();
  };

  const isOnTrack = goal.progress_percentage >= 70;
  const isComplete = goal.progress_percentage >= 100;

  return (
    <Card className="border-border/50 hover:border-primary/30 transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              {getGoalTypeLabel(goal.type)}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {getGoalPeriodLabel(goal.period)}
              </Badge>
              {isTeamGoal && (
                <Badge variant="secondary" className="text-xs">
                  Equipe
                </Badge>
              )}
            </div>
          </div>

          {isComplete ? (
            <TrendingUp className="h-5 w-5 text-green-500" />
          ) : isOnTrack ? (
            <TrendingUp className="h-5 w-5 text-primary" />
          ) : (
            <TrendingDown className="h-5 w-5 text-destructive" />
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progresso</span>
            <span
              className={`font-bold ${
                isComplete
                  ? "text-green-500"
                  : isOnTrack
                  ? "text-primary"
                  : "text-destructive"
              }`}
            >
              {goal.progress_percentage}%
            </span>
          </div>
          <Progress value={goal.progress_percentage} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/50">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Realizado</p>
            <p className="text-lg font-bold">
              {formatValue(goal.current_value)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-1">Meta</p>
            <p className="text-lg font-bold text-primary">
              {formatValue(goal.target_value)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
