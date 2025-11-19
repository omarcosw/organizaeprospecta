import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { mockLeads, mockCurrentUser, ActivityType } from "@/mock/mockData";

interface NewActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewActivityDialog = ({ open, onOpenChange }: NewActivityDialogProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const currentUser = mockCurrentUser;
  const myLeads = mockLeads.filter(l => l.currentOwnerId === currentUser.id && l.stage !== "finalizado");

  const [formData, setFormData] = useState({
    leadId: "",
    type: "" as ActivityType | "",
    title: "",
    description: "",
    scheduledFor: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simular envio
    setTimeout(() => {
      const lead = mockLeads.find(l => l.id === formData.leadId);
      toast({
        title: "Atividade criada!",
        description: `${formData.title}${lead ? ` para ${lead.name}` : ""} foi agendada com sucesso.`,
      });
      setLoading(false);
      onOpenChange(false);
      // Reset form
      setFormData({
        leadId: "",
        type: "" as ActivityType | "",
        title: "",
        description: "",
        scheduledFor: "",
      });
    }, 1000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const activityTypes: { value: ActivityType; label: string }[] = [
    { value: "ligacao", label: "Ligação" },
    { value: "whatsapp", label: "WhatsApp" },
    { value: "email", label: "E-mail" },
    { value: "reuniao", label: "Reunião" },
    { value: "nota", label: "Nota" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Nova Atividade</DialogTitle>
          <DialogDescription>
            Agende uma nova tarefa ou interação com um lead
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Lead */}
          <div className="space-y-2">
            <Label htmlFor="leadId">Lead *</Label>
            <Select value={formData.leadId} onValueChange={(value) => handleChange("leadId", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um lead" />
              </SelectTrigger>
              <SelectContent>
                {myLeads.map(lead => (
                  <SelectItem key={lead.id} value={lead.id}>
                    {lead.name} - {lead.company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tipo */}
          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Atividade *</Label>
            <Select value={formData.type} onValueChange={(value) => handleChange("type", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {activityTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Título */}
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              placeholder="Ex: Ligação de follow-up"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
            />
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Detalhes da atividade..."
              rows={3}
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {/* Data/Hora */}
          <div className="space-y-2">
            <Label htmlFor="scheduledFor">Agendar para</Label>
            <Input
              id="scheduledFor"
              type="datetime-local"
              value={formData.scheduledFor}
              onChange={(e) => handleChange("scheduledFor", e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Criar Atividade"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
