import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Team, getTeamMembers } from "@/mock/mockData";
import { UserRoleBadge } from "./UserRoleBadge";
import { Users } from "lucide-react";

interface TeamMembersCardProps {
  team: Team;
}

export const TeamMembersCard = ({ team }: TeamMembersCardProps) => {
  const members = getTeamMembers(team.id);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Users className="w-4 h-4" />
          {team.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {members.map(member => (
            <div key={member.id} className="flex items-center gap-3">
              <Avatar className="w-9 h-9">
                <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">
                  {member.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{member.name}</p>
                <p className="text-xs text-muted-foreground truncate">{member.email}</p>
              </div>
              <UserRoleBadge role={member.role} size="sm" showIcon={false} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
