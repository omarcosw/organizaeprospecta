import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-lg" />
            <span className="text-2xl font-bold">Prospecta&Vende</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Recuperar senha</h1>
          <p className="text-muted-foreground">
            Esta funcionalidade será implementada em breve.
          </p>
        </div>

        <Link to="/login">
          <Button variant="outline" className="w-full">
            Voltar para login
          </Button>
        </Link>
      </Card>
    </div>
  );
}
