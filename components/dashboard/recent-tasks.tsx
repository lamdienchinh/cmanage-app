import { CheckCircle2, Circle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const recentTasks = [
  {
    id: "1",
    title: "Implement authentication flow",
    status: "completed",
    assignee: "John Doe",
    dueDate: "2024-02-28",
  },
  {
    id: "2",
    title: "Design system updates",
    status: "in-progress",
    assignee: "Jane Smith",
    dueDate: "2024-03-01",
  },
  {
    id: "3",
    title: "API documentation",
    status: "todo",
    assignee: "Mike Johnson",
    dueDate: "2024-03-05",
  },
  {
    id: "4",
    title: "Mobile responsive fixes",
    status: "in-progress",
    assignee: "Sarah Wilson",
    dueDate: "2024-03-02",
  },
  {
    id: "5",
    title: "Performance optimization",
    status: "completed",
    assignee: "Tom Brown",
    dueDate: "2024-02-27",
  },
];

export function RecentTasks() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <Circle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {recentTasks.map((task) => (
        <div
          key={task.id}
          className={cn(
            "flex items-center justify-between p-2 rounded-lg",
            "hover:bg-muted transition-colors"
          )}
        >
          <div className="flex items-center gap-3">
            {getStatusIcon(task.status)}
            <div>
              <p className="font-medium">{task.title}</p>
              <p className="text-sm text-muted-foreground">
                Assigned to {task.assignee}
              </p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Due {new Date(task.dueDate).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}
