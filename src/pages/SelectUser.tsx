/**
 * Página de Seleção de Usuário
 * Permite escolher qual usuário/papel usar para testar o sistema
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockUsers, User } from "@/mock/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserRoleBadge } from "@/components/common/UserRoleBadge";
import { ArrowRight, Users, LogIn } from "lucide-react";

export default function SelectUser() {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    // Salvar no localStorage para manter a seleção
    localStorage.setItem("mockCurrentUser", JSON.stringify(user));

    // Redirecionar para o dashboard após 500ms
    setTimeout(() => {
      navigate("/app/dashboard");
    }, 500);
  };

  // Agrupar por time
  const usersByTeam = mockUsers.reduce((acc, user) => {
    if (!acc[user.teamId]) {
      acc[user.teamId] = [];
    }
    acc[user.teamId].push(user);
    return acc;
  }, {} as Record<string, User[]>);

  const teamNames = {
    "team-alpha": "Time Alpha",
    "team-beta": "Time Beta",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold">Prospecta&Vende</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Escolha um usuário para acessar o sistema
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Teste diferentes papéis: SDR, BDR, Closer ou Gestor
          </p>
        </div>

        {/* Grid de Times */}
        <div className="grid gap-6 md:grid-cols-2">
          {Object.entries(usersByTeam).map(([teamId, users]) => (
            <Card key={teamId} className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  {teamNames[teamId as keyof typeof teamNames]}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {users.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => handleSelectUser(user)}
                    className={`w-full p-4 rounded-lg border-2 transition-all hover:border-primary hover:bg-accent/50 ${
                      selectedUser?.id === user.id
                        ? "border-primary bg-accent"
                        : "border-border"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="text-sm font-medium bg-primary/10 text-primary">
                          {user.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>

                      {/* Info */}
                      <div className="flex-1 text-left">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>

                      {/* Badge */}
                      <div className="flex items-center gap-2">
                        <UserRoleBadge role={user.role} size="sm" />
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Legenda */}
        <Card className="mt-6 bg-muted/50">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="font-medium">SDR</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Prospecta e faz primeiro contato
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="font-medium">BDR</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Qualifica e agenda reuniões
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="font-medium">Closer</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Negocia e fecha deals
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  <span className="font-medium">Gestor</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Gerencia o time
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botão alternativo (caso queira ir direto) */}
        <div className="mt-6 text-center">
          <Button
            variant="outline"
            onClick={() => {
              localStorage.setItem("mockCurrentUser", JSON.stringify(mockUsers[0]));
              navigate("/app/dashboard");
            }}
          >
            <LogIn className="w-4 h-4 mr-2" />
            Entrar como João Silva (SDR)
          </Button>
        </div>
      </div>
    </div>
  );
}
