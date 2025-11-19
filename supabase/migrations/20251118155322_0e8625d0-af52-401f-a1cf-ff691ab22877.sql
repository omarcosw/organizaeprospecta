-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create workspaces table
CREATE TABLE public.workspaces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  main_service TEXT,
  average_ticket DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;

-- Create workspace_users table (many-to-many relationship)
CREATE TABLE public.workspace_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('sdr', 'gestor', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(workspace_id, user_id)
);

ALTER TABLE public.workspace_users ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create pipelines table
CREATE TABLE public.pipelines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.pipelines ENABLE ROW LEVEL SECURITY;

-- Create pipeline_stages table
CREATE TABLE public.pipeline_stages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pipeline_id UUID NOT NULL REFERENCES public.pipelines(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.pipeline_stages ENABLE ROW LEVEL SECURITY;

-- Create leads table
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  pipeline_id UUID NOT NULL REFERENCES public.pipelines(id) ON DELETE CASCADE,
  pipeline_stage_id UUID NOT NULL REFERENCES public.pipeline_stages(id),
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT,
  phone TEXT,
  source_channel TEXT,
  service_interest TEXT,
  estimated_value DECIMAL(10,2),
  next_step TEXT,
  next_step_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  closed_at TIMESTAMP WITH TIME ZONE,
  closed_status TEXT CHECK (closed_status IN ('ganho', 'perdido'))
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create activities table
CREATE TABLE public.activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('ligacao', 'whatsapp', 'email', 'reuniao', 'nota', 'lead_criado', 'mudanca_etapa')),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pendente' CHECK (status IN ('pendente', 'concluida')),
  result TEXT,
  scheduled_for TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- Create goals table
CREATE TABLE public.goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('leads_por_dia', 'atividades_por_dia', 'negocios_por_mes', 'receita_por_mes')),
  target_value DECIMAL(10,2) NOT NULL,
  period TEXT NOT NULL CHECK (period IN ('daily', 'monthly')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for workspaces
CREATE POLICY "Users can view workspaces they belong to"
  ON public.workspaces FOR SELECT
  USING (id IN (SELECT workspace_id FROM public.workspace_users WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert workspaces"
  ON public.workspaces FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update their workspaces"
  ON public.workspaces FOR UPDATE
  USING (id IN (
    SELECT workspace_id FROM public.workspace_users 
    WHERE user_id = auth.uid() AND role IN ('admin', 'gestor')
  ));

-- RLS Policies for workspace_users
CREATE POLICY "Users can view workspace members"
  ON public.workspace_users FOR SELECT
  USING (workspace_id IN (SELECT workspace_id FROM public.workspace_users WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert workspace members"
  ON public.workspace_users FOR INSERT
  WITH CHECK (true);

-- RLS Policies for pipelines
CREATE POLICY "Users can view pipelines in their workspaces"
  ON public.pipelines FOR SELECT
  USING (workspace_id IN (SELECT workspace_id FROM public.workspace_users WHERE user_id = auth.uid()));

CREATE POLICY "Users can manage pipelines in their workspaces"
  ON public.pipelines FOR ALL
  USING (workspace_id IN (SELECT workspace_id FROM public.workspace_users WHERE user_id = auth.uid()));

-- RLS Policies for pipeline_stages
CREATE POLICY "Users can view stages in their workspace pipelines"
  ON public.pipeline_stages FOR SELECT
  USING (pipeline_id IN (
    SELECT p.id FROM public.pipelines p
    INNER JOIN public.workspace_users wu ON p.workspace_id = wu.workspace_id
    WHERE wu.user_id = auth.uid()
  ));

CREATE POLICY "Users can manage stages in their workspace pipelines"
  ON public.pipeline_stages FOR ALL
  USING (pipeline_id IN (
    SELECT p.id FROM public.pipelines p
    INNER JOIN public.workspace_users wu ON p.workspace_id = wu.workspace_id
    WHERE wu.user_id = auth.uid()
  ));

-- RLS Policies for leads
CREATE POLICY "Users can view leads in their workspaces"
  ON public.leads FOR SELECT
  USING (workspace_id IN (SELECT workspace_id FROM public.workspace_users WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert leads in their workspaces"
  ON public.leads FOR INSERT
  WITH CHECK (workspace_id IN (SELECT workspace_id FROM public.workspace_users WHERE user_id = auth.uid()));

CREATE POLICY "Users can update leads in their workspaces"
  ON public.leads FOR UPDATE
  USING (workspace_id IN (SELECT workspace_id FROM public.workspace_users WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete leads in their workspaces"
  ON public.leads FOR DELETE
  USING (workspace_id IN (SELECT workspace_id FROM public.workspace_users WHERE user_id = auth.uid()));

-- RLS Policies for activities
CREATE POLICY "Users can view activities in their workspaces"
  ON public.activities FOR SELECT
  USING (workspace_id IN (SELECT workspace_id FROM public.workspace_users WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert activities in their workspaces"
  ON public.activities FOR INSERT
  WITH CHECK (workspace_id IN (SELECT workspace_id FROM public.workspace_users WHERE user_id = auth.uid()));

CREATE POLICY "Users can update activities in their workspaces"
  ON public.activities FOR UPDATE
  USING (workspace_id IN (SELECT workspace_id FROM public.workspace_users WHERE user_id = auth.uid()));

-- RLS Policies for goals
CREATE POLICY "Users can view goals in their workspaces"
  ON public.goals FOR SELECT
  USING (workspace_id IN (SELECT workspace_id FROM public.workspace_users WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage goals"
  ON public.goals FOR ALL
  USING (workspace_id IN (
    SELECT workspace_id FROM public.workspace_users 
    WHERE user_id = auth.uid() AND role IN ('admin', 'gestor')
  ));

-- Function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'Usuário'),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on leads
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();