import { Circle } from "lucide-react";

const activities = [
  {
    id: "1",
    user: "John Doe",
    action: "completed task",
    target: "Implement authentication flow",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    user: "Jane Smith",
    action: "created task",
    target: "Update user documentation",
    timestamp: "4 hours ago",
  },
  {
    id: "3",
    user: "Mike Johnson",
    action: "commented on",
    target: "API integration issue",
    timestamp: "5 hours ago",
  },
  {
    id: "4",
    user: "Sarah Wilson",
    action: "started task",
    target: "Mobile responsive fixes",
    timestamp: "1 day ago",
  },
  {
    id: "5",
    user: "Tom Brown",
    action: "completed task",
    target: "Performance optimization",
    timestamp: "1 day ago",
  },
];

export function ActivityTimeline() {
  return (
    <div className="relative space-y-4">
      {activities.map((activity, index) => (
        <div key={activity.id} className="flex gap-3">
          <div className="relative flex items-center justify-center">
            <Circle className="h-2 w-2 fill-current" />
            {index !== activities.length - 1 && (
              <div className="absolute top-3 w-px h-full bg-border" />
            )}
          </div>
          <div>
            <p className="text-sm">
              <span className="font-medium">{activity.user}</span>{" "}
              {activity.action}{" "}
              <span className="font-medium">{activity.target}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              {activity.timestamp}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
