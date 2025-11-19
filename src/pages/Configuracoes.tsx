import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCurrentUser, mockWorkspace } from "@/mockData";
import { Settings } from "lucide-react";

export default function Configuracoes() {
  const user = mockCurrentUser;
  const workspace = mockWorkspace;

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Configurações"
        description="Configure sua conta e preferências do sistema"
      />

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Workspace Atual
          </CardTitle>
          <CardDescription>
            {workspace.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              <strong>Usuário:</strong> {user.name}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Serviço Principal:</strong> {workspace.main_service || "Não definido"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
