"use client"

import { useState } from "react"
import { CheckCircle2, Circle, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Task = {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "completed"
  assignee: {
    name: string
    avatar: string
  }
  reviewer: {
    name: string
    avatar: string
  }
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Implement dashboard layout",
    description: "Create the main dashboard layout with sidebar navigation",
    status: "completed",
    assignee: {
      name: "John Doe",
      avatar: "/placeholder.svg",
    },
    reviewer: {
      name: "Jane Smith",
      avatar: "/placeholder.svg",
    },
  },
  {
    id: "2",
    title: "Add task management features",
    description: "Implement CRUD operations for tasks",
    status: "in-progress",
    assignee: {
      name: "Alice Johnson",
      avatar: "/placeholder.svg",
    },
    reviewer: {
      name: "Bob Wilson",
      avatar: "/placeholder.svg",
    },
  },
]

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)

  const toggleTaskStatus = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "completed" ? "todo" : "completed",
            }
          : task,
      ),
    )
  }

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => toggleTaskStatus(task.id)}>
              {task.status === "completed" ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </Button>
            <div>
              <h3 className="font-medium">{task.title}</h3>
              <p className="text-sm text-muted-foreground">{task.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge
              variant={task.status === "completed" ? "success" : task.status === "in-progress" ? "warning" : "default"}
            >
              {task.status}
            </Badge>
            <div className="flex -space-x-2">
              <Avatar className="border-2 border-background">
                <AvatarImage src={task.assignee.avatar} />
                <AvatarFallback>
                  {task.assignee.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarImage src={task.reviewer.avatar} />
                <AvatarFallback>
                  {task.reviewer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600" onClick={() => deleteTask(task.id)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  )
}

