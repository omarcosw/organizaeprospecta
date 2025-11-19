/**
 * Lista de atividades
 * Exibe atividades agrupadas por tipo/status
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ActivityWithRelations } from "@/types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Phone, Mail, MessageSquare, Calendar, CheckCircle2 } from "lucide-react";

interface ActivityListProps {
  activities: ActivityWithRelations[];
  title: string;
  emptyMessage?: string;
  onComplete?: (activityId: string, result?: string) => void;
  showCompleteButton?: boolean;
}

const activityIcons = {
  ligacao: Phone,
  whatsapp: MessageSquare,
  email: Mail,
  reuniao: Calendar,
  nota: Mail,
  lead_criado: Mail,
  mudanca_etapa: Mail,
};

const activityTypeLabels = {
  ligacao: "Ligação",
  whatsapp: "WhatsApp",
  email: "E-mail",
  reuniao: "Reunião",
  nota: "Nota",
  lead_criado: "Lead Criado",
  mudanca_etapa: "Mudança de Etapa",
};

export const ActivityList = ({
  activities,
  title,
  emptyMessage = "Nenhuma atividade encontrada",
  onComplete,
  showCompleteButton = false,
}: ActivityListProps) => {
  if (activities.length === 0) {
    return (
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            {emptyMessage}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {title}
          <Badge variant="secondary">{activities.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map((activity) => {
          const Icon = activityIcons[activity.type] || Mail;

          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
            >
              <div className="mt-1">
                <Icon className="h-4 w-4 text-primary" />
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-sm">{activity.title}</p>
                    {activity.leads && (
                      <p className="text-xs text-muted-foreground">
                        {activity.leads.name}
                        {activity.leads.company && ` - ${activity.leads.company}`}
                      </p>
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activityTypeLabels[activity.type]}
                  </Badge>
                </div>

                {activity.description && (
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                )}

                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground">
                    {activity.scheduled_for &&
                      format(new Date(activity.scheduled_for), "dd/MM HH:mm", {
                        locale: ptBR,
                      })}
                  </span>

                  {showCompleteButton && onComplete && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs gap-1"
                      onClick={() => onComplete(activity.id)}
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      Concluir
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
