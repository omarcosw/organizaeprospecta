/**
 * Página de Leads
 * Lista e gestão de todos os leads com visualização de jornada
 * MODO FRONT-END: Usando mock data centralizado
 */

import { useState } from "react";
import {
  mockCurrentUser,
  mockLeads,
  getUserById,
  Lead,
} from "@/mock/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserRoleBadge } from "@/components/common/UserRoleBadge";
import { LeadJourneyVisualization } from "@/components/common/LeadJourneyVisualization";
import { NewLeadDialog } from "@/components/leads/NewLeadDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Plus,
  Search,
  Filter,
  Building2,
  Mail,
  Phone,
  DollarSign,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Leads() {
  const currentUser = mockCurrentUser;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [newLeadOpen, setNewLeadOpen] = useState(false);

  // Filtrar leads por termo de busca
  const filteredLeads = mockLeads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Agrupar leads por stage
  const leadsByStage = {
    sdr: filteredLeads.filter(l => l.stage === "sdr"),
    bdr: filteredLeads.filter(l => l.stage === "bdr"),
    closer: filteredLeads.filter(l => l.stage === "closer"),
    finalizado: filteredLeads.filter(l => l.stage === "finalizado"),
  };

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setDetailsOpen(true);
  };

  const getStatusBadge = (status: Lead["status"]) => {
    const statusConfig = {
      novo: { label: "Novo", className: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
      em_prospeccao: { label: "Em Prospecção", className: "bg-blue-600/10 text-blue-600 border-blue-600/20" },
      qualificado_para_bdr: { label: "Qualificado", className: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
      em_qualificacao: { label: "Em Qualificação", className: "bg-purple-600/10 text-purple-600 border-purple-600/20" },
      reuniao_agendada: { label: "Reunião Agendada", className: "bg-green-500/10 text-green-500 border-green-500/20" },
      em_negociacao: { label: "Em Negociação", className: "bg-green-600/10 text-green-600 border-green-600/20" },
      proposta_enviada: { label: "Proposta Enviada", className: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
      ganho: { label: "Ganho ✓", className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
      perdido: { label: "Perdido", className: "bg-red-500/10 text-red-500 border-red-500/20" },
    };

    const config = statusConfig[status];
    return (
      <Badge variant="outline" className={`${config.className} text-xs font-medium`}>
        {config.label}
      </Badge>
    );
  };

  const LeadCard = ({ lead }: { lead: Lead }) => {
    const owner = getUserById(lead.currentOwnerId);

    return (
      <Card
        className="cursor-pointer hover:bg-accent/50 transition-colors"
        onClick={() => handleLeadClick(lead)}
      >
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate">{lead.name}</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <Building2 className="w-3 h-3" />
                  {lead.company}
                </p>
              </div>
              {getStatusBadge(lead.status)}
            </div>

            {/* Info */}
            <div className="space-y-1.5 text-xs text-muted-foreground">
              {lead.email && (
                <div className="flex items-center gap-1.5 truncate">
                  <Mail className="w-3 h-3 shrink-0" />
                  <span className="truncate">{lead.email}</span>
                </div>
              )}
              {lead.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 shrink-0" />
                  <span>{lead.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <DollarSign className="w-3 h-3 shrink-0" />
                <span>R$ {lead.estimatedValue.toLocaleString("pt-BR")}</span>
              </div>
            </div>

            {/* Responsável */}
            {owner && (
              <div className="flex items-center gap-2 pt-2 border-t border-border">
                <Avatar className="w-5 h-5">
                  <AvatarFallback className="text-xs bg-primary/10">
                    {owner.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs flex-1 truncate">{owner.name}</span>
                <UserRoleBadge role={owner.role} size="sm" showIcon={false} />
              </div>
            )}

            {/* Próximo passo */}
            {lead.nextStep && (
              <div className="pt-2 border-t border-border">
                <div className="flex items-start gap-2">
                  <Calendar className="w-3 h-3 mt-0.5 shrink-0 text-orange-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium">Próximo passo:</p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{lead.nextStep}</p>
                  </div>
                </div>
              </div>
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
          <h1 className="text-3xl font-bold">Leads</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie todos os seus leads e acompanhe a jornada
          </p>
        </div>
        <Button onClick={() => setNewLeadOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Lead
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, empresa ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Contadores */}
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-muted-foreground">SDR:</span>
              <span className="font-medium">{leadsByStage.sdr.length}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-muted-foreground">BDR:</span>
              <span className="font-medium">{leadsByStage.bdr.length}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-muted-foreground">Closer:</span>
              <span className="font-medium">{leadsByStage.closer.length}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-gray-500" />
              <span className="text-muted-foreground">Finalizados:</span>
              <span className="font-medium">{leadsByStage.finalizado.length}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs por Stage */}
      <Tabs defaultValue="sdr" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sdr" className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            Prospecção ({leadsByStage.sdr.length})
          </TabsTrigger>
          <TabsTrigger value="bdr" className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            Qualificação ({leadsByStage.bdr.length})
          </TabsTrigger>
          <TabsTrigger value="closer" className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            Fechamento ({leadsByStage.closer.length})
          </TabsTrigger>
          <TabsTrigger value="finalizado" className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-500" />
            Finalizados ({leadsByStage.finalizado.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sdr" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {leadsByStage.sdr.map(lead => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
            {leadsByStage.sdr.length === 0 && (
              <p className="text-muted-foreground col-span-full text-center py-8">
                Nenhum lead em prospecção
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="bdr" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {leadsByStage.bdr.map(lead => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
            {leadsByStage.bdr.length === 0 && (
              <p className="text-muted-foreground col-span-full text-center py-8">
                Nenhum lead em qualificação
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="closer" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {leadsByStage.closer.map(lead => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
            {leadsByStage.closer.length === 0 && (
              <p className="text-muted-foreground col-span-full text-center py-8">
                Nenhum lead em fechamento
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="finalizado" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {leadsByStage.finalizado.map(lead => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
            {leadsByStage.finalizado.length === 0 && (
              <p className="text-muted-foreground col-span-full text-center py-8">
                Nenhum lead finalizado
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialog de Detalhes do Lead */}
      {selectedLead && (
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>{selectedLead.name}</span>
                {getStatusBadge(selectedLead.status)}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* Informações básicas */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Informações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Empresa</p>
                      <p className="font-medium">{selectedLead.company}</p>
                    </div>
                    {selectedLead.position && (
                      <div>
                        <p className="text-muted-foreground">Cargo</p>
                        <p className="font-medium">{selectedLead.position}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p className="font-medium">{selectedLead.email}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Telefone</p>
                      <p className="font-medium">{selectedLead.phone}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Fonte</p>
                      <p className="font-medium">{selectedLead.source}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Valor Estimado</p>
                      <p className="font-medium">R$ {selectedLead.estimatedValue.toLocaleString("pt-BR")}</p>
                    </div>
                  </div>

                  {selectedLead.serviceInterest && (
                    <div>
                      <p className="text-muted-foreground text-sm">Interesse</p>
                      <p className="font-medium">{selectedLead.serviceInterest}</p>
                    </div>
                  )}

                  {selectedLead.notes && (
                    <div>
                      <p className="text-muted-foreground text-sm">Notas</p>
                      <p className="text-sm mt-1 p-3 bg-muted rounded-md whitespace-pre-wrap">
                        {selectedLead.notes}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Jornada do Lead */}
              <LeadJourneyVisualization lead={selectedLead} />

              {/* Próximos passos */}
              {selectedLead.nextStep && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Próximo Passo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-3">
                      <ArrowRight className="w-4 h-4 mt-0.5 text-primary" />
                      <div>
                        <p className="font-medium">{selectedLead.nextStep}</p>
                        {selectedLead.nextStepDate && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Previsto para: {new Date(selectedLead.nextStepDate).toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Dialog de Novo Lead */}
      <NewLeadDialog open={newLeadOpen} onOpenChange={setNewLeadOpen} />
    </div>
  );
}
