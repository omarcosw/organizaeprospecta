import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/mock/mockData";
import { User, HeadphonesIcon, CalendarCheck, Trophy, Crown } from "lucide-react";

interface UserRoleBadgeProps {
  role: UserRole;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

const roleConfig = {
  sdr: {
    label: "SDR",
    description: "Prospecção",
    icon: HeadphonesIcon,
    variant: "default" as const,
    className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  bdr: {
    label: "BDR",
    description: "Qualificação",
    icon: CalendarCheck,
    variant: "default" as const,
    className: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  },
  closer: {
    label: "Closer",
    description: "Fechamento",
    icon: Trophy,
    variant: "default" as const,
    className: "bg-green-500/10 text-green-500 border-green-500/20",
  },
  gestor: {
    label: "Gestor",
    description: "Gestão",
    icon: Crown,
    variant: "default" as const,
    className: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  },
};

export const UserRoleBadge = ({ role, size = "md", showIcon = true }: UserRoleBadgeProps) => {
  const config = roleConfig[role];
  const Icon = config.icon;

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5",
  };

  return (
    <Badge className={`${config.className} ${sizeClasses[size]} font-medium`}>
      {showIcon && <Icon className="w-3 h-3 mr-1" />}
      {config.label}
    </Badge>
  );
};

export const getRoleColor = (role: UserRole) => {
  const colors = {
    sdr: "blue",
    bdr: "purple",
    closer: "green",
    gestor: "orange",
  };
  return colors[role];
};

export const getRoleLabel = (role: UserRole) => {
  return roleConfig[role].label;
};

export const getRoleDescription = (role: UserRole) => {
  return roleConfig[role].description;
};
