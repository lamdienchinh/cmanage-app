"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CheckSquare,
  Users,
  MessageSquare,
  Trello,
  Pen,
  Settings,
  ChevronDown,
  FolderKanban,
  BarChart2,
  Calendar,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const workspaceMenuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Tasks",
    icon: CheckSquare,
    href: "/tasks",
  },
  {
    title: "Teams",
    icon: Users,
    href: "/teams",
  },
  {
    title: "Messages",
    icon: MessageSquare,
    href: "/chat",
  },
];

const projectMenuItems = [
  {
    title: "Kanban Board",
    icon: Trello,
    href: "/kanban",
  },
  {
    title: "Whiteboard",
    icon: Pen,
    href: "/whiteboard",
  },
  {
    title: "Calendar",
    icon: Calendar,
    href: "/calendar",
  },
];

const insightMenuItems = [
  {
    title: "Analytics",
    icon: BarChart2,
    href: "/analytics",
  },
  {
    title: "Projects",
    icon: FolderKanban,
    href: "/projects",
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [workspaceOpen, setWorkspaceOpen] = useState(true);
  const [projectsOpen, setProjectsOpen] = useState(true);
  const [insightsOpen, setInsightsOpen] = useState(true);

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-4 py-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-lg font-bold text-primary-foreground">C</span>
          </div>
          <span className="text-xl font-bold">C-Manage</span>
        </Link>
      </SidebarHeader>
      <ScrollArea className="flex-1">
        <SidebarContent>
          <SidebarGroup>
            <Collapsible
              open={workspaceOpen}
              onOpenChange={setWorkspaceOpen}
              className="space-y-2"
            >
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="flex items-center justify-between">
                  Workspace
                  <ChevronDown
                    className="size-4 shrink-0 transition-transform duration-200"
                    style={{
                      transform: workspaceOpen
                        ? "rotate(-180deg)"
                        : "rotate(0deg)",
                    }}
                  />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {workspaceMenuItems.map((item) => (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                          asChild
                          className={cn(
                            pathname === item.href &&
                              "bg-primary/10 text-primary"
                          )}
                        >
                          <Link href={item.href}>
                            <item.icon className="size-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>

          <SidebarGroup>
            <Collapsible
              open={projectsOpen}
              onOpenChange={setProjectsOpen}
              className="space-y-2"
            >
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="flex items-center justify-between">
                  Projects
                  <ChevronDown
                    className="size-4 shrink-0 transition-transform duration-200"
                    style={{
                      transform: projectsOpen
                        ? "rotate(-180deg)"
                        : "rotate(0deg)",
                    }}
                  />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {projectMenuItems.map((item) => (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                          asChild
                          className={cn(
                            pathname === item.href &&
                              "bg-primary/10 text-primary"
                          )}
                        >
                          <Link href={item.href}>
                            <item.icon className="size-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>

          <SidebarGroup>
            <Collapsible
              open={insightsOpen}
              onOpenChange={setInsightsOpen}
              className="space-y-2"
            >
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="flex items-center justify-between">
                  Insights
                  <ChevronDown
                    className="size-4 shrink-0 transition-transform duration-200"
                    style={{
                      transform: insightsOpen
                        ? "rotate(-180deg)"
                        : "rotate(0deg)",
                    }}
                  />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {insightMenuItems.map((item) => (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                          asChild
                          className={cn(
                            pathname === item.href &&
                              "bg-primary/10 text-primary"
                          )}
                        >
                          <Link href={item.href}>
                            <item.icon className="size-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        </SidebarContent>
      </ScrollArea>
      <SidebarFooter className="border-t p-4">
        <div className="flex flex-col gap-4">
          <Button variant="outline" className="justify-start" asChild>
            <Link href="/settings">
              <Settings className="mr-2 size-4" />
              Settings
            </Link>
          </Button>
          <Button variant="outline" className="justify-start" asChild>
            <Link href="/help">
              <HelpCircle className="mr-2 size-4" />
              Help & Support
            </Link>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
