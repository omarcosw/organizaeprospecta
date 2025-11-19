/**
 * Tabela de leads
 * Exibe lista de leads com informações principais
 */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LeadWithRelations } from "@/types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface LeadTableProps {
  leads: LeadWithRelations[];
  onLeadClick?: (lead: LeadWithRelations) => void;
}

export const LeadTable = ({ leads, onLeadClick }: LeadTableProps) => {
  if (leads.length === 0) {
    return (
      <div className="border border-border/50 rounded-lg p-8 text-center">
        <p className="text-muted-foreground">
          Nenhum lead cadastrado ainda. Clique em "Novo Lead" para começar!
        </p>
      </div>
    );
  }

  return (
    <div className="border border-border/50 rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Empresa</TableHead>
            <TableHead>Contato</TableHead>
            <TableHead>Etapa</TableHead>
            <TableHead>Origem</TableHead>
            <TableHead>Responsável</TableHead>
            <TableHead className="text-right">Valor Est.</TableHead>
            <TableHead>Criado em</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow
              key={lead.id}
              className="hover:bg-muted/30 cursor-pointer"
              onClick={() => onLeadClick?.(lead)}
            >
              <TableCell className="font-medium">{lead.name}</TableCell>
              <TableCell>{lead.company || "-"}</TableCell>
              <TableCell>
                <div className="text-sm">
                  {lead.email && <div>{lead.email}</div>}
                  {lead.phone && (
                    <div className="text-muted-foreground">{lead.phone}</div>
                  )}
                  {!lead.email && !lead.phone && "-"}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="bg-primary/10 text-primary border-primary/20"
                >
                  {lead.pipeline_stages?.name || "Novo"}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="text-sm">{lead.source_channel || "-"}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">
                  {lead.profiles?.name || "Não atribuído"}
                </span>
              </TableCell>
              <TableCell className="text-right">
                {lead.estimated_value
                  ? `R$ ${lead.estimated_value.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}`
                  : "-"}
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">
                  {format(new Date(lead.created_at), "dd/MM/yyyy", {
                    locale: ptBR,
                  })}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
