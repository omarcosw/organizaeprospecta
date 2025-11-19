/**
 * Página de Relatórios
 * Análises de funil, performance por papel e canais
 * MODO FRONT-END: Usando mock data centralizado
 */

import {
  mockLeads,
  mockActivities,
  mockUsers,
  mockCurrentUser,
  getUserById,
} from "@/mock/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Users,
  Target,
  DollarSign,
  Activity,
  Award,
} from "lucide-react";

export default function Relatorios() {
  const currentUser = mockCurrentUser;

  // Funil de conversão
  const funnelData = [
    { name: "Prospecção (SDR)", value: mockLeads.filter(l => l.stage === "sdr").length, fill: "#3b82f6" },
    { name: "Qualificação (BDR)", value: mockLeads.filter(l => l.stage === "bdr").length, fill: "#8b5cf6" },
    { name: "Fechamento (Closer)", value: mockLeads.filter(l => l.stage === "closer").length, fill: "#10b981" },
    { name: "Ganhos", value: mockLeads.filter(l => l.status === "ganho").length, fill: "#059669" },
  ];

  // Performance por papel (SDR, BDR, Closer)
  const performanceByRole = mockUsers
    .filter(u => ["sdr", "bdr", "closer"].includes(u.role))
    .map(user => {
      const userLeads = mockLeads.filter(l =>
        l.sdrId === user.id || l.bdrId === user.id || l.closerId === user.id
      );
      const userActivities = mockActivities.filter(a => a.userId === user.id);
      const userDeals = mockLeads.filter(l => l.closerId === user.id && l.status === "ganho");

      return {
        name: user.name.split(" ")[0],
        role: user.role.toUpperCase(),
        leads: userLeads.length,
        atividades: userActivities.length,
        deals: userDeals.length,
        receita: userDeals.reduce((sum, l) => sum + l.estimatedValue, 0),
      };
    });

  // Performance por canal
  const channelData = mockLeads.reduce((acc, lead) => {
    const channel = lead.source || "Não informado";
    if (!acc[channel]) {
      acc[channel] = { name: channel, leads: 0, ganhos: 0, valor: 0 };
    }
    acc[channel].leads++;
    if (lead.status === "ganho") {
      acc[channel].ganhos++;
      acc[channel].valor += lead.estimatedValue;
    }
    return acc;
  }, {} as Record<string, { name: string; leads: number; ganhos: number; valor: number }>);

  const channelChartData = Object.values(channelData);

  // Distribuição por status
  const statusData = [
    { name: "Em Prospecção", value: mockLeads.filter(l => l.status === "em_prospeccao" || l.status === "novo").length, fill: "#3b82f6" },
    { name: "Em Qualificação", value: mockLeads.filter(l => l.status === "em_qualificacao" || l.status === "qualificado_para_bdr").length, fill: "#8b5cf6" },
    { name: "Em Negociação", value: mockLeads.filter(l => l.status === "em_negociacao" || l.status === "reuniao_agendada" || l.status === "proposta_enviada").length, fill: "#10b981" },
    { name: "Ganhos", value: mockLeads.filter(l => l.status === "ganho").length, fill: "#059669" },
    { name: "Perdidos", value: mockLeads.filter(l => l.status === "perdido").length, fill: "#ef4444" },
  ];

  // Cards de resumo
  const totalLeads = mockLeads.length;
  const totalGanhos = mockLeads.filter(l => l.status === "ganho").length;
  const totalReceita = mockLeads.filter(l => l.status === "ganho").reduce((sum, l) => sum + l.estimatedValue, 0);
  const taxaConversao = totalLeads > 0 ? Math.round((totalGanhos / totalLeads) * 100) : 0;

  const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Relatórios</h1>
        <p className="text-muted-foreground mt-1">
          Análises e insights de performance de vendas
        </p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-blue-500/10">
                <Target className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalLeads}</p>
                <p className="text-xs text-muted-foreground">Total de Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-green-500/10">
                <Award className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalGanhos}</p>
                <p className="text-xs text-muted-foreground">Deals Fechados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-emerald-500/10">
                <DollarSign className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">R$ {(totalReceita / 1000).toFixed(0)}k</p>
                <p className="text-xs text-muted-foreground">Receita Total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-purple-500/10">
                <TrendingUp className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{taxaConversao}%</p>
                <p className="text-xs text-muted-foreground">Taxa de Conversão</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="funil" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="funil">Funil</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="canais">Canais</TabsTrigger>
          <TabsTrigger value="status">Status</TabsTrigger>
        </TabsList>

        {/* Tab: Funil de Conversão */}
        <TabsContent value="funil" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Funil de Conversão por Etapa</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={funnelData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]}>
                    {funnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              {/* Taxa de conversão entre etapas */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">SDR → BDR</p>
                  <p className="text-lg font-bold">
                    {funnelData[0].value > 0
                      ? Math.round((funnelData[1].value / funnelData[0].value) * 100)
                      : 0}%
                  </p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">BDR → Closer</p>
                  <p className="text-lg font-bold">
                    {funnelData[1].value > 0
                      ? Math.round((funnelData[2].value / funnelData[1].value) * 100)
                      : 0}%
                  </p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">Closer → Ganho</p>
                  <p className="text-lg font-bold">
                    {funnelData[2].value > 0
                      ? Math.round((funnelData[3].value / funnelData[2].value) * 100)
                      : 0}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Performance por Papel */}
        <TabsContent value="performance" className="mt-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Performance por SDR/BDR/Closer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceByRole}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" className="text-xs" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="leads" fill="#3b82f6" name="Leads" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="atividades" fill="#8b5cf6" name="Atividades" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="deals" fill="#10b981" name="Deals" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Tabela de Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Detalhamento por Vendedor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 text-sm font-medium">Vendedor</th>
                        <th className="text-left p-3 text-sm font-medium">Papel</th>
                        <th className="text-right p-3 text-sm font-medium">Leads</th>
                        <th className="text-right p-3 text-sm font-medium">Atividades</th>
                        <th className="text-right p-3 text-sm font-medium">Deals</th>
                        <th className="text-right p-3 text-sm font-medium">Receita</th>
                      </tr>
                    </thead>
                    <tbody>
                      {performanceByRole.map((user, index) => (
                        <tr key={index} className="border-b border-border/50">
                          <td className="p-3 text-sm">{user.name}</td>
                          <td className="p-3">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              user.role === "SDR" ? "bg-blue-500/10 text-blue-500" :
                              user.role === "BDR" ? "bg-purple-500/10 text-purple-500" :
                              "bg-green-500/10 text-green-500"
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="p-3 text-sm text-right">{user.leads}</td>
                          <td className="p-3 text-sm text-right">{user.atividades}</td>
                          <td className="p-3 text-sm text-right font-medium">{user.deals}</td>
                          <td className="p-3 text-sm text-right font-medium">
                            R$ {user.receita.toLocaleString("pt-BR")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab: Performance por Canal */}
        <TabsContent value="canais" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Resultados por Canal de Aquisição</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={channelChartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="leads" fill="#3b82f6" name="Total de Leads" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="ganhos" fill="#10b981" name="Ganhos" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>

              {/* Tabela de canais */}
              <div className="mt-6 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 text-sm font-medium">Canal</th>
                      <th className="text-right p-3 text-sm font-medium">Leads</th>
                      <th className="text-right p-3 text-sm font-medium">Ganhos</th>
                      <th className="text-right p-3 text-sm font-medium">Taxa</th>
                      <th className="text-right p-3 text-sm font-medium">Receita</th>
                    </tr>
                  </thead>
                  <tbody>
                    {channelChartData.map((channel, index) => (
                      <tr key={index} className="border-b border-border/50">
                        <td className="p-3 text-sm font-medium">{channel.name}</td>
                        <td className="p-3 text-sm text-right">{channel.leads}</td>
                        <td className="p-3 text-sm text-right">{channel.ganhos}</td>
                        <td className="p-3 text-sm text-right">
                          {channel.leads > 0 ? Math.round((channel.ganhos / channel.leads) * 100) : 0}%
                        </td>
                        <td className="p-3 text-sm text-right font-medium">
                          R$ {channel.valor.toLocaleString("pt-BR")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Distribuição por Status */}
        <TabsContent value="status" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Leads por Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Legenda com valores */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                {statusData.map((status, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: status.fill }}
                    />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">{status.name}</p>
                      <p className="text-lg font-bold">{status.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
