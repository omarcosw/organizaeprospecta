# UI Design System - Organiza&Prospecta

Sistema de design completo e profissional para o SaaS Organiza&Prospecta.

## 🎨 Identidade Visual

### Paleta de Cores

- **Background**: `#0c0d10` (Dark futuristic)
- **Primary (Neon Blue)**: `#3b82f6`
- **Secondary (Purple)**: `#8b5cf6`
- **Success (Neon Green)**: `#22c55e`
- **Destructive (Red)**: `#ef4444`

### Tipografia

Fonte padrão do sistema com suporte a ligatures e alternativas.

### Espaçamento

- Padding padrão: `p-6`
- Gap entre elementos: `gap-4`
- Radius: `rounded-lg` (0.5rem)

## 📦 Componentes Disponíveis

### Botões (`button.tsx`)

```tsx
import { Button } from "@/components/ui/button";

// Variantes
<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Danger</Button>

// Tamanhos
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

### Inputs (`input.tsx`)

```tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

<Label htmlFor="email">Email</Label>
<Input id="email" type="email" placeholder="seu@email.com" />
```

### Cards (`card.tsx`)

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Título do Card</CardTitle>
  </CardHeader>
  <CardContent>
    Conteúdo aqui
  </CardContent>
</Card>
```

### Data Table (`data-table.tsx`)

Tabela profissional com sorting, paginação e hover effects.

```tsx
import { DataTable } from "@/components/ui/data-table";

const columns = [
  { header: "Nome", accessorKey: "name", sortable: true },
  { header: "Email", accessorKey: "email" },
  { 
    header: "Status", 
    accessorKey: "status",
    cell: (item) => <Badge>{item.status}</Badge>
  }
];

<DataTable 
  data={items}
  columns={columns}
  pageSize={10}
  onRowClick={(item) => console.log(item)}
/>
```

### Empty State (`empty-state.tsx`)

Estado vazio com ícone, mensagem e ação opcional.

```tsx
import { EmptyState } from "@/components/ui/empty-state";
import { Inbox } from "lucide-react";

<EmptyState
  icon={Inbox}
  title="Nenhum item encontrado"
  description="Crie seu primeiro item para começar"
  action={{
    label: "Criar Item",
    onClick: () => handleCreate()
  }}
/>
```

### Stats Card (`@/components/dashboard/StatsCard`)

Card numérico para métricas do dashboard.

```tsx
import { StatsCard } from "@/components/dashboard/StatsCard";
import { TrendingUp } from "lucide-react";

<StatsCard
  title="Novos Leads"
  value={42}
  description="Hoje"
  icon={TrendingUp}
  iconColor="text-primary"
/>
```

### Progress Bar (`progress.tsx`)

```tsx
import { Progress } from "@/components/ui/progress";

<Progress value={65} className="h-2" />
```

### Badge (`badge.tsx`)

```tsx
import { Badge } from "@/components/ui/badge";

<Badge variant="default">Novo</Badge>
<Badge variant="secondary">Em progresso</Badge>
<Badge variant="destructive">Atrasado</Badge>
<Badge variant="outline">Concluído</Badge>
```

### Skeleton (`skeleton.tsx`)

Loading states elegantes.

```tsx
import { Skeleton } from "@/components/ui/skeleton";

<Skeleton className="h-12 w-full" />
<Skeleton className="h-32 w-64" />
```

## 🎯 Componentes de Negócio

### PageHeader (`@/components/common/PageHeader`)

Cabeçalho padronizado para todas as páginas.

```tsx
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";

<PageHeader
  title="Dashboard"
  description="Visão geral da prospecção"
  action={
    <Button>Criar Novo</Button>
  }
/>
```

### GoalProgress (`@/components/dashboard/GoalProgress`)

Card de progresso de meta.

```tsx
import { GoalProgress } from "@/components/dashboard/GoalProgress";

<GoalProgress goal={goalWithProgress} />
```

## 🚀 Boas Práticas

### Cores

**SEMPRE** use tokens semânticos do design system:

```tsx
// ✅ CORRETO
<div className="bg-card text-card-foreground">

// ❌ ERRADO
<div className="bg-zinc-900 text-white">
```

### Estados

Todos os componentes suportam:

- `default`: Estado padrão
- `hover`: Hover effect
- `active`: Estado ativo/selecionado
- `disabled`: Desabilitado
- `loading`: Carregando

### Responsividade

Use classes responsivas do Tailwind:

```tsx
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
```

### Acessibilidade

- Sempre use `aria-label` em botões de ícone
- Use `role` apropriado em elementos customizados
- Garanta contraste adequado
- Suporte navegação por teclado

## 🎨 Classes Utilitárias Customizadas

### Scrollbar

```tsx
<div className="scrollbar-thin overflow-auto">
```

### Animações

```tsx
<div className="animate-fade-in">
<div className="animate-slide-up">
<div className="animate-slide-down">
```

### Glow Effect

```tsx
<div className="glow-effect">
```

## 📱 Layout

### Sidebar + Topbar

O layout principal já está configurado em `AppLayout.tsx` com:

- Sidebar fixa e colapsável
- Topbar com filtros globais
- Área de conteúdo responsiva
- Modo mobile com drawer

## 🔧 Customização

Para customizar cores, edite `src/index.css`:

```css
:root {
  --primary: 217 91% 60%;
  --secondary: 258 90% 66%;
  /* ... */
}
```

Para adicionar novos tokens, atualize também `tailwind.config.ts`.

## 📚 Exemplos

Veja exemplos completos em `/components/ui/examples/`.
