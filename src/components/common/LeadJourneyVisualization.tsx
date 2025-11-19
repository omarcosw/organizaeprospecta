import { Lead, LeadStage, getUserById } from "@/mock/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, Circle, Clock } from "lucide-react";
import { UserRoleBadge } from "./UserRoleBadge";

interface LeadJourneyVisualizationProps {
  lead: Lead;
}

const stageConfig = {
  sdr: { order: 1, label: "Prospecção", color: "blue" },
  bdr: { order: 2, label: "Qualificação", color: "purple" },
  closer: { order: 3, label: "Fechamento", color: "green" },
  finalizado: { order: 4, label: "Finalizado", color: "gray" },
};

export const LeadJourneyVisualization = ({ lead }: LeadJourneyVisualizationProps) => {
  const currentStageOrder = stageConfig[lead.stage].order;

  const sdrUser = lead.sdrId ? getUserById(lead.sdrId) : null;
  const bdrUser = lead.bdrId ? getUserById(lead.bdrId) : null;
  const closerUser = lead.closerId ? getUserById(lead.closerId) : null;

  const getStatusIcon = (stageOrder: number) => {
    if (stageOrder < currentStageOrder) {
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    } else if (stageOrder === currentStageOrder) {
      return <Clock className="w-5 h-5 text-blue-500 animate-pulse" />;
    } else {
      return <Circle className="w-5 h-5 text-muted-foreground/30" />;
    }
  };

  const getStageStatus = (stageOrder: number) => {
    if (stageOrder < currentStageOrder) return "completed";
    if (stageOrder === currentStageOrder) return "current";
    return "pending";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Jornada do Lead</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* SDR Stage */}
          <div className="flex items-start gap-3">
            <div className="mt-1">{getStatusIcon(1)}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">Prospecção (SDR)</span>
                  {getStageStatus(1) === "current" && (
                    <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-500 border-blue-500/20">
                      Em andamento
                    </Badge>
                  )}
                </div>
              </div>
              {sdrUser && (
                <div className="flex items-center gap-2 mt-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-xs bg-blue-500/10 text-blue-500">
                      {sdrUser.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{sdrUser.name}</span>
                  <UserRoleBadge role="sdr" size="sm" showIcon={false} />
                </div>
              )}
            </div>
          </div>

          {currentStageOrder >= 2 && (
            <div className="flex justify-center">
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </div>
          )}

          {/* BDR Stage */}
          {currentStageOrder >= 2 && (
            <div className="flex items-start gap-3">
              <div className="mt-1">{getStatusIcon(2)}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">Qualificação (BDR)</span>
                    {getStageStatus(2) === "current" && (
                      <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-500 border-purple-500/20">
                        Em andamento
                      </Badge>
                    )}
                  </div>
                </div>
                {bdrUser && (
                  <div className="flex items-center gap-2 mt-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs bg-purple-500/10 text-purple-500">
                        {bdrUser.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{bdrUser.name}</span>
                    <UserRoleBadge role="bdr" size="sm" showIcon={false} />
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStageOrder >= 3 && (
            <div className="flex justify-center">
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </div>
          )}

          {/* Closer Stage */}
          {currentStageOrder >= 3 && (
            <div className="flex items-start gap-3">
              <div className="mt-1">{getStatusIcon(3)}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">Fechamento (Closer)</span>
                    {getStageStatus(3) === "current" && (
                      <Badge variant="outline" className="text-xs bg-green-500/10 text-green-500 border-green-500/20">
                        Em andamento
                      </Badge>
                    )}
                  </div>
                </div>
                {closerUser && (
                  <div className="flex items-center gap-2 mt-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs bg-green-500/10 text-green-500">
                        {closerUser.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{closerUser.name}</span>
                    <UserRoleBadge role="closer" size="sm" showIcon={false} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Status Final */}
          {lead.stage === "finalizado" && (
            <>
              <div className="flex justify-center">
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <CheckCircle2 className={`w-5 h-5 ${lead.status === "ganho" ? "text-green-500" : "text-red-500"}`} />
                </div>
                <div className="flex-1">
                  <span className="font-medium text-sm">
                    {lead.status === "ganho" ? "Ganho 🎉" : "Perdido"}
                  </span>
                  {lead.closedAt && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(lead.closedAt).toLocaleDateString("pt-BR")}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Status atual */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Status atual:</span>
            <Badge variant="outline" className="font-medium">
              {lead.status.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
