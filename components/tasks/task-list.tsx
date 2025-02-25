"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

type Task = {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  assignee: string;
  reviewer: string;
};

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Implement dashboard",
    description: "Create main dashboard layout",
    status: "in-progress",
    assignee: "John Doe",
    reviewer: "Jane Smith",
  },
  {
    id: "2",
    title: "Add authentication",
    description: "Set up user authentication flow",
    status: "todo",
    assignee: "Jane Smith",
    reviewer: "John Doe",
  },
];

export function TaskList() {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTaskStatus = (taskId: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            status: task.status === "done" ? "todo" : "done",
          };
        }
        return task;
      })
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo":
        return "default";
      case "in-progress":
        return "blue";
      case "done":
        return "green";
      default:
        return "default";
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12"></TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Assignee</TableHead>
          <TableHead>Reviewer</TableHead>
          <TableHead className="w-24">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell>
              <Checkbox
                checked={task.status === "done"}
                onCheckedChange={() => toggleTaskStatus(task.id)}
              />
            </TableCell>
            <TableCell>{task.title}</TableCell>
            <TableCell>{task.description}</TableCell>
            <TableCell>
              <Badge variant={getStatusColor(task.status)}>{task.status}</Badge>
            </TableCell>
            <TableCell>{task.assignee}</TableCell>
            <TableCell>{task.reviewer}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
