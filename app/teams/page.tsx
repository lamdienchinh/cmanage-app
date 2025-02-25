"use client";

import { useState } from "react";
import { Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CreateTeamDialog } from "@/components/teams/create-team-dialog";

type Team = {
  id: string;
  name: string;
  description: string;
  members: {
    name: string;
    role: string;
    avatar: string;
  }[];
};

const initialTeams: Team[] = [
  {
    id: "1",
    name: "Frontend Team",
    description: "Responsible for UI/UX implementation",
    members: [
      {
        name: "John Doe",
        role: "Lead Developer",
        avatar: "/placeholder.svg",
      },
      {
        name: "Jane Smith",
        role: "UI Developer",
        avatar: "/placeholder.svg",
      },
    ],
  },
  {
    id: "2",
    name: "Backend Team",
    description: "API and database management",
    members: [
      {
        name: "Mike Johnson",
        role: "Backend Lead",
        avatar: "/placeholder.svg",
      },
    ],
  },
];

export default function TeamsPage() {
  const [teams, setTeams] = useState(initialTeams);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Teams</h1>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Team
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((team) => (
          <Card key={team.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                {team.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{team.description}</p>
              <div className="space-y-4">
                <h3 className="font-medium">Team Members</h3>
                <div className="space-y-2">
                  {team.members.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted"
                    >
                      <Avatar>
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CreateTeamDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </div>
  );
}
