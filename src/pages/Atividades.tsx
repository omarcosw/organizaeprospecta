/**
 * Página de Atividades
 * Lista e gestão de todas as atividades do usuário
 * MODO FRONT-END: Usando mock data centralizado
 */

import { useState } from "react";
import {
  mockCurrentUser,
  mockActivities,
  mockLeads,
  getUserById,
  Activity,
} from "@/mock/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewActivityDialog } from "@/components/activities/NewActivityDialog";
import {
  CheckCircle2,
  Circle,
  XCircle,
  Calendar,
  Phone,
  MessageSquare,
  Mail,
  Video,
  StickyNote,
  Plus,
  Clock,
  Building2,
  ArrowRight,
} from "lucide-react";

export default function Atividades() {
  const currentUser = mockCurrentUser;
  const myActivities = mockActivities.filter(a => a.userId === currentUser.id);
  const [newActivityOpen, setNewActivityOpen] = useState(false);

  const pendingActivities = myActivities.filter(a => a.status === "pendente");
  const completedActivities = myActivities.filter(a => a.status === "concluida");
  const allActivities = myActivities;

  const getActivityIcon = (type: Activity["type"]) => {
    const icons = {
      ligacao: Phone,
      whatsapp: MessageSquare,
      email: Mail,
      reuniao: Video,
      nota: StickyNote,
      lead_criado: Plus,
      mudanca_status: ArrowRight,
      transferencia: ArrowRight,
    };
    const Icon = icons[type] || Circle;
    return <Icon className="w-4 h-4" />;
  };

  const getActivityTypeLabel = (type: Activity["type"]) => {
    const labels = {
      ligacao: "Ligação",
      whatsapp: "WhatsApp",
      email: "E-mail",
      reuniao: "Reunião",
      nota: "Nota",
      lead_criado: "Lead Criado",
      mudanca_status: "Mudança de Status",
      transferencia: "Transferência",
    };
    return labels[type] || type;
  };

  const getActivityTypeBadge = (type: Activity["type"]) => {
    const colors = {
      ligacao: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      whatsapp: "bg-green-500/10 text-green-500 border-green-500/20",
      email: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      reuniao: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      nota: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      lead_criado: "bg-gray-500/10 text-gray-500 border-gray-500/20",
      mudanca_status: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
      transferencia: "bg-pink-500/10 text-pink-500 border-pink-500/20",
    };

    return (
      <Badge variant="outline" className={`${colors[type] || ""} text-xs`}>
        {getActivityIcon(type)}
        <span className="ml-1">{getActivityTypeLabel(type)}</span>
      </Badge>
    );
  };

  const getStatusIcon = (status: Activity["status"]) => {
    switch (status) {
      case "concluida":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "cancelada":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-orange-500" />;
    }
  };

  const ActivityCard = ({ activity }: { activity: Activity }) => {
    const lead = mockLeads.find(l => l.id === activity.leadId);
    const isOverdue =
      activity.status === "pendente" &&
      activity.scheduledFor &&
      new Date(activity.scheduledFor) < new Date();

    return (
      <Card className={`${isOverdue ? "border-red-500/50" : ""}`}>
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                {getStatusIcon(activity.status)}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">{activity.title}</h3>
                  {activity.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {activity.description}
                    </p>
                  )}
                </div>
              </div>
              {getActivityTypeBadge(activity.type)}
            </div>

            {/* Lead relacionado */}
            {lead && (
              <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                <Building2 className="w-3 h-3 text-muted-foreground shrink-0" />
                <span className="text-xs font-medium truncate">{lead.name}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground truncate">{lead.company}</span>
              </div>
            )}

            {/* Data/Hora */}
            <div className="flex items-center justify-between text-xs">
              {activity.scheduledFor && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-muted-foreground" />
                  <span className={isOverdue ? "text-red-500 font-medium" : "text-muted-foreground"}>
                    {new Date(activity.scheduledFor).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {isOverdue && " (Atrasado)"}
                  </span>
                </div>
              )}

              {activity.completedAt && (
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                  <span className="text-muted-foreground">
                    Concluído em{" "}
                    {new Date(activity.completedAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </span>
                </div>
              )}

              {activity.result && (
                <Badge variant="outline" className="text-xs ml-auto">
                  {activity.result}
                </Badge>
              )}
            </div>

            {/* Metadata extra (transferências, links, etc) */}
            {activity.metadata && activity.type === "transferencia" && (
              <div className="text-xs text-muted-foreground p-2 bg-muted/50 rounded-md">
                De: <span className="font-medium">{getUserById(activity.metadata.from)?.name}</span> →{" "}
                <span className="font-medium">{getUserById(activity.metadata.to)?.name}</span>
              </div>
            )}

            {activity.metadata && activity.metadata.meetingLink && (
              <a
                href={activity.metadata.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                <Video className="w-3 h-3" />
                Link da reunião
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Atividades</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie suas tarefas e interações com leads
          </p>
        </div>
        <Button onClick={() => setNewActivityOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Atividade
        </Button>
      </div>

      {/* Cards de resumo */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-orange-500/10">
                <Clock className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingActivities.length}</p>
                <p className="text-xs text-muted-foreground">Pendentes</p>
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
                <p className="text-2xl font-bold">{completedActivities.length}</p>
                <p className="text-xs text-muted-foreground">Concluídas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-blue-500/10">
                <Calendar className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{allActivities.length}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="pendentes" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pendentes" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Pendentes ({pendingActivities.length})
          </TabsTrigger>
          <TabsTrigger value="concluidas" className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Concluídas ({completedActivities.length})
          </TabsTrigger>
          <TabsTrigger value="todas" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Todas ({allActivities.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pendentes" className="mt-6">
          {pendingActivities.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pendingActivities
                .sort((a, b) => {
                  if (!a.scheduledFor) return 1;
                  if (!b.scheduledFor) return -1;
                  return new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime();
                })
                .map(activity => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="text-muted-foreground">Nenhuma atividade pendente! 🎉</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="concluidas" className="mt-6">
          {completedActivities.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {completedActivities
                .sort((a, b) => {
                  if (!a.completedAt) return 1;
                  if (!b.completedAt) return -1;
                  return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime();
                })
                .map(activity => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">Nenhuma atividade concluída ainda</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="todas" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {allActivities
              .sort((a, b) => {
                const dateA = a.scheduledFor || a.completedAt || a.createdAt;
                const dateB = b.scheduledFor || b.completedAt || b.createdAt;
                return new Date(dateB).getTime() - new Date(dateA).getTime();
              })
              .map(activity => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialog de Nova Atividade */}
      <NewActivityDialog open={newActivityOpen} onOpenChange={setNewActivityOpen} />
    </div>
  );
}
